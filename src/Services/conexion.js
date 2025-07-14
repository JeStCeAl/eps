// Importación de Axios para hacer peticiones HTTP
import axios from "axios";

// Importación de AsyncStorage para acceder al token almacenado localmente
import AsyncStorage from "@react-native-async-storage/async-storage";

// URL base de la API (modifica según tu entorno de desarrollo o producción)
const API_BASE_URL = "http://172.30.7.30:8000/api"; // ← Cambia según tu IP/localhost

// Creación de una instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Rutas que **no requieren autenticación**
const RutasPublicas = ["/login", "/register"];

// ───────────────────────────────────────────────────────
// INTERCEPTOR DE PETICIONES
// Añade el token Bearer automáticamente en rutas protegidas
// ───────────────────────────────────────────────────────
api.interceptors.request.use(
  async (config) => {
    // Verifica si la URL de la petición coincide con una ruta pública
    const isRutaPublica = RutasPublicas.some((route) =>
      config.url.includes(route)
    );

    // Solo añade el token si la ruta NO es pública
    if (!isRutaPublica) {
      const userToken = await AsyncStorage.getItem("userToken");

      if (userToken) {
        // Agrega el token al encabezado Authorization
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }

    return config; // Devuelve la configuración modificada
  },
  (error) => {
    return Promise.reject(error); // Manejo de errores en la solicitud
  }
);

// ───────────────────────────────────────────────────────
// INTERCEPTOR DE RESPUESTAS
// Maneja errores de autenticación (como token expirado)
// ───────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente se retorna

  async (error) => {
    const originalRequest = error.config;

    const isRutaPublica = RutasPublicas.some((route) =>
      originalRequest.url.includes(route)
    );

    // Si el error es 401 (no autorizado), y no es una ruta pública ni un reintento
    if (
      error.response && // ← corrección de typo: era "respnse"
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isRutaPublica
    ) {
      // Marcar como reintentado
      originalRequest._retry = true;

      console.log("Token expirado o no autorizado. Redirigiendo a login...");
      await AsyncStorage.removeItem("userToken");

      // Aquí podrías también redirigir al usuario al login manualmente si lo deseas
    }

    return Promise.reject(error); // Propaga el error al resto de la aplicación
  }
);

// Exporta la instancia de Axios configurada
export default api;
