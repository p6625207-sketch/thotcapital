// resources/js/Components/admin/AdminCTA.jsx
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";

export default function AdminCTA({ 
    sectionRef, 
    title, 
    description, 
    buttonText, 
    href, 
    icon: Icon = ChevronRight, // Icono opcional, por defecto flecha
    variant = "amber" // Permite cambiar el esquema de color fácilmente
}) {
    // Mapa de colores para mantener la consistencia
    const colors = {
        amber: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/20 text-slate-950",
        blue: "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20 text-white",
        emerald: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20 text-white",
    };

    const glows = {
        amber: "bg-amber-500/5",
        blue: "bg-blue-500/5",
        emerald: "bg-emerald-500/5",
    };

    return (
        <section ref={sectionRef} className="max-w-7xl mx-auto w-full px-4 sm:px-9">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                {/* Brillo dinámico según la variante */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] rounded-full ${glows[variant]}`} />
                
                <div className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter">
                        {title}
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mb-8 max-w-md mx-auto font-medium">
                        {description}
                    </p>
                    <Link 
                        href={href} 
                        className={`inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-[10px] sm:text-xs tracking-[0.2em] transition-all shadow-xl active:scale-95 ${colors[variant]}`}
                    >
                        {buttonText} <Icon size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}