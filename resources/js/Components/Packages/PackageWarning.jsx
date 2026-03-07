import { AlertCircle, RefreshCw } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function PackageWarning({ activePackage }) {

    if (!activePackage || activePackage.progreso < 90) {
        return null;
    }

    const isCompleted = activePackage.progreso >= 100;

    return (
        <div className="relative overflow-hidden bg-slate-900 border border-amber-500/50 rounded-2xl p-4 md:p-6 shadow-lg shadow-amber-900/20">

            {/* glow background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">

                <div className="flex items-center gap-4">

                    <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500 animate-pulse">
                        <AlertCircle size={24}/>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg">
                            {isCompleted
                                ? "Ciclo Completado (300%)"
                                : "¡Cuidado! Tu paquete está por vencer"}
                        </h4>

                        <p className="text-slate-400 text-sm">
                            {isCompleted
                                ? "Reinvierta ahora para continuar generando ganancias en la red."
                                : "Has consumido casi el total de tu cupo. Actualiza o reinvierte para no perder comisiones."}
                        </p>
                    </div>

                </div>

                <Link
                    href="/packages"
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap"
                >
                    <RefreshCw size={18}/>

                    {isCompleted
                        ? "Reinvertir Paquete"
                        : "Actualizar Paquete"}
                </Link>

            </div>

            <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">

                <div
                    className={`h-full transition-all duration-1000 ${
                        isCompleted ? "bg-red-500" : "bg-amber-500"
                    }`}
                    style={{
                        width: `${Math.min(activePackage.progreso, 100)}%`
                    }}
                ></div>

            </div>

        </div>
    );
}