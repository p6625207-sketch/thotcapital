// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const obtenerHistorialDeRetiro = {

    
    async obtenerHistorialDeRetiro(userId) {
        try {
            const response = await api.get(`/historial/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener paquetes:", error);
            return { error: true, message: error.message };
        }
    },

    async solicitarRetiro(withdrawalData) {
    try {
        const response = await api.post('/retiros', withdrawalData);

        return response.data;

    } catch (error) {
        console.error('Error en solicitarRetiro:', error.response?.data || error.message);

        return {
            error: true,
            message: error.response?.data?.message || 'Error al solicitar retiro'
        };
    }
},

};

export default obtenerHistorialDeRetiro;
