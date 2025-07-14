// Importación de módulos necesarios desde React y React Native
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// Importación de iconos desde las librerías de Expo
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Componente funcional que representa una tarjeta (card) con información y acciones opcionales
export default function CardComponent({
  item, // Objeto que contiene los datos a mostrar (por ejemplo: fecha y hora de una cita)
  onView, // Función que se ejecuta al presionar el botón de ver
  onEdit, // Función que se ejecuta al presionar el botón de editar
  onDelete, // Función que se ejecuta al presionar el botón de eliminar
  viewIcon = "eye", // Nombre del ícono de "ver" (por defecto: "eye")
  editIcon = "create", // Nombre del ícono de "editar" (por defecto: "create")
  showActions = true, // Booleano que indica si se deben mostrar los botones de acción
}) {
  // Si no hay datos, no se muestra la tarjeta
  if (!item) return null;

  return (
    <View style={styles.card}>
      {/* Contenedor de la información principal */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Fecha: {item.fecha}</Text>
        <Text style={styles.detail}>Hora: {item.hora}</Text>

        {/* Se pueden agregar más campos si están disponibles */}
        {/* <Text style={styles.detail}>Doctor: {item.doctor?.nombre}</Text> */}
        {/* <Text style={styles.detail}>Paciente: {item.paciente?.nombre}</Text> */}
      </View>

      {/* Condicional: solo muestra las acciones si showActions es true */}
      {showActions && (
        <View style={styles.actionsContainer}>
          {/* Botón para ver detalles */}
          {onView && (
            <TouchableOpacity style={styles.actionButton} onPress={onView}>
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}

          {/* Botón para editar */}
          {onEdit && (
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}

          {/* Botón para eliminar */}
          {onDelete && (
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

// Estilos del componente usando StyleSheet
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white", // Fondo blanco para la tarjeta
    borderRadius: 10, // Bordes redondeados
    padding: 15, // Espaciado interno
    marginBottom: 15, // Margen inferior entre tarjetas
    flexDirection: "row", // Dirección horizontal de los elementos
    justifyContent: "space-between", // Espacio entre info y acciones
    alignItems: "flex-start", // Alineación vertical arriba
    shadowColor: "#000", // Color de sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  infoContainer: {
    flex: 1, // Ocupa el mayor espacio posible
  },
  name: {
    fontSize: 18,
    fontWeight: "600", // Texto más grueso
    color: "#333", // Gris oscuro
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: "#666", // Gris más claro
    marginBottom: 3,
  },
  actionsContainer: {
    flexDirection: "row", // Coloca los botones uno al lado del otro
    marginTop: 5,
  },
  actionButton: {
    marginLeft: 10, // Separación entre botones
    padding: 8, // Aumenta el área táctil
  },
});
