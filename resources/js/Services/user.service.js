// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const UserService = { 
    
  async obtenerPaquete(userId) {
    try {
      // Usamos template literal para inyectar el userId en la URL
      const response = await api.get(`/paquetes/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener paquete del usuario:", error);
      return { error: true, message: error.message };
    }
  },
  async obtenerCodigoReferido(userId) {
    try {
      // Usamos template literal para inyectar el userId en la URL
      const response = await api.get(`/codigoreferido/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el codigo  del usuario:", error);
      return { error: true, message: error.message };
    }
  },

};

export default UserService;
