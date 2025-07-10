import api from "./conexion";

// Docotores
// Doctores
export const listarDoctor = async () => {
  try {
    const response = await api.get("/listarDoctores");
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al listar doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarDoctor = async (id) => {
  try {
    await api.delete(`/eliminarDoctor/${id}`);
    return { success: true };
  } catch (error) {
    console.log(
      "Error al eliminar doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearDoctor = async (data) => {
  try {
    const response = await api.post("/crearDoctor", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al crear doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarDoctor = async (id, data) => {
  try {
    const response = await api.put(`/editarDoctor/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.log(
      "Error al editar doctor: ",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};