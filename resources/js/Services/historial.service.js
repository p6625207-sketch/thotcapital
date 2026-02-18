// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const obtenerHistorial = {

    
    async obtenerHistorialPorcentaje(userId) {
        try {
            const response = await api.get(`/historial/${userId}/completo`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener paquetes:", error);
            return { error: true, message: error.message };
        }
    },

      async obtenerHistorialRetiro(userId) {
        try {
            const response = await api.get(`/historial/${userId}/retiro`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener paquetes:", error);
            return { error: true, message: error.message };
        }
    },


};

export default obtenerHistorial;
