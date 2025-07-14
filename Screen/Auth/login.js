import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import { loginUser } from "../../src/Services/AuthService";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);

  const handleLogin = async () => {
    // Validación básica de campos
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Campos requeridos",
        "Por favor ingrese su correo y contraseña"
      );
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        Alert.alert("EXITO", "inicio"); // Redirigir al dashboard principal
      } else {
        Alert.alert(
          "Acceso denegado",
          result.message ||
            "Credenciales incorrectas. Por favor verifique sus datos."
        );
      }
    } catch (error) {
      console.error("Error en login:", error);
      Alert.alert(
        "Error de conexión",
        "No pudimos conectarnos al servidor. Por favor revise su conexión a internet."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#0073B1", "#00A8E8"]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0073B1" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo y encabezado */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/imgen.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.welcomeText}>Sistema de Salud Integral</Text>
            </View>

            {/* Tarjeta de formulario */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Iniciar Sesión</Text>

              {/* Campo de email */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#0073B1"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isFocusedEmail && styles.inputFocused]}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#95a5a6"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                />
              </View>

              {/* Campo de contraseña */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color="#0073B1"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    isFocusedPassword && styles.inputFocused,
                  ]}
                  placeholder="Contraseña"
                  placeholderTextColor="#95a5a6"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureEntry}
                  editable={!loading}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecureEntry(!secureEntry)}
                >
                  <MaterialIcons
                    name={secureEntry ? "visibility-off" : "visibility"}
                    size={20}
                    color="#95a5a6"
                  />
                </TouchableOpacity>
              </View>

              {/* Enlace olvidé contraseña */}
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("RecuperarContraseña")}
              >
                <Text style={styles.forgotPasswordText}>
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>

              {/* Botón de ingreso */}
              <BottonComponent
                title={loading ? "Ingresando..." : "Ingresar"}
                onPress={handleLogin}
                disabled={loading}
                loading={loading}
                style={styles.loginButton}
                textStyle={styles.buttonText}
              />
            </View>

            {/* Enlace a registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 25,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    marginBottom: 25,
    paddingBottom: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#2c3e50",
    fontSize: 16,
  },
  inputFocused: {
    borderBottomColor: "#0073B1",
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: "#0073B1",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#0073B1",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0073B1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  registerText: {
    color: "white",
    marginRight: 5,
  },
  registerLink: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  versionText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 20,
  },
  copyrightText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    marginTop: 5,
    textAlign: "center",
  },
});
