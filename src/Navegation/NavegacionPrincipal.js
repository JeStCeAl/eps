// Importa el creador de navegadores de pestañas inferiores
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importa íconos de diferentes librerías
import { Ionicons, AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";

// Importa las pilas (stacks) de navegación correspondientes a cada pestaña
import MenuInicial from "./stacks/Menuinicial"; // Pestaña de inicio (dashboard)
import PerfilStack from "./stacks/Perfilstack"; // Pestaña de perfil del usuario
import ConfiguracionStack from "./stacks/ConfiguracionStack"; // Pestaña de configuración

// Crea el componente del navegador tipo Tab
const Tab = createBottomTabNavigator();

// ─────────────────────────────────────────────
// Componente: NavegacionPrincipal
// Descripción: Define la navegación principal para usuarios autenticados
// mediante un tab bar inferior (Inicio, Perfil, Configuración)
// ─────────────────────────────────────────────
export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      // Configuración general del tab bar
      screenOptions={{
        tabBarActiveTintColor: "#1976D2", // Color del ícono cuando está activo
        tabBarInactiveTintColor: "#757575", // Color del ícono cuando está inactivo
        tabBarStyle: {
          backgroundColor: "#fff", // Color de fondo del tab bar
        },
      }}
    >
      {/* Pestaña: Inicio */}
      <Tab.Screen
        name="Inicio" // Nombre de la pestaña (visible en la barra)
        component={MenuInicial} // Componente principal para esta pestaña
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" size={size} color={color} />
          ),
          headerShown: false, // Oculta el header superior para esta pestaña
        }}
      />

      {/* Pestaña: Perfil */}
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
          // headerShown por defecto está en true (no es necesario declararlo si no quieres ocultarlo)
        }}
      />

      {/* Pestaña: Configuración */}
      <Tab.Screen
        name="Configuración"
        component={ConfiguracionStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
