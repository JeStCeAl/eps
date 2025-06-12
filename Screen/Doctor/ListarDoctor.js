import { View, Text, Button } from "react-native";
import React from "react";

export default function ListarDoctorScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Doctores</Text>
      <Button
        title="Ver Detalle"
        onPress={() => navigation.navigate("DetalleDoctor")}
      />
      <Button
        title="Nueva Doctor"
        onPress={() => navigation.navigate("FormularioDoctor")}
      />
      <Button
        title="Editar Doctor"
        onPress={() => navigation.navigate("EditarDoctor")}
      />
    </View>
  );
}
