import { View, Text, Button } from "react-native";
import React from "react";

export default function ListarConsultorioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Pantalla de Listar Consultorios</Text>
      <Button
        title="Ver detalle"
        onPress={() => navigation.navigate("DetalleConsultorio")}
      />
      <Button
        title="Nueva Consultorio"
        onPress={() => navigation.navigate("FormularioConsultorio")}
      />
      <Button
        title="Editar Consultorio"
        onPress={() => navigation.navigate("EditarConsultorio")}
      />
    </View>
  );
}
