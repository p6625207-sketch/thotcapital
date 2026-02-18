// resources/js/Components/admin/DetalleTransactionModal.jsx
import { X, User, Package, Mail, Users, Wallet } from "lucide-react";

export default function DetalleTransactionModal({ isOpen, onClose, transaction }) {
    if (!isOpen || !transaction) return null;

    const user = transaction.user;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Cabecera */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                        Detalle de la transacción
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-4 text-slate-300">
                        <User className="text-amber-500" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Usuario:</span>
                        <span className="text-white ml-auto">{user?.name} {user?.last_name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-300">
                        <Package className="text-amber-500" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Paquete actual:</span>
                        <span className="text-white ml-auto font-black">{transaction.paquete_nombre}</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-300">
                        <Mail className="text-amber-500" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Gmail:</span>
                        <span className="text-white ml-auto">{user?.email}</span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-300">
                        <Users className="text-amber-500" size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">Número de referidos:</span>
                        <span className="ml-auto bg-amber-500/10 px-3 py-1 rounded-full text-amber-500 font-bold border border-amber-500/20">
                            {user?.referrals_count || 0}
                        </span>
                    </div>

                    <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                            <Wallet size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Balance disponible</span>
                        </div>
                        <span className="text-3xl font-black text-emerald-400 tabular-nums">
                            ${user?.wallet_balance}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}