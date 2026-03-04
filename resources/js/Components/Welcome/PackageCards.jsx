import { useState, useEffect } from "react";
import { CheckCircle2, Zap, TrendingUp, Wallet, Coins } from "lucide-react";
import PaqueteService from "@/Services/paquete.service";
import { Link } from "@inertiajs/react";

export default function PackageCards() {

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
        return (
            <div className="py-10 text-center text-slate-400 animate-pulse">
                Cargando paquetes...
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {paquetes.map((pkg) => (
                <div
                    key={pkg.id}
                    className="relative flex flex-col justify-between p-8 transition-all duration-300 border shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 hover:border-amber-500/50 rounded-3xl hover:-translate-y-2"
                >
                    {/* Nombre */}
                    <div className="mb-6 text-center">
                        <h3 className="text-lg font-bold tracking-widest uppercase text-amber-500">
                            {pkg.nombre}
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">
                            Ideal para comenzar a generar ingresos pasivos de forma segura.
                        </p>
                    </div>

                    {/* Precio */}
                    <div className="mb-6 text-center">
                        <p className="text-sm text-slate-400">Inversión</p>
                        <div className="text-4xl font-black text-white">
                            ${pkg.valor}
                        </div>
                    </div>

                    {/* Información financiera */}
                    <ul className="mb-8 space-y-4 text-sm">
                        <li className="flex items-center gap-2 text-slate-300">
                            <TrendingUp size={16} className="text-amber-500" />
                            Rendimiento: 
                            <span className="font-bold text-white">
                                {pkg.rendimiento}%
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-slate-300">
                            <Wallet size={16} className="text-amber-500" />
                            Comisión por referido:
                            <span className="font-bold text-white">
                               ${(Number(pkg.valor) * 0.10).toFixed(2)}
                            </span>
                        </li>

                        <li className="flex items-center gap-2 text-slate-300">
                            <Coins size={16} className="text-amber-500" />
                            Genere hasta un: 300% de su inversión
                        </li>

                        {pkg.features?.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-400">
                                <CheckCircle2 size={16} className="text-amber-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* Botón */}
                    <Link
                        href={"/packages"}
                        className="relative flex items-center justify-center w-full gap-2 py-4 font-bold text-black transition-all shadow-lg bg-amber-500 hover:bg-amber-600 rounded-2xl active:scale-95"
                    >
                        <Zap size={18} />
                        <span className="text-xs tracking-widest uppercase">
                            Activar Plan
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
