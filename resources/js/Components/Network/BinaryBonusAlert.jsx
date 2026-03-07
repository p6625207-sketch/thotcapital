import { TrendingUp, Users } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function BinaryBonusAlert({ activePackage }) {

    if (!activePackage || activePackage.porcentajeNivel <= 0) {
        return null;
    }

    return (
        <div className="relative overflow-hidden bg-slate-900 border border-blue-500/40 rounded-2xl p-4 md:p-6 shadow-lg shadow-blue-900/20">

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">

                <div className="flex items-center gap-4">

                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 animate-pulse">
                        <TrendingUp size={24} />
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg">
                            Bono Binario Activo
                        </h4>

                        <p className="text-slate-400 text-sm">
                            Estás en el
                            <span className="text-blue-400 font-bold">
                                {" "}Nivel {activePackage.nivelPiramide}{" "}
                            </span>
                            y cobras
                            <span className="text-blue-400 font-bold">
                                {" "}{activePackage.porcentajeNivel}%{" "}
                            </span>
                            mensual sobre el lado menor.
                        </p>
                    </div>

                </div>

                <Link
                    href="/network"
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap"
                >
                    <Users size={18} />
                    Ver Red
                </Link>

            </div>
        </div>
    );
}