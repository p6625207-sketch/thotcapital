// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const PaqueteService = {

  async obtenerPaquetes() {
    try {
      const response = await api.get("/paquetes");
      return response.data;
    } catch (error) {
      console.error("Error al obtener paquetes:", error);
      return { error: true, message: error.message };
    }
  },

  async obtenerPaquetesDeUsuario(userId) {
    try {
      const response = await api.get(`/paquetes/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener paquetes:", error);
      return { error: true, message: error.message };
    }
  },

  /**
      * Obtener detalles de un paquete específico
      */
  async obtenerPaquete(paqueteId) {
    try {
      const response = await axios.get(`${this.baseUrl}/${paqueteId}`)
      return response.data
    } catch (error) {
      console.error('Error al obtener paquete:', error)
      return { error: error.message }
    }
  }



















};

export default PaqueteService;
