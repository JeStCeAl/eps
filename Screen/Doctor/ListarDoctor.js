import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/DoctorComponent";

export default function ListarDoctor({ navigation }) {
  // Datos vacíos como solicitaste
  const doctores = [];

  // Estado para simular carga de datos
  const [loading, setLoading] = React.useState(false);

  // Manejo seguro de navegación
  const handleNavigate = (screen, data = {}) => {
    if (!data) {
      console.warn(`Datos no definidos para ${screen}`);
      data = { nombre: "No definido", especialidad: "No definida" };
    }
    navigation.navigate(screen, { doctor: data });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Doctores</Text>

      <ScrollView style={styles.listContainer}>
        {doctores.length > 0 ? (
          doctores.map((doctor) => (
            <CardComponent
              key={doctor.id}
              item={doctor}
              onView={() => handleNavigate("DetalleDoctor", doctor)}
              onEdit={() => handleNavigate("EditarDoctor", doctor)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No hay doctores registrados actualmente
          </Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NuevoDoctor")}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1976D2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
