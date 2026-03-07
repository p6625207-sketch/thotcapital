import { User, Mail, Circle } from "lucide-react";

export default function UserCard({ user }) {
    return (
        <div className="bg-slate-950/80 p-2 md:p-3 rounded-xl border border-white/5 flex items-center gap-3 hover:border-amber-500/40 transition-all shadow-md">

            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-500 border border-white/10">
                <User size={16} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-white text-[13px] font-bold truncate">
                    {user.name} {user.last_name}
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <Mail size={10} />
                    <span className="truncate">{user.email}</span>
                </div>
            </div>

            <div className="flex items-center gap-1 text-[12px] font-bold">
                <Circle
                    size={10}
                    className={user.has_active_transaction ? "text-emerald-500" : "text-red-500"}
                    fill="currentColor"
                />

                <span className={user.has_active_transaction ? "text-emerald-400" : "text-red-400"}>
                    {user.has_active_transaction ? "Activo" : "Inactivo"}
                </span>
            </div>

        </div>
    );
}