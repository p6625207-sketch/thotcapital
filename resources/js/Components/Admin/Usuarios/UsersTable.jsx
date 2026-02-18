// resources/js/Components/admin/Users/UsersTable.jsx
import { Eye, User, Mail, Users, Wallet, Phone } from "lucide-react";
import { useState } from "react";
import DetalleTransactionModal from "@/Components/Admin/Transaction/DetailTransactionModal";

export default function UsersTable({ users }) {
  

    const data = Array.isArray(users) ? users : (users?.data || []);

    return (
        <>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/30">
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Usuario</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Gmail</th>
                              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Teléfono</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Referenciados</th>
                                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-amber-500 transition-colors">
                                                <User size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-white uppercase tracking-tight">
                                                {item.name} {item.last_name}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                                            <Mail size={14} className="text-slate-600" />
                                            <span className="text-xs text-slate-400">{item.email}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} className="text-slate-600" />
                                            <span className="text-xs text-slate-400">
                                                {item.phone || 'Sin número'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                                            {item.referrals_count || 0}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-black text-emerald-400 tabular-nums">
                                            ${parseFloat(item.wallet_balance).toFixed(2)}
                                        </span>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        
        </>
    );
}