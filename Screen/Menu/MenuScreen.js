import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { FontAwesome5, FontAwesome6, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function MenuScreen({ navigation }) {
  return (
    // Fondo de pantalla con imagen y efecto de desenfoque
    <ImageBackground
      source={require("../../assets/image.png")}
      style={styles.container}
      blurRadius={2} // Nivel de desenfoque de la imagen de fondo
    >
      {/* Overlay con gradiente para mejorar la legibilidad */}
      <LinearGradient
        colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.7)"]}
        style={styles.overlay}
      >
        {/* Sección de encabezado */}
        <View style={styles.header}>
          <Text style={styles.appName}>Sistema Médico</Text>
          {/* Indicador de estado del sistema */}
          <View style={styles.statusBadge}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Conectado</Text>
          </View>
        </View>

        {/* Contenido principal desplazable */}
        <ScrollView contentContainerStyle={styles.content}>
          {/* Mensaje de bienvenida */}
          <Text style={styles.welcome}>Bienvenido, Doctor</Text>
          <Text style={styles.subtitle}>¿Qué desea gestionar hoy?</Text>

          {/* Grid de opciones del menú */}
          <View style={styles.grid}>
            {menuOptions.map((option) => (
              // Cada opción es un botón táctil
              <TouchableOpacity
                key={option.id}
                onPress={() => navigation.navigate(option.route)}
                activeOpacity={0.9} // Efecto al presionar
              >
                {/* Tarjeta con gradiente de color */}
                <LinearGradient
                  colors={option.gradient}
                  style={styles.card}
                  start={{ x: 0, y: 0 }} // Dirección del gradiente
                  end={{ x: 1, y: 1 }}
                >
                  {/* Contenedor circular para el icono */}
                  <View style={styles.iconCircle}>{option.icon}</View>
                  {/* Título de la opción */}
                  <Text style={styles.cardTitle}>{option.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

// Obtener dimensiones de la pantalla
const { width } = Dimensions.get("window");
// Calcular ancho de las tarjetas considerando márgenes
const CARD_WIDTH = (width - 48) / 2;

// Estilos del componente
const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    resizeMode: "cover", // La imagen de fondo cubre toda la pantalla
  },
  // Overlay semitransparente
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  // Estilos del encabezado
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  // Nombre de la aplicación
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D3748", // Color de texto oscuro
    fontFamily: "Roboto-Bold",
    marginBottom: 8,
  },
  // Badge de estado
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)", // Fondo semitransparente
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // Bordes redondeados
  },
  // Indicador visual de estado (punto verde)
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#48BB78", // Verde
    marginRight: 8,
  },
  // Texto de estado
  statusText: {
    fontSize: 14,
    color: "#2D3748",
    fontFamily: "Roboto-Medium",
  },
  // Contenido principal
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  // Texto de bienvenida
  welcome: {
    fontSize: 22,
    color: "#2D3748",
    fontFamily: "Roboto-Medium",
    marginBottom: 4,
  },
  // Subtítulo
  subtitle: {
    fontSize: 16,
    color: "#4A5568", // Gris oscuro
    fontFamily: "Roboto-Regular",
    marginBottom: 24,
  },
  // Grid de opciones
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -8, // Compensa el padding de las tarjetas
  },
  // Estilo de cada tarjeta
  card: {
    width: CARD_WIDTH,
    aspectRatio: 1, // Mantener relación cuadrada
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8, // Sombra en Android
  },
  // Círculo para el icono
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30, // Perfectamente redondo
    backgroundColor: "rgba(255,255,255,0.2)", // Fondo semitransparente
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  // Título de la tarjeta
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF", // Texto blanco
    fontFamily: "Roboto-SemiBold",
    textAlign: "center",
  },
});

 // Definición de las opciones del menú con sus propiedades
  const menuOptions = [
    {
      id: 1,
      title: "Pacientes",
      icon: <AntDesign name="user" size={26} color="#fff" />,
      route: "PacienteStack",
      gradient: ["#667eea", "#764ba2"], // Gradiente azul/púrpura
    },
    {
      id: 2,
      title: "Citas",
      icon: <FontAwesome5 name="calendar-check" size={26} color="#fff" />,
      route: "CitaStack",
      gradient: ["#ff758c", "#ff7eb3"], // Gradiente rosa
    },
    {
      id: 3,
      title: "Doctores",
      icon: <FontAwesome6 name="user-doctor" size={26} color="#fff" />,
      route: "DoctorStack",
      gradient: ["#43e97b", "#38f9d7"], // Gradiente verde/azul
    },
    {
      id: 4,
      title: "Especialidades",
      icon: <FontAwesome5 name="briefcase-medical" size={26} color="#fff" />,
      route: "EspecialidadStack",
      gradient: ["#ff9a9e", "#fad0c4"], // Gradiente rosa claro
    },
    {
      id: 5,
      title: "Consultorios",
      icon: <AntDesign name="customerservice" size={26} color="#fff" />,
      route: "ConsultorioStack",
      gradient: ["#a18cd1", "#fbc2eb"], // Gradiente lila/rosa
    },
  ];
