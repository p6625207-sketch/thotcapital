import {
    Copy,
    CheckCircle,
} from 'lucide-react'
import { Link } from '@inertiajs/react'

export default function Referido({copied,data,handleCopyReferral}) {
    return ( 
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
                Tu Código de Referido
            </h3>

            <p className="text-slate-400 mb-4">
                Comparte tu código y gana comisiones.
            </p>

            <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <code className="text-amber-400 font-semibold">
                    {data.referralCode}
                </code>

                <button onClick={handleCopyReferral}>
                    {copied ? (
                        <CheckCircle
                            size={20}
                            className="text-green-400"
                        />
                    ) : (
                        <Copy size={20} className="text-slate-400" />
                    )}
                </button>
            </div>

            <Link
                href="/referrals"
                className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-all"
            >
                Ver Mis Referidos
            </Link>
        </div>
    );
}