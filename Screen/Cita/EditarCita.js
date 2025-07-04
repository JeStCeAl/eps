import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditarCita({ route, navigation }) {
  const { cita } = route.params;

  const [paciente, setPaciente] = useState(cita.paciente);
  const [fecha, setFecha] = useState(cita.fecha);
  const [hora, setHora] = useState(cita.hora);

  const handleGuardar = () => {
    const citaActualizada = { ...cita, paciente, fecha, hora };
    console.log("Cita actualizada:", citaActualizada);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cita</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          value={paciente}
          onChangeText={setPaciente}
          placeholder="Nombre del paciente"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora:</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
          placeholder="HH:MM AM/PM"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7F8C8D",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D7DE",
    backgroundColor: "#fff",
    padding: Platform.OS === "ios" ? 12 : 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#2C3E50",
  },
  button: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
