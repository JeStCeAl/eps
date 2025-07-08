import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearDoctor, editarDoctor } from "../../src/Services/ActividadService";

export default function EditarDoctor() {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = route.params?.doctor;

  // Estados para los campos del doctor
  const [nombre, setNombre] = useState(doctor?.nombre || "");
  const [edad, setEdad] = useState(doctor?.edad ? String(doctor.edad) : "");
  const [telefono, setTelefono] = useState(doctor?.telefono || "");
  const [especialidad, setEspecialidad] = useState(doctor?.especialidad || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!doctor;

  const handleGuardar = async () => {
    // Validación de campos requeridos
    if (!nombre || !especialidad) {
      Alert.alert("Error", "Por favor completa los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      let result;
      const datosDoctor = {
        nombre,
        edad: edad ? parseInt(edad) : null,
        telefono,
        especialidad,
      };

      if (esEdicion) {
        result = await editarDoctor(doctor.id, datosDoctor);
      } else {
        result = await crearDoctor(datosDoctor);
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          `Dr. ${nombre} se ha ${
            esEdicion ? "editado" : "registrado"
          } correctamente`
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el doctor");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al guardar el doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {esEdicion ? "Editar Doctor" : "Nuevo Doctor"}
      </Text>

      {/* Campos del formulario */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre completo*</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Juan Pérez"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          placeholder="Ej: 35"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ej: 555-1234"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Especialidad*</Text>
        <TextInput
          style={styles.input}
          value={especialidad}
          onChangeText={setEspecialidad}
          placeholder="Ej: Cardiología"
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Doctor"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  requiredLabel: {
    color: "red",
  },
  input: {
    backgroundColor: "white",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
