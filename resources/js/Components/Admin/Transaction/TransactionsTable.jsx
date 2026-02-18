// resources/js/Components/admin/TransactionsTable.jsx
import { Eye, Calendar, Box, DollarSign, TrendingUp, User, Activity } from "lucide-react";
import { useState } from "react";
import DetalleTransactionModal from "@/Components/Admin/Transaction/DetailTransactionModal";

export default function TransactionsTable({ transactions }) {

    const [selectedTrx, setSelectedTrx] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (trx) => {
        setSelectedTrx(trx);
        setIsModalOpen(true);
    };
    // Si usas paginación de Laravel, los datos están en transactions.data
    const data = transactions.data || transactions;

    return (
        <>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/30">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fecha</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Inversor</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nombre del paquete</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valor paquete</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Rendimiento</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Estado</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Ver</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                    {/* FECHA */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-amber-500 transition-colors">
                                                <Calendar size={16} />
                                            </div>
                                            <span className="text-sm font-medium text-slate-300">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>

                                    {/* COLUMNA USUARIO (INVERSOR) */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-amber-500 transition-colors">
                                                <User size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                                                    {item.user?.name} {item.user?.last_name}
                                                </span>
                                                <span className="text-[10px] text-slate-500">
                                                    {item.user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* NOMBRE DEL PAQUETE */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Box size={14} className="text-amber-500/50" />
                                            <span className="text-sm font-bold text-white uppercase tracking-tight">
                                                {item.paquete_nombre}
                                            </span>
                                        </div>
                                    </td>

                                    {/* VALOR PAQUETE */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 text-emerald-400">
                                            <DollarSign size={14} />
                                            <span className="text-sm font-black tabular-nums">
                                                {Number(item.paquete_valor).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </td>

                                    {/* RENDIMIENTO */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md">
                                                <TrendingUp size={12} className="text-blue-400" />
                                                <span className="text-[11px] font-bold text-blue-400">
                                                    {item.rendimiento}%
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* NUEVA COLUMNA: ESTADO ACTIVO/INACTIVO */}
                                    <td className="px-6 py-4 text-center">
                                        {item.is_active ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-wider">
                                                <Activity size={10} />
                                                Activo
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-800 text-slate-500 border border-slate-700 uppercase tracking-wider">
                                                Inactivo
                                            </span>
                                        )}
                                    </td>

                                    {/* ACCIÓN VER */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Inserción del Modal */}
            <DetalleTransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                transaction={selectedTrx}
            />
        </>
    );
}