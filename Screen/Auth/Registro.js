import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BottonComponent from "../../Components/BotonComponent";
import React, { useState } from "react";
import { registerUser } from "../../src/Services/AuthService";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegistroScreen({ navigation }) {
  // Estados (se mantienen igual)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Funciones (se mantienen igual)
  const validateFields = () => {
    /* ... misma implementación ... */
  };

  const handleRegister = async () => {
    /* ... misma implementación ... */
  };

  return (
    <LinearGradient
      colors={['#0073B1', '#00A8E8']}
      style={styles.gradientContainer}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* Logo de la EPS */}
            <Image
              source={require("../../assets/imgen.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            
            {/* Tarjeta de registro */}
            <View style={styles.card}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Complete sus datos para registrarse</Text>

              {/* Campo Nombre */}
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color="#0073B1" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.name && styles.errorInput]}
                  placeholder="Nombre completo"
                  placeholderTextColor="#95a5a6"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

              {/* Campo Email */}
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#0073B1" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.email && styles.errorInput]}
                  placeholder="Correo electrónico"
                  placeholderTextColor="#95a5a6"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              {/* Campo Contraseña */}
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#0073B1" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.password && styles.errorInput]}
                  placeholder="Contraseña"
                  placeholderTextColor="#95a5a6"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color="#95a5a6" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

              {/* Campo Rol */}
              <View style={styles.inputContainer}>
                <MaterialIcons name="assignment-ind" size={20} color="#0073B1" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.role && styles.errorInput]}
                  placeholder="Rol (paciente, médico, admin)"
                  placeholderTextColor="#95a5a6"
                  value={role}
                  onChangeText={(text) => {
                    setRole(text);
                    setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                />
              </View>
              {errors.role ? <Text style={styles.errorText}>{errors.role}</Text> : null}

              {/* Botón de Registro */}
              {loading ? (
                <ActivityIndicator size="large" color="#0073B1" style={styles.loader} />
              ) : (
                <BottonComponent 
                  title={"Registrarse"} 
                  onPress={handleRegister}
                  style={styles.primaryButton}
                />
              )}

              {/* Enlace a Login */}
              <View style={styles.loginLinkContainer}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                  <Text style={styles.loginLink}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    marginBottom: 10,
    paddingBottom: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#2c3e50',
    fontSize: 16,
    paddingVertical: 8,
  },
  errorInput: {
    borderBottomColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 30,
  },
  eyeIcon: {
    padding: 5,
  },
  primaryButton: {
    backgroundColor: '#0073B1',
    borderRadius: 8,
    height: 50,
    marginTop: 20,
    shadowColor: '#0073B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  loader: {
    marginVertical: 30,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#7f8c8d',
    marginRight: 5,
  },
  loginLink: {
    color: '#0073B1',
    fontWeight: 'bold',
  },
});