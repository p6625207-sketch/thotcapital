import api from "../lib/axios";

const ReferidoService = {

    /**
     * Obtener lista completa de referidos de un usuario
     * @param {number} userId - ID del usuario
     * @returns {Promise} - Array de referidos
     */
    async obtenerListaReferidos(userId) {
        try {
            const response = await api.get(`/referidos/${userId}/lista`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener lista de referidos:", error);
            return { error: true, message: error.message };
        }
    },

    /**
     * Obtener número de referidos
     * @param {number} userId - ID del usuario
     * @returns {Promise} - Objeto con total de referidos
     */
    async obtenerNumerodeReferidos(userId) {
        try {
            const response = await api.get(`/referidos/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener número de referidos:", error);
            return { error: true, message: error.message };
        }
    },
};

export default ReferidoService;