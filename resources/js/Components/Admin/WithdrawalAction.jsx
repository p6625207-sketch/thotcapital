// resources/js/Components/admin/WithdrawalAction.jsx
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function WithdrawalAction({ sectionRef }) {
    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto w-full px-4 sm:px-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[80px] rounded-full" />
                
                <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                        Solicitudes de Retiro
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-8 max-w-md mx-auto font-medium">
                        Revisión y aprobación manual de transacciones solicitadas por los usuarios en la red blockchain.
                    </p>
                    <Link 
                        href="/admin/Ventas" 
                        className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 px-10 py-4 rounded-2xl font-black text-[10px] sm:text-xs tracking-[0.2em] transition-all shadow-xl shadow-amber-500/20"
                    >
                        REVISAR SOLICITUDES <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}