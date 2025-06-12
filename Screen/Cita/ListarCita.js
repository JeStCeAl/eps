import { View, Text, Button } from "react-native";
import React from "react";


export default function ListarCitaScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Consultorios</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetalleCita")}
      />
      <Button
        title="Nueva Cita"
        onPress={() => navigation.navigate("FormularioCita")}
      />
      <Button
        title="Editar Cita"
        onPress={() => navigation.navigate("EditarCita")}
      />
    </View>
  );
}
