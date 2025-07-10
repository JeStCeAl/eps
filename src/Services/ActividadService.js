import api from "./conexion";
// Importación individual (tree-shaking)


// Funciones para Pacientes
export const listarPaciente = async () => {
  try {
    const response = await api.get("/listarPacientes");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const eliminarPaciente = async (id) => {
  try {    await api.delete(`/eliminarPaciente/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const crearPaciente = async (data) => {
  try {
    const response = await api.post("/crearPaciente", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const editarPaciente = async (id, data) => {
  try {
    const response = await api.put(`/editarPaciente/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar paciente:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};





