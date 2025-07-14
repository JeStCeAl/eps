// Importación para manejar almacenamiento local (persistencia del token)
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importación del cliente Axios configurado
import api from "./conexion";

// ───────────────────────────────────────────────
// Validaciones locales (frontend)
// ───────────────────────────────────────────────

// Valida formato básico de email usando expresión regular
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Verifica que la contraseña tenga al menos 8 caracteres
const isValidPassword = (password) => {
  return password.length >= 8;
};

// ───────────────────────────────────────────────
// Función: loginUser
// Descripción: Inicia sesión con email y contraseña
// Endpoint: POST /login
// ───────────────────────────────────────────────
export const loginUser = async (email, password) => {
  // Validaciones frontend antes de la petición
  if (!email || !password) {
    return {
      success: false,
      error: { message: "Email y contraseña son requeridos" },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { message: "Por favor ingresa un email válido" },
    };
  }

  try {
    // Solicita token desde el backend
    const response = await api.post("/login", { email, password });
    const { token } = response.data;

    // Almacena el token en AsyncStorage
    await AsyncStorage.setItem("userToken", token);

    // Devuelve el token si todo fue exitoso
    return { success: true, token };
  } catch (error) {
    console.error(
      "Error de login",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response
        ? error.response.data
        : { message: "Error de conexión" },
    };
  }
};

// ───────────────────────────────────────────────
// Función: logoutUser
// Descripción: Cierra sesión del usuario actual
// Endpoint: POST /logout
// ───────────────────────────────────────────────
export const logoutUser = async () => {
  try {
    // Notifica al backend del logout
    await api.post("/logout");
    // Elimina el token almacenado localmente
    await AsyncStorage.removeItem("userToken");
    return { success: true };
  } catch (error) {
    console.log(
      "Error al cerrar sesión",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response
        ? error.response.data
        : { message: "Error al cerrar sesión" },
    };
  }
};

// ───────────────────────────────────────────────
// Función: registerUser
// Descripción: Registra un nuevo usuario en el sistema
// Endpoint: POST /register
// Parám: name, email, password, role (por defecto: 'user')
// ───────────────────────────────────────────────
export const registerUser = async (name, email, password, role = "user") => {
  // Validaciones iniciales antes de enviar datos
  if (!name || !email || !password) {
    return {
      success: false,
      error: {
        errors: {
          ...(!name && { name: ["El nombre es requerido"] }),
          ...(!email && { email: ["El email es requerido"] }),
          ...(!password && { password: ["La contraseña es requerida"] }),
        },
      },
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: { errors: { email: ["Por favor ingresa un email válido"] } },
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: {
        errors: {
          password: ["La contraseña debe tener al menos 8 caracteres"],
        },
      },
    };
  }

  try {
    // Envío de datos al backend para crear el usuario
    const response = await api.post("/register", {
      name,
      email,
      password,
      role,
    });

    // Login automático luego de registrarse exitosamente
    const loginResult = await loginUser(email, password);
    if (!loginResult.success) {
      return loginResult;
    }

    // Retorna información del usuario y token
    return {
      success: true,
      data: response.data,
      token: loginResult.token,
    };
  } catch (error) {
    console.error(
      "Error de registro",
      error.response ? error.response.data : error.message
    );

    // Manejo de errores por falta de respuesta del servidor
    if (!error.response) {
      return {
        success: false,
        error: { errors: { general: ["Error de conexión con el servidor"] } },
      };
    }

    // Retorna errores de validación o de backend
    return {
      success: false,
      error: error.response.data,
    };
  }
};
