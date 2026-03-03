import {
    Wallet,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle
} from 'lucide-react'
import { Link } from '@inertiajs/react'
export default function Inicio({ user, data, showBalance, setShowBalance }) {

    const isAccountActive = data.activePackage != null;

    return (

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Bienvenido, {user?.name}
                </h1>
                <p className="text-slate-400 mt-1">
                    Gestiona tus inversiones y ganancias
                </p>

                {/* ESTADO DE LA CUENTA */}
                <div className="flex items-center gap-2 mt-2">
                    {isAccountActive ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle size={14} />
                            Cuenta Activa
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                            <XCircle size={14} />
                            Cuenta Inactiva
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full lg:w-96">
                <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">
                        Balance Disponible
                    </span>
                    <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-slate-400"
                    >
                        {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>

                <p className="text-3xl font-bold text-amber-400 mt-3">
                    {showBalance
                        ? `$${data.balance.toFixed(2)}`
                        : '••••••'}
                </p>

                <Link
                    href="/withdrawals"
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl transition-all"
                >
                    <Wallet size={18} />
                    Retirar Fondos
                </Link>
            </div>
        </div>
    );
}