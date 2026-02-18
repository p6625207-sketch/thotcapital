// resources/js/Components/admin/QuickNav.jsx
import { Users, Wallet, Package } from "lucide-react";

export default function QuickNav({ onScrollToSection, refs }) {
    const navItems = [
        { label: "transacciones", icon: Users, ref: refs.users },
        { label: "solicitud de retiro", icon: Wallet, ref: refs.withdrawals },
        { label: "paquetes", icon: Package, ref: refs.packages },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-5xl">
            {navItems.map((item, index) => (
                <button
                    key={index}
                    onClick={() => onScrollToSection(item.ref)}
                    className="flex flex-col items-center justify-center gap-3 p-5 sm:p-8 bg-slate-900/40 border border-slate-800 rounded-2xl sm:rounded-[2rem] hover:bg-slate-900 hover:border-amber-500/50 transition-all group shadow-lg"
                >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500 group-hover:text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
}