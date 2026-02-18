import { useEffect, useState, useRef } from 'react'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import PaymentService from '@/Services/payment.service'

export default function VerifyPaymentModal({ paquete, onClose, onPurchaseComplete }) {
    const [status, setStatus] = useState('verifying') // verifying | confirmed | failed
    const [transaction, setTransaction] = useState(null)
    const [deposit, setDeposit] = useState(null)
    const intervalRef = useRef(null)

    useEffect(() => {
        const checkPayment = async () => {
            try {
                const res = await PaymentService.verificarPago(paquete.id)

                if (res.status === 'confirmed') {
                    setTransaction(res.transaction)
                    setDeposit(res.deposit)
                    setStatus('confirmed')
                    clearInterval(intervalRef.current)
                } else if (res.status === 'error') {
                    setStatus('failed')
                    clearInterval(intervalRef.current)
                }
                // si es 'pending', sigue verificando
            } catch (err) {
                console.error('Error verificando pago:', err)
                setStatus('failed')
                clearInterval(intervalRef.current)
            }
        }

        // Primera verificación inmediata
        checkPayment()

        // Polling cada 10 segundos
        intervalRef.current = setInterval(checkPayment, 10000)

        return () => clearInterval(intervalRef.current)
    }, [paquete.id])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 text-center space-y-4">

                <h3 className="text-xl font-bold text-white mb-2">
                    {status === 'confirmed' ? 'Pago Confirmado' : 'Verificando Pago'}
                </h3>

             
                {status === 'verifying' && (
                    <>
                        <div className="flex justify-center mb-4">
                            <Loader2 className="animate-spin text-amber-400" size={40} />
                        </div>
                        <p className="text-slate-300 text-sm">
                            Estamos verificando tu depósito de{' '}
                            <span className="text-amber-400 font-bold">${paquete.valor} USDT</span> en Binance.
                        </p>
                        <p className="text-slate-500 text-xs">
                            Esto puede tomar unos minutos. No cierres esta ventana.
                        </p>
                    </>
                )}

          
                {status === 'confirmed' && (
                    <>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="text-green-400" size={40} />
                        </div>
                        <p className="text-slate-300 text-sm">
                            Tu paquete <span className="font-semibold text-amber-400">{transaction?.paquete_nombre}</span> está activo.
                        </p>
                        <div className="bg-slate-800 rounded-xl p-4 space-y-2 text-left text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Valor</span>
                                <span className="text-white">${transaction?.paquete_valor} USDT</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Rendimiento</span>
                                <span className="text-green-400">{transaction?.rendimiento}% mensual</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Fecha de pago</span>
                                <span className="text-white">{transaction?.paid_at}</span>
                            </div>
                            {deposit && (
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Monto recibido</span>
                                    <span className="text-white">{deposit.amount} {deposit.coin}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div className="flex justify-center mb-4">
                            <XCircle className="text-red-400" size={40} />
                        </div>
                        <p className="text-slate-300 text-sm">
                            No se pudo verificar el pago. Verifica que hayas enviado el monto correcto e intenta nuevamente.
                        </p>
                    </>
                )}

                {status !== 'verifying' && (
                    <button
                        onClick={status === 'confirmed' ? onPurchaseComplete : onClose}
                        className="w-full rounded-xl bg-slate-800 py-3 text-white hover:bg-slate-700 mt-4"
                    >
                        {status === 'confirmed' ? 'Listo' : 'Cerrar'}
                    </button>
                )}
            </div>
        </div>
    )
}
