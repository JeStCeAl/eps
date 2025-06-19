import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import { loginUser } from "../../src/Services/AuthService"; // Asegúrate de que la ruta sea correcta

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {
            text: "OK",
            onPress: () => {
              console.log("Login exitoso, redirigiendo automaticamente...");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Error de Login",
          result.message || "Ocurrio un error al iniciar sesión."
        );
      }
    } catch (error) {
      console.error("Error inesperado al iniciar sesión:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false); // siempre desctiva el indicador de carga
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <BottonComponent
        title={"Ingresar"}
        onPress={handleLogin}
        disabled={loading}
      />
      <BottonComponent
        title={"Registrarse"}
        onPress={() => navigation.navigate("Registro")}
        style={styles.registerButton}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f9fc", // Fondo azul claro muy suave
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#0d47a1", // Azul médico oscuro
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#ffffff",
    borderColor: "#b3e5fc", // Borde azul claro
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#01579b", // Texto azul oscuro
    shadowColor: "#0288d1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#0288d1", // Azul médico estándar
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#01579b",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: "#4caf50", // Verde médico para acciones secundarias
    width: "90%",
    height: 50,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#2e7d32",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  medicalNote: {
    marginTop: 30,
    fontSize: 12,
    color: "#607d8b",
    textAlign: "center",
    fontStyle: "italic",
  },
});
