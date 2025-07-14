// Importación del Stack Navigator desde React Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Importación de los stacks de navegación por módulo
import CitaStack from "./CitaStack";                     // Navegación interna para el módulo de citas
import PacienteStack from "./PacienteStack";             // Navegación interna para el módulo de pacientes
import DoctorStack from "./DoctorStack";                 // Navegación interna para el módulo de doctores
import EspecialidadStack from "./EspecialidadStack";     // Navegación interna para el módulo de especialidades
import ConsultorioStack from "./ConsultorioStack";       // Navegación interna para el módulo de consultorios

// Importación de la pantalla principal del menú
import { MenuScreen } from "../../../Screen/Menu/MenuScreen";

// (Importación no usada en este archivo, puede eliminarse si no se necesita)
import { Button } from "react-native";

// Creación del Stack Navigator
const Stack = createStackNavigator();

// Componente principal que define la navegación del menú inicial y módulos
export default function MenuInicial() {
  return (
    <Stack.Navigator initialRouteName="MenuPrincipal">
      
      {/* Pantalla principal que muestra el menú de navegación general */}
      <Stack.Screen
        name="MenuPrincipal"
        component={MenuScreen}
        options={{ headerShown: false }} // Oculta el encabezado superior predeterminado
      />

      {/* Navegación hacia el stack del módulo de Pacientes */}
      <Stack.Screen
        name="PacienteStack"
        component={PacienteStack}
        options={{ headerShown: false }} // Encabezado oculto para control total del diseño
      />

      {/* Navegación hacia el stack del módulo de Citas */}
      <Stack.Screen
        name="CitaStack"
        component={CitaStack}
        options={{ headerShown: false }}
      />

      {/* Navegación hacia el stack del módulo de Doctores */}
      <Stack.Screen
        name="DoctorStack"
        component={DoctorStack}
        options={{ headerShown: false }}
      />

      {/* Navegación hacia el stack del módulo de Especialidades */}
      <Stack.Screen
        name="EspecialidadStack"
        component={EspecialidadStack}
        options={{ headerShown: false }}
      />

      {/* Navegación hacia el stack del módulo de Consultorios */}
      <Stack.Screen
        name="ConsultorioStack"
        component={ConsultorioStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
