import api from "./conexion";


// Funciones para Consultorios
export const listarConsultorio = async () => {
  try {
    const response = await api.get("/listarConsultorios");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar consultorio:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const eliminarConsultorio = async (id) => {
  try {
    await api.delete(`/eliminarConsultorio/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar consultorio:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const crearConsultorio = async (data) => {
  try {
    const response = await api.post("/crearConsultorio", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear consultorio:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const editarConsultorio = async (id, data) => {
  try {
    const response = await api.put(`/editarConsultorio/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar consultorio:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};