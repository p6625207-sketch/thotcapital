import { useState } from 'react'
import { Copy, CheckCircle } from 'lucide-react'
import VerifyPaymentModal from './VerifyPaymentModal'

const WALLET_ADDRESS = 'TMSM6CCgmpDsdjwX6ESnH8ch3jDUgL1RoX' // TODO: cambiar por la wallet real de la plataforma
const NETWORK = 'TRC20'

export default function PaymentModal({ paquete, onClose, onPurchaseComplete }) {
    const [step, setStep] = useState('instructions') // instructions | verifying
    const [copied, setCopied] = useState(false)

    const copyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (step === 'verifying') {
        return (
            <VerifyPaymentModal
                paquete={paquete}
                onClose={onClose}
                onPurchaseComplete={onPurchaseComplete}
            />
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">

                <h3 className="text-xl font-bold text-white text-center">
                    Comprar Paquete
                </h3>

                <div className="bg-slate-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Paquete</span>
                        <span className="text-white font-semibold">{paquete.nombre}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Valor</span>
                        <span className="text-amber-400 font-bold">${paquete.valor} USDT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Rendimiento</span>
                        <span className="text-green-400">{paquete.rendimiento}% mensual</span>
                    </div>
                </div>

               
                <div className="space-y-3">
                    <p className="text-sm text-slate-300 text-center">
                        Envía exactamente <span className="text-amber-400 font-bold">${paquete.valor} USDT</span> a la siguiente dirección:
                    </p>

                    <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between gap-2">
                        <span className="text-xs text-slate-300 truncate font-mono">
                            {WALLET_ADDRESS}
                        </span>
                        <button
                            onClick={copyAddress}
                            className="text-amber-400 hover:text-amber-300 flex-shrink-0"
                        >
                            {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                        </button>
                    </div>

                    <p className="text-xs text-center text-slate-500">
                        Red: <span className="text-slate-300 font-semibold">{NETWORK}</span>
                    </p>
                </div>

                <div className="bg-slate-800/50 border border-amber-500/20 p-3 rounded-lg text-xs text-slate-400 text-center">
                    Asegúrate de enviar exactamente el monto indicado en "USDT" y en la red correcta.
                    Los pagos enviados desde otra red no podrán ser verificados.
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl bg-slate-800 py-3 text-sm text-white hover:bg-slate-700"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => setStep('verifying')}
                        className="flex-1 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-black hover:bg-amber-400"
                    >
                        Ya pagué, verificar
                    </button>
                </div>
            </div>
        </div>
    )
}
