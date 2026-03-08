// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const NoticiaService = {

    async getNoticias() {
        try {
            const response = await api.get("/getNoticias");
            return response.data;
        } catch (error) {
            console.error("Error al obtener las noticias:", error);
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

export default NoticiaService;
