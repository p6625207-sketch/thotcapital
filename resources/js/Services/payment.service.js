import api from "../lib/axios";

const PaymentService = {
  async verificarPago(paqueteId) {
    try {
      const response = await api.post("/payment/verify", {
        paquete_id: paqueteId,
      });
      return response.data;
    } catch (error) {
      console.error("Error al verificar pago:", error);
      return { status: "error", message: error.response?.data?.message || error.message };
    }
  },
};

export default PaymentService;
