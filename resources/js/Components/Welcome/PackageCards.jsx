import { useState, useEffect } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import PaqueteService from "@/Services/paquete.service"; // 👈 importa el servicio
import { Link } from "@inertiajs/react";

export default function PackageCards() {

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [paquetes, setPaquetes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaquetes = async () => {
            const data = await PaqueteService.obtenerPaquetes();
            

            if (!data.error) {
                setPaquetes(data);
            }

            setLoading(false);
        };

        fetchPaquetes();
    }, []);

    if (loading) {
        return <div className="text-white items-center text-center">Cargando paquetes...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {paquetes.map((pkg) => (
                <div 
                    key={pkg.id}
                    className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 flex flex-col items-center group hover:border-amber-500/50 transition-all duration-300 shadow-xl"
                >
                    <span className="text-slate-500 font-bold text-sm tracking-widest mb-2">
                        {pkg.nombre}
                    </span>

                    <div className="text-5xl font-black text-white mb-6">
                        {pkg.valor}
                        <span className="text-amber-500 text-2xl">$</span>
                    </div>

                    <ul className="w-full space-y-3 mb-8">
                        {pkg.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                                <CheckCircle2 size={16} className="text-amber-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <Link 
                        href={"/packages"}
                        className="w-full group/btn relative flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 hover:border-amber-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
                    >
                        <Zap size={18} className="text-amber-500 group-hover/btn:animate-pulse" />
                        <span className="uppercase tracking-widest text-xs">
                            Activar
                        </span>
                        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/btn:opacity-100 rounded-2xl transition-opacity"></div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
