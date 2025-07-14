// Importaciones necesarias
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons"; // Íconos de uso visual

// Componente principal que muestra el detalle de una cita
export default function DetalleCita({ route, navigation }) {
  // Obtenemos los datos de la cita desde los parámetros de navegación
  const { cita } = route.params;

  // Función que navega a la pantalla de edición de cita
  const handleEditar = () => {
    navigation.navigate("EditarCita", { cita }); // Pasamos la cita como parámetro
  };

  // Función para eliminar la cita (aún sin implementación real)
  const handleEliminar = () => {
    console.log("Eliminar cita", cita.id); // Por ahora solo imprime en consola
  };

  // Renderizado del componente
  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Detalle de la Cita</Text>
      <View style={styles.divider} />

      {/* Tarjeta con la información de la cita */}
      <View style={styles.card}>
        {/* Nombre del paciente */}
        <View style={styles.item}>
          <FontAwesome name="user" size={20} color="#4A90E2" />
          <Text style={styles.label}>Paciente:</Text>
          <Text style={styles.value}>{cita.paciente}</Text>
        </View>

        {/* Fecha de la cita */}
        <View style={styles.item}>
          <FontAwesome name="calendar" size={20} color="#4A90E2" />
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{cita.fecha}</Text>
        </View>

        {/* Hora de la cita */}
        <View style={styles.item}>
          <FontAwesome name="clock-o" size={20} color="#4A90E2" />
          <Text style={styles.label}>Hora:</Text>
          <Text style={styles.value}>{cita.hora}</Text>
        </View>
      </View>

      {/* Botones de acción: Editar y Eliminar */}
      <View style={styles.buttonContainer}>
        {/* Botón para editar */}
        <TouchableOpacity
          style={[styles.button, styles.buttonEdit]}
          onPress={handleEditar}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        {/* Botón para eliminar */}
        <TouchableOpacity
          style={[styles.button, styles.buttonDelete]}
          onPress={handleEliminar}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos para la pantalla DetalleCita
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
  },
  divider: {
    height: 2,
    backgroundColor: "#E1E5EA",
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3, // Sombra para Android
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "48%",
  },
  buttonEdit: {
    backgroundColor: "#4CAF50", // Verde para "editar"
  },
  buttonDelete: {
    backgroundColor: "#F44336", // Rojo para "eliminar"
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});
