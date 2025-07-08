import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import CardComponent from "../../Components/CardComponent";
import { useNavigation } from "@react-navigation/native";
import {
  listarDoctor,
  eliminarDoctor,
} from "../../src/Services/ActividadService";

export default function ListarDoctor() {
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const obtenerDoctores = async () => {
    setLoading(true);
    try {
      const result = await listarDoctor();
      if (result.success) {
        setDoctores(result.data);
      } else {
        Alert.alert(
          "Error",
          result.message || "No se pudieron obtener los doctores"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al obtener los doctores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", obtenerDoctores);
    return unsubscribe;
  }, [navigation]);

  const handleEditar = (doctor) => {
    navigation.navigate("EditarDoctor", { doctor });
  };

  const handleCrear = () => {
    navigation.navigate("EditarDoctor");
  };

  const handleView = (doctor) => {
    navigation.navigate("DetalleDoctor", { doctores: doctor });
  };

  const handleEliminar = (id) => {
    Alert.alert("Eliminar Doctor", "¿Estás seguro de eliminar este doctor?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            const result = await eliminarDoctor(id);
            if (result.success) {
              obtenerDoctores();
            } else {
              Alert.alert(
                "Error",
                result.message || "No se pudo eliminar el doctor"
              );
            }
          } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el doctor");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Doctores</Text>

      {doctores.length > 0 ? (
        <FlatList
          style={styles.listContainer}
          data={doctores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardComponent
              doctor={item}
              onDelete={() => handleEliminar(item.id)}
              onEdit={() => handleEditar(item)}
              onView={() => handleView(item)}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No hay doctores registrados</Text>
        </View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleCrear}>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});
