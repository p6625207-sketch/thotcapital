// resources/js/services/referralService.js
import api from "../lib/axios";

const referralService = {
    /**
     * Envía el código de referido para finalizar el registro de Google
     * @param {Object} data - Contiene el campo 'code'
     */
    async submitReferral(data) {
        try {
            // No necesitamos el ID en la URL porque la sesión identifica al usuario
            const response = await api.post('referral-join', data);
            
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            // Capturamos el error de forma más profesional para el frontend
            const message = error.response?.data?.message || "Error al procesar el código";
            console.error("Referral Error:", message);
            
            throw {
                success: false,
                message: message,
                errors: error.response?.data?.errors || {}
            };
        }
    },
};

export default referralService;