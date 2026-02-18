// resources/js/services/paqueteService.js
import api from "../lib/axios";

const PaqueteService = {
    async update(id, data) {
        try {
            // Eliminamos el prefijo /admin si tu instancia de 'api' (axios) ya tiene un baseURL que lo incluye
            // Si tu axios NO tiene baseURL, asegúrate de que la ruta sea exactamente como en web.php
            const response = await api.post(`/admin/paquetes/${id}`, { 
                _method: 'PUT', // Truco de Laravel para emular PUT
                ...data 
            });
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el paquete:", error);
            throw error;
        }
    },

    async delete(id) {
        try {
            const response = await api.post(`/admin/paquetes/delete/${id}`, { 
                _method: 'DELETE' 
            });
            return response.data;
        } catch (error) {
            console.error("Error al eliminar el paquete:", error);
            throw error;
        }
    },

    /**
     * Crea un nuevo paquete de inversión.
     * @param {Object} data - Datos del nuevo paquete.
     */
    async create(data) {
        try {
            const response = await api.post('/admin/paquetes', data);
            return response.data;
        } catch (error) {
            console.error("Error al crear el paquete:", error);
            throw error;
        }
    },
};

export default PaqueteService;