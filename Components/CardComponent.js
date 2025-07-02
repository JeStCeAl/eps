// Components/CardComponent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardComponent({ 
  item, 
  onView, 
  onEdit, 
  viewIcon = "eye", 
  editIcon = "create",
  showActions = true 
}) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Título principal: nombre, paciente o vacío */}
        <Text style={styles.name}>
          {item.nombre || item.paciente || "Sin nombre"}
        </Text>

        {/* Campos para especialidades */}
        {item.descripcion && (
          <Text style={styles.detail}>Descripción: {item.descripcion}</Text>
        )}
        {item.duracion && (
          <Text style={styles.detail}>Duración: {item.duracion}</Text>
        )}

        {/* Campos para pacientes */}
        {item.edad !== undefined && (
          <Text style={styles.detail}>Edad: {item.edad} años</Text>
        )}
        {item.telefono && (
          <Text style={styles.detail}>Teléfono: {item.telefono}</Text>
        )}

        {/* Campos para citas */}
        {item.fecha && (
          <Text style={styles.detail}>Fecha: {item.fecha}</Text>
        )}
        {item.hora && (
          <Text style={styles.detail}>Hora: {item.hora}</Text>
        )}
      </View>

      {showActions && (
        <View style={styles.actionsContainer}>
          {onView && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onView}
            >
              <Ionicons name={viewIcon} size={20} color="#1976D2" />
            </TouchableOpacity>
          )}
          
          {onEdit && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onEdit}
            >
              <Ionicons name={editIcon} size={20} color="#FFA000" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  detail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  actionsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  actionButton: {
    marginLeft: 10,
    padding: 8,
  },
});
