import PerfilStack from "./stacks/Perfilstack";
import Configuracionstack from "./stacks/ConfiguracionStack";
import Menuincial from "./stacks/Menuinicial";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976D2", // Color cuando esta activo
        tabBarInactiveTintColor: "#757575", // Color cuando no esta activo
        tabBarStyle: {
          backgroundColor: "#fff",
        }, // Color de fondo de la barra de pestañas
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Menuincial}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="perfil"
        component={PerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-plus" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="configuracion"
        component={Configuracionstack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
