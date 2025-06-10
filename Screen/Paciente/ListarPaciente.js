import { View, Text, Button } from "react-native";
import React from "react";

export default function ListarPacienteScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Pacientes</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetallePaciente")}
      />
      <Button
        title="Nuevo Paciente"
        onPress={() => navigation.navigate("FormularioPaciente")}
      />
      <Button
        title="Editar Paciente"
        onPress={() => navigation.navigate("EditarPaciente")}
      />
    </View>
  );
}
