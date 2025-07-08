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

// Funciones para Doctores
export const listarDoctor = async () => {
  try {
    const response = await api.get("/listarDoctores");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al listar doctor:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const eliminarDoctor = async (id) => {
  try {
    await api.delete(`/eliminarDoctor/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar doctor:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const crearDoctor = async (data) => {
  try {
    const response = await api.post("/crearDoctor", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear doctor:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

export const editarDoctor = async (id, data) => {
  try {
    const response = await api.put(`/editarDoctor/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al editar doctor:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data || "Error de conexión",
    };
  }
};

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