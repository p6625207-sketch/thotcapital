import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function WithdrawalCard({ withdrawal }) {

    const statusStyles = {
        pendiente: "bg-yellow-500/15 text-amber-400 border border-yellow-500/30",
        aprobado: "bg-blue-500/15 text-green-400 border border-blue-500/30",
        rechazado: "bg-red-500/15 text-red-400 border border-red-500/30",
    };

    const statusIcon = {
        aprobado: <CheckCircle size={16} color="white" />,
        pendiente: <Clock size={16} color="white" />,
        rechazado: <XCircle size={16} />,
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-5 flex justify-between items-center hover:border-slate-700 transition-all">
            <div>
                <p className="text-white font-semibold text-lg">
                    ${withdrawal.amount}
                </p>
                <p className="text-slate-300 text-sm mt-1">
                    {withdrawal.date}
                </p>
            </div>

            <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusStyles[withdrawal.status]}`}
            >
                {statusIcon[withdrawal.status]}
                {withdrawal.status.toUpperCase()}
            </span>
        </div>
    );
}