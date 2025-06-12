import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Paciente/ListarPaciente";
import DetallePaciente from "../../../Screen/Paciente/DetallePaciente";
import EditarPaciente from "../../../Screen/Paciente/EditarPaciente";
import NuevoPaciente from "../../../Screen/Paciente/NuevoPaciente";

const Stack = createStackNavigator();

export default function PacientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarPaciente"
        component={ListarPaciente}
        options={{ title: "Lista de Pacientes" }}
      />
      <Stack.Screen
        name="DetallePaciente"
        component={DetallePaciente}
        options={{ title: "Detalle del Paciente" }}
      />
      <Stack.Screen
        name="EditarPaciente"
        component={EditarPaciente}
        options={{ title: "Editar Paciente" }}
      />
      <Stack.Screen
        name="NuevoPaciente"
        component={NuevoPaciente}
        options={{ title: "Nuevo Paciente" }}
      />
    </Stack.Navigator>
  );
}
