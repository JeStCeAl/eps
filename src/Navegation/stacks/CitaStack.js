// Importación del Stack Navigator desde React Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Importación de las pantallas relacionadas con el módulo de Citas
import ListarCita from "../../../Screen/Cita/ListarCita"; // Pantalla para listar todas las citas
import DetalleCita from "../../../Screen/Cita/DetalleCita"; // Pantalla para ver detalles de una cita
import EditarCita from "../../../Screen/Cita/EditarCita"; // Pantalla para editar una cita existente

// Creación del Stack Navigator
const Stack = createStackNavigator();

// Componente funcional que define la pila de navegación para el módulo de Citas
export default function CitaStack() {
  return (
    <Stack.Navigator>
      {/* Pantalla principal para listar todas las citas */}
      <Stack.Screen
        name="ListarCita" // Nombre interno para navegación
        component={ListarCita} // Componente que se renderiza
        options={{ title: "Lista de Citas" }} // Título que aparece en la cabecera
      />

      {/* Pantalla que muestra los detalles de una cita específica */}
      <Stack.Screen
        name="DetalleCita"
        component={DetalleCita}
        options={{ title: "Detalle de la Cita" }}
      />

      {/* Pantalla que permite editar una cita existente */}
      <Stack.Screen
        name="EditarCita"
        component={EditarCita}
        options={{ title: "Editar Cita" }}
      />
    </Stack.Navigator>
  );
}
