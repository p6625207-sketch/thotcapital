import { Users, DollarSign } from "lucide-react";

export default function ReferralStats({ totalReferrals }) {

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8">
            <div className="grid md:grid-cols-2 gap-6">
               
                <div className="flex items-center gap-4 bg-slate-800/60 p-5 rounded-xl border border-slate-700">
                    <Users size={32} className="text-purple-400" />
                    <div>
                        <p className="text-2xl font-bold text-white">
                            {totalReferrals.total_referidos}
                        </p>
                        <p className="text-slate-300 text-sm">
                            Referidos Totales
                        </p>
                    </div>
                </div>

         
                <div className="flex items-center gap-4 bg-slate-800/60 p-5 rounded-xl border border-slate-700">
                    <DollarSign size={32} className="text-green-400" />
                    <div>
                        <p className="text-2xl font-bold text-white">
                            ${totalReferrals.total_ganado.toFixed(2) || 0}
                        </p>
                        <p className="text-slate-300 text-sm">
                            Comisiones Ganadas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}