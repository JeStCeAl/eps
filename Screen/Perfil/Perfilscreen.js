import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../Components/BotonComponent";
import api from "../../src/Services/api";

export default function PerfilScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPefil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No se encontró el token de usuario");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/me");
        console.log("Perfil cargado exitosamente:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.log("Error al cargar el perfil:", error);

        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación, redirigiendo a login...");
          return;
        }
        if (error.response) {
          console.log(
            "Error respinse: ",
            error.response.status,
            error.response.data
          );
          Alert.alert(
            "Error al servidor",
            `Error ${error.response.status}: ${
              error.response.data?.message ||
              "Ocurrió un error al cargar el perfil."
            }`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                  // El AppNavegacion se encargara de redirigir automáticamente al login
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar al servidor. Por favor, verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                  // El AppNavegacion se encargara de redirigir automáticamente al login
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                  // El AppNavegacion se encargara de redirigir automáticamente al login
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };
    cargarPefil();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario.</Text>
        <View style={style.ContainerPerfil}>
          <Text style={styles.errorPerfil}>
            No se pudo cargar el perfil del usuario.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <View style={styles.ContainerPerfil}>
        <Text style={styles.profileText}>
          Nombre: {usuario.user.name || "no disponible"}
        </Text>
        <Text style={styles.profileText}>
          Correo Electrónico: {usuario.user.email || "no disponible"}
        </Text>
        <Text style={styles.profileText}>
          Role: {usuario.user.role || "no disponible"}
        </Text>

        <BottonComponent title="Editar Perfil" onPress={() => {}} />
        <BottonComponent
          title="Cerrar Sesión"
          onPress={async () => {
            await AsyncStorage.removeItem("userToken");
          }}
        />
      </View>
    </View>
  );
}
