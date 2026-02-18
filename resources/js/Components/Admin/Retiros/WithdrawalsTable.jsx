// resources/js/Components/admin/WithdrawalsTable.jsx
import { Eye, Edit3, Clock, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import StatusModal from "@/Components/Admin/Retiros/StatusModal";
import SolicitudRetiro from "@/Services/retiros.admin.service";
import { router } from "@inertiajs/react";

export default function WithdrawalsTable({ withdrawals }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
    const [statusStep, setStatusStep] = useState('idle'); 

    const handleEditClick = (withdrawal) => {
        setSelectedWithdrawal(withdrawal);
        setStatusStep('idle');
        setIsModalOpen(true);
    };

    const handleStatusUpdate = async (newStatus) => {
        setStatusStep('executing'); 
        
        try {
            await SolicitudRetiro.updateStatus(selectedWithdrawal.id, newStatus);
            
            setStatusStep('success'); 
            
            setTimeout(() => {
                setIsModalOpen(false);
                router.reload({ only: ['retiros'] });
            }, 2000);

        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("No se pudo actualizar el estado");
            setStatusStep('idle');
        }
    };
    
    const getStatusStyles = (status) => {
        const styles = {
            paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
            approved: "bg-blue-500/10 text-blue-500 border-blue-500/20",
            pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
            rejected: "bg-red-500/10 text-red-400 border-red-500/20",
        };
        return styles[status.toLowerCase()] || styles.pending;
    };

    return (
        <>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/30">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Usuario</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fecha</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Monto</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Wallet</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {withdrawals.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">
                                                {item.user.name} {item.user.last_name}
                                            </span>
                                            <span className="text-[10px] text-slate-500">{item.user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-white">${item.amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono bg-slate-950/50 px-2 py-1 rounded-lg w-fit">
                                            {item.wallet_address.substring(0, 6)}...{item.wallet_address.substring(item.wallet_address.length - 4)}
                                            <ExternalLink size={10} className="text-slate-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyles(item.status)} uppercase tracking-wider`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">

                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all">
                                                <Edit3 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Estado */}
            <StatusModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleStatusUpdate}
                transaction={selectedWithdrawal}
                statusStep={statusStep} 
            />
        </>
    );
}