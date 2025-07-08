import React, { use, useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearDoctor, EditarDoctor } from "../../src/Services/ActividadService";
import {
  listarEspecialidad,
  ListarConsultorio,
} from "../../src/Services/ActividadService";

export default function EditarDoctorScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = route.params?.doctor;

  const [consultorio_id, setConsultorioId] = useState(
    doctor?.consultorio_id || ""
  );
  const [especialidad_id, setEspecialidadId] = useState(
    doctor?.especialidad_id || ""
  );
  const [nombre, setNombre] = useState(doctor?.nombre || "");
  const [apellido, setApellido] = useState(doctor?.apellido || "");
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [consultorios, setConsultorios] = useState([]);

  useEffect(() => {
    const cargarConsultorios = async () => {
      const result = await ListarConsultorio();
      if (result.success) {
        setConsultorios(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar los consultorios"
        );
      }
    };
    cargarConsultorios();
  }, []);
  useEffect(() => {
    const cargarEspecialidades = async () => {
      const result = await listarEspecialidad();
      if (result.success) {
        setEspecialidades(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron cargar las especialidades"
        );
      }
    };
    cargarEspecialidades();
  }, []);

  const esEdicion = !!doctor;

  handleGuardar = async () => {
    if (!nombre || !apellido || !especialidad_id || !consultorio_id) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      let result;
      if (esEdicion) {
        result = await EditarDoctor(doctor.id, {
          nombre: parseFloat(nombre),
          apellido: parseFloat(apellido),
          especialidad_id:parseInt(especialidad_id),
          consultorio_id: parseInt(consultorio_id),
        });
      } else {
        result = await crearDoctor({
          nombre: parseFloat(nombre),
          apellido: parseFloat(apellido),
          especialidad_id:parseInt(especialidad_id),
          consultorio_id: parseInt(consultorio_id),
        });
      }

      if (result.success) {
        Alert.alert(
          "Éxito",
          `${nombre} ${apellido} se ha ${
            esEdicion ? "editado" : "registrado"
          } correctamente`
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "No se pudo guardar el doctor");
      }
    } catch (error) {
      console.error("Error al guardar doctor:", error);
      Alert.alert("Error", "Ocurrió un error al guardar el doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esEdicion ? "Editar Doctor" : "Nuevo Doctor"}</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Especialidad"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
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
