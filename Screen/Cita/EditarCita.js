// Importación de módulos y componentes necesarios
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Selector para doctores y pacientes
import { crearCita, editarCita } from "../../src/Services/CitasService"; // Funciones de API
import { useNavigation, useRoute } from "@react-navigation/native"; // Hook de navegación
import { listarDoctor } from "../../src/Services/DoctorService"; // Servicio para listar doctores
import { listarPaciente } from "../../src/Services/ActividadService"; // Servicio para listar pacientes

// Componente funcional para crear o editar una cita
export default function EditarCita() {
  const navigation = useNavigation(); // Navegación entre pantallas
  const route = useRoute(); // Acceso a parámetros de ruta
  const cita = route.params?.cita; // Datos de la cita (si se está editando)

  // Estados para los campos del formulario
  const [fecha, setFecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [doctor_id, setDoctorId] = useState(cita?.doctor_id || "");
  const [paciente_id, setPacienteId] = useState(cita?.paciente_id || "");

  // Estados para cargar listas desde la API
  const [doctores, setDoctores] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga

  // Cargar lista de doctores desde el backend al montar el componente
  useEffect(() => {
    const cargarDoctores = async () => {
      const result = await listarDoctor();
      if (result.success) {
        setDoctores(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los doctores");
      }
    };
    cargarDoctores();
  }, []);

  // Cargar lista de pacientes desde el backend al montar el componente
  useEffect(() => {
    const cargarPacientes = async () => {
      const result = await listarPaciente();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
      }
    };
    cargarPacientes();
  }, []);

  // Verifica si se está editando una cita existente
  const esEdicion = !!cita;

  // Función para guardar o editar una cita
  const handleGuardar = async () => {
    // Validación básica
    if (!fecha || !hora || !doctor_id || !paciente_id) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true); // Activa indicador de carga

    try {
      let result;

      // Si es edición, actualiza la cita
      if (esEdicion) {
        result = await editarCita(cita.id, {
          fecha,
          hora,
          doctor_id: parseInt(doctor_id),
          paciente_id: parseInt(paciente_id),
        });
      } else {
        // Si es nueva, crea la cita
        result = await crearCita({
          fecha,
          hora,
          idDoctor: parseInt(doctor_id),
          idPaciente: parseInt(paciente_id),
        });
      }

      // Si la operación fue exitosa
      if (result?.success) {
        Alert.alert("Éxito", `Cita ${esEdicion ? "editada" : "creada"} correctamente`);
        navigation.goBack(); // Regresa a la pantalla anterior
      } else {
        // Manejo de errores del backend
        let errorMsg = "No se pudo guardar la cita";

        // Si el backend devuelve errores por campo
        if (typeof result.message === "object") {
          errorMsg = Object.entries(result.message)
            .map(([key, val]) => `${key}: ${val.join(", ")}`)
            .join("\n");
        } else if (typeof result.message === "string") {
          errorMsg = result.message;
        }

        Alert.alert("Error", errorMsg);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la cita");
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Interfaz del formulario
  return (
    <View style={styles.container}>
      {/* Título dinámico según acción */}
      <Text style={styles.title}>
        {esEdicion ? "Editar Cita" : "Nueva Cita"}
      </Text>

      {/* Selector de doctor */}
      <Picker
        selectedValue={doctor_id}
        onValueChange={(itemValue) => setDoctorId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un Doctor" value="" />
        {doctores.map((doctor) => (
          <Picker.Item
            key={doctor.id}
            label={`${doctor.nombre} ${doctor.apellido}`}
            value={doctor.id}
          />
        ))}
      </Picker>

      {/* Selector de paciente */}
      <Picker
        selectedValue={paciente_id}
        onValueChange={(itemValue) => setPacienteId(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un Paciente" value="" />
        {pacientes.map((paciente) => (
          <Picker.Item
            key={paciente.id}
            label={`${paciente.nombre} ${paciente.apellido}`}
            value={paciente.id}
          />
        ))}
      </Picker>

      {/* Campo: Fecha */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          value={fecha}
          onChangeText={setFecha}
          placeholder="YYYY-MM-DD"
        />
      </View>

      {/* Campo: Hora */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora:</Text>
        <TextInput
          style={styles.input}
          value={hora}
          onChangeText={setHora}
          placeholder="HH:MM (24h format)"
        />
      </View>

      {/* Botón para guardar o editar */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {esEdicion ? "Guardar Cambios" : "Registrar Cita"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Estilos del componente
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
    marginBottom: 10,
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
