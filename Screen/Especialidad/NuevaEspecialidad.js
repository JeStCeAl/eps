import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NuevaEspecialidad({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");

  const handleGuardar = () => {
    if (!nombre || !descripcion || !duracion) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    // Aquí podrías hacer un fetch o axios a tu API para guardar la especialidad
    console.log("Especialidad creada:", { nombre, descripcion, duracion });

    Alert.alert("¡Creado!", "La especialidad ha sido registrada correctamente.");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nueva Especialidad</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Duración</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={duracion}
          onChangeText={setDuracion}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        activeOpacity={0.8}
      >
        <Ionicons name="save-outline" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Guardar Especialidad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F7FA",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7F8C8D",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#2C3E50",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});
