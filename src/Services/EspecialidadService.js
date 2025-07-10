import api from "./conexion";

// Funciones para Especialidades
export const listarEspecialidad = async () => {
  try {
    const response = await api.get("/listarEspecialidades");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar especialidad:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const eliminarEspecialidad = async (id) => {
  try {
    await api.delete(`/eliminarEspecialidad/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar especialidad:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const crearEspecialidad = async (data) => {
  try {
    const response = await api.post("/crearEspecialidad", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear especialidad:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const editarEspecialidad = async (id, data) => {
  try {
    const response = await api.put(`/editarEspecialidad/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar especialidad:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};