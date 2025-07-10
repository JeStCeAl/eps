import api from "./conexion";

// Citas

export const listarCita = async () => {
  try {
    const response = await api.get("/listarCitas");
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al listar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarCita = async (id) => {
  try {
    await api.delete(`/eliminarCita/${id}`); // ← Corregido
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearCita = async (data) => {
  try {
    const response = await api.post("/crearCita", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al crear Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarCita = async (id, data) => {
  try {
    const response = await api.put(`/editarCita/${id}`, data); // ← Corregido
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar Cita: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};
