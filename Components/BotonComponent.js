import { TouchableOpacity, Text, StyleSheet } from "react-native";

// Componente de botón personalizado reutilizable
export default function CustomButton({ title, onPress, style }) {
  return (
    // TouchableOpacity permite que el botón sea presionado con efecto de opacidad
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {/* Texto que se muestra dentro del botón */}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF", // Color de fondo azul (estilo Bootstrap)
    padding: 10, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
    alignItems: "center", // Centrar el texto horizontalmente
    marginVertical: 10, // Márgenes superior e inferior
  },
  text: {
    color: "#FFFFFF", // Color del texto en blanco
    fontSize: 16, // Tamaño del texto
  },
});
