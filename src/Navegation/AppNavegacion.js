// Importa los componentes de navegación
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavegacion"; // Rutas para usuarios NO autenticados
import NavegacionPrincipal from "./NavegacionPrincipal"; // Rutas para usuarios autenticados

// Importaciones de React y hooks
import React, { useState, useEffect, useRef } from "react";

// Módulo para almacenar datos localmente
import AsyncStorage from "@react-native-async-storage/async-storage";

// Elementos visuales de React Native
import { ActivityIndicator, View, StyleSheet, AppState } from "react-native";

// ─────────────────────────────────────────────
// Componente principal de navegación
// ─────────────────────────────────────────────
export default function AppNavegacion() {
  // Estado para mostrar pantalla de carga inicial
  const [isLoading, setIsLoading] = useState(true);

  // Estado que representa si el usuario tiene un token guardado
  const [userToken, setUserToken] = useState(null);

  // Referencia al estado de la aplicación (activo, fondo, etc.)
  const appState = useRef(AppState.currentState);

  // Función para cargar el token desde almacenamiento local
  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (e) {
      console.error("Error al cargar el token desde AsyncStorage:", e);
    } finally {
      setIsLoading(false); // Oculta pantalla de carga al finalizar
    }
  };

  // Hook que se ejecuta al iniciar la app (una sola vez)
  useEffect(() => {
    loadToken(); // Carga el token al iniciar
  }, []);

  // Hook que detecta si la app vuelve al primer plano y recarga el token
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App ha vuelto a primer plano, recargando el token...");
        loadToken();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => subscription?.remove(); // Limpia el listener al desmontar
  }, []);

  // Hook opcional que revisa el token cada cierto tiempo
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (AppState.currentState === "") {
          loadToken(); // Recarga si la app está activa pero el estado está vacío
        }
      }, 2000); // Cada 2 segundos

      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [isLoading]);

  // Muestra un spinner mientras se determina si hay token o no
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    // NavigationContainer envuelve toda la lógica de navegación de la app
    <NavigationContainer>
      {/* Si hay token, se carga la navegación principal (usuario autenticado),
          de lo contrario, se muestra AuthNavigation (login/register) */}
      {userToken ? <NavegacionPrincipal /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

// ─────────────────────────────────────────────
// Estilos para la pantalla de carga
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
