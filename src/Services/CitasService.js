// Importa la configuración base de Axios (API REST) desde el archivo de conexión
import api from "./conexion";

// ─────────────────────────────────────────────────────────────
// Servicio: Listar todas las citas
// Método: GET → /listarCitas
// ─────────────────────────────────────────────────────────────
export const listarCita = async () => {
  try {
    // Petición GET al endpoint de listado de citas
    const response = await api.get("/listarCitas");
    // Retorna los datos obtenidos con una bandera de éxito
    return { success: true, data: response.data };
  } catch (error) {
    // Captura y muestra el error en consola (detallado si viene del servidor)
    console.log(
      "Error al listar Cita: ",
      error.response ? error.response.data : error.message
    );
    // Retorna un objeto de error con mensaje amigable
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ─────────────────────────────────────────────────────────────
// Servicio: Eliminar una cita por su ID
// Método: DELETE → /eliminarCita/:id
// ─────────────────────────────────────────────────────────────
export const eliminarCita = async (id) => {
  try {
    // Petición DELETE para eliminar la cita específica
    await api.delete(`/eliminarCita/${id}`);
    // Retorna éxito si no hubo errores
    return { success: true };
  } catch (error) {
    // Muestra error detallado en consola
    console.log(
      "Error al eliminar Cita: ",
      error.response ? error.response.data : error.message
    );
    // Retorna mensaje de error
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ─────────────────────────────────────────────────────────────
// Servicio: Crear una nueva cita
// Método: POST → /crearCita
// Parámetros: data (objeto con información de la cita)
// ─────────────────────────────────────────────────────────────
export const crearCita = async (data) => {
  try {
    // Petición POST al endpoint de creación, enviando los datos
    const response = await api.post("/crearCita", data);
    // Retorna los datos creados con estado de éxito
    return { success: true, data: response.data };
  } catch (error) {
    // Muestra mensaje de error en consola
    console.log(
      "Error al crear Cita: ",
      error.response ? error.response.data : error.message
    );
    // Retorna mensaje de error para mostrar en la interfaz
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

// ─────────────────────────────────────────────────────────────
// Servicio: Editar una cita existente
// Método: PUT → /editarCita/:id
// Parámetros: id (ID de la cita), data (nuevos datos)
// ─────────────────────────────────────────────────────────────
export const editarCita = async (id, data) => {
  try {
    // Petición PUT con ID y datos actualizados
    const response = await api.put(`/editarCita/${id}`, data);
    // Retorna los datos actualizados
    return { success: true, data: response.data };
  } catch (error) {
    // Muestra el error recibido o un mensaje genérico
    console.log(
      "Error al editar Cita: ",
      error.response ? error.response.data : error.message
    );
    // Devuelve el resultado con la estructura estándar
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
