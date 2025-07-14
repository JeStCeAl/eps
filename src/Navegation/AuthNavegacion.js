// Importa el creador de navegadores tipo Stack
import { createStackNavigator } from "@react-navigation/stack";

// Importa las pantallas de autenticación
import PantallaLogin from "../../Screen/Auth/login";
import PantallaRegistro from "../../Screen/Auth/Registro";

// Crea una instancia del Stack Navigator
const Stack = createStackNavigator();

// ─────────────────────────────────────────────
// Componente: AuthNavigation
// Descripción: Navegación para usuarios NO autenticados
// Incluye las pantallas de Login y Registro
// ─────────────────────────────────────────────
export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      {/* Pantalla de Inicio de Sesión */}
      <Stack.Screen
        name="login" // Nombre de la ruta
        component={PantallaLogin} // Componente a renderizar
        options={{
          title: "Iniciar Sesión", // Título del encabezado (si estuviera habilitado)
          headerShown: false, // Oculta el encabezado (header) de la pantalla
        }}
      />

      {/* Pantalla de Registro */}
      <Stack.Screen
        name="Registro" // Nombre de la ruta
        component={PantallaRegistro} // Componente a renderizar
        options={{
          title: "Registrarse", // Título del encabezado
          headerShown: false, // También ocultamos el encabezado aquí
        }}
      />
    </Stack.Navigator>
  );
}
