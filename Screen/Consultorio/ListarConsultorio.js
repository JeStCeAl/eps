import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { 
  listarConsultorio,  // Cambiado a minúscula para coincidir con el servicio
  eliminarConsultorio 
} from "../../src/Services/ConsultorioService";  // Asegúrate que es ActividadService
import ConsultorioComponent from "../../Components/ConsultorioComponent";

export default function ListarConsultorioScreen() {
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const cargarConsultorios = async () => {
    setLoading(true);
    try {
      const result = await listarConsultorio();  // Nombre de función corregido
      console.log("Datos recibidos:", result);  // Depuración
      
      if (result?.success) {
        setConsultorios(result.data || []);
      } else {
        Alert.alert(
          "Error",
          result?.message || "No se pudieron obtener los consultorios"
        );
      }
    } catch (error) {
      console.error("Error al cargar consultorios:", error);
      Alert.alert("Error", "Error de conexión con el servidor");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", cargarConsultorios);
    cargarConsultorios(); // Carga inicial
    return unsubscribe;
  }, [navigation]);

  const handleRefresh = () => {
    setRefreshing(true);
    cargarConsultorios();
  };

  const handleEditar = (consultorio) => {
    navigation.navigate("EditarConsultorio", { consultorio });
  };

  const handleCrear = () => {
    navigation.navigate("EditarConsultorio");
  };



  const handleEliminar = async (id) => {
    Alert.alert(
      "Eliminar Consultorio",
      "¿Estás seguro de eliminar este consultorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarConsultorio(id);
              if (result.success) {
                Alert.alert("Éxito", "Consultorio eliminado correctamente");
                cargarConsultorios(); // Recargar la lista
              } else {
                Alert.alert("Error", result.message || "Error al eliminar");
              }
            } catch (error) {
              console.error("Error al eliminar:", error);
              Alert.alert("Error", "No se pudo completar la eliminación");
            }
          },
        },
      ]
    );
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
      <Text style={styles.title}>Listado de Consultorios</Text>

      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <ConsultorioComponent
            consultorio={item}
            onDelete={() => handleEliminar(item.id)}
            onEdit={() => handleEditar(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay consultorios registrados</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={consultorios.length === 0 && styles.emptyList}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleCrear}
        activeOpacity={0.8}
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
  centered: {
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
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