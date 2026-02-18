// app/frontend/services/paqueteService.js
import api from "../lib/axios";

const SolicitudRetiro = {
    // Cambiamos el nombre a uno más descriptivo y corregimos la URL
    async updateStatus(id, status) {
        try {
            // Enviamos el 'status' en el cuerpo de la petición (body)
           const response = await api.post(`/admin/retiros/${id}/update-status`, { 
                _method: 'PATCH', 
                status: status 
            });
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el retiro:", error);
            throw error;
        }
    },

    async Search(termino = "", estado = "todos") {
        try {
            // Enviamos los filtros como parámetros de URL (?search=...&status=...)
            const response = await api.get(`/admin/retiros/search`, { 
                params: { 
                    search: termino, 
                    status: estado 
                } 
            });
            return response.data;
        } catch (error) {
            console.error("Error al buscar los retiros:", error);
            throw error;
        }
    },
};

export default SolicitudRetiro;