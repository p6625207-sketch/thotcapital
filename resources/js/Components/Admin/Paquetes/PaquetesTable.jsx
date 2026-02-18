// resources/js/Components/admin/Paquetes/PaquetesTable.jsx
import { Calendar, Package, DollarSign, TrendingUp, Percent, Trash2, Edit3 } from "lucide-react";
import EditPaqueteModal from "./EditPaqueteModal";
import PaqueteService from '@/Services/paquetes.admin.service';
import { router } from '@inertiajs/react';
import { useState } from "react";

export default function PaquetesTable({ paquetes }) {
    const [selectedPaquete, setSelectedPaquete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Si usas paginación de Laravel, los datos están en paquetes.data
    const data = Array.isArray(paquetes) ? paquetes : (paquetes?.data || []);

    // Función para abrir el modal de edición
    const handleEditClick = (paquete) => {
        setSelectedPaquete(paquete);
        setIsEditModalOpen(true);
    };

    // Función para eliminar usando tu service
    const handleDelete = async (id, nombre) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el paquete "${nombre}"?`)) {
            try {
                await PaqueteService.delete(id);
                router.reload({ only: ['paquetes'] });
            } catch (error) {
                alert("Error al eliminar el paquete");
            }
        }
    };

    return (
        <>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/30">
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fecha Creación</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nombre</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valor</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Rendimiento</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Comisión</th>
                            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                
                                {/* FECHA CREACIÓN */}
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

                                {/* NOMBRE DEL PAQUETE */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Package size={14} className="text-amber-500/50" />
                                        <span className="text-sm font-bold text-white uppercase tracking-tight">
                                            {item.nombre}
                                        </span>
                                    </div>
                                </td>

                                {/* VALOR */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-emerald-400 font-black">
                                        <DollarSign size={14} />
                                        <span className="text-sm tabular-nums">
                                            {Number(item.valor).toLocaleString('en-US', { minimumFractionDigits: 2 })}
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

                                {/* COMISIÓN */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md">
                                            <span className="text-[11px] font-bold text-amber-500">
                                                {item.comision}%
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* ACCIONES (ELIMINAR / EDITAR) */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                       onClick={() => handleEditClick(item)}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700">
                                            <Edit3 size={18} />
                                        </button>
                                        
                                        <button 
                                         onClick={() => handleDelete(item.id, item.nombre)}
                                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Renderizado del Modal */}
            <EditPaqueteModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                paquete={selectedPaquete}
            />
        </>
    );
}