import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import obtenerHistorial from "@/Services/historial.service";

export default function HistoryView() {

    const { auth } = usePage().props;
    const userId = auth.user.id;

    const [earnings, setEarnings] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [totals, setTotals] = useState({ totalGanado: 0, totalRetiros: 0, totalRegistros: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const earningsData = await obtenerHistorial.obtenerHistorialPorcentaje(userId);
            const retiroData = await obtenerHistorial.obtenerHistorialRetiro(userId);

            if (!earningsData.error) {
                setEarnings(earningsData.historial || []);
                setTotals((prev) => ({
                    ...prev,
                    totalGanado: earningsData.historial?.reduce(
                        (sum, e) => sum + Number(e.amount), 0
                    ),
                    totalRegistros: earningsData.total_registros || 0
                }));
            }

            if (!retiroData.error) {
                setWithdrawals(retiroData.retiros || []);
                setTotals((prev) => ({
                    ...prev,
                    totalRetiros: retiroData.total_retirado || 0
                }));
            }

            setLoading(false);
        };

        fetchData();
    }, [userId]);

    const statusColors = {
        aprobado: "bg-green-500/20 text-green-400",
        pendiente: "bg-yellow-500/20 text-amber-400",
        rechazado: "bg-red-500/20 text-red-400",
    };

      if (loading) {
             return (
                 <AuthenticatedLayout>
                     <div className="min-h-screen flex items-center justify-center">
                         <div className="text-center">
                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                             <p className="text-white text-lg">Cargando ...</p>
                         </div>
                     </div>
                 </AuthenticatedLayout>
             )
         }

    return (
        <AuthenticatedLayout>
            <Head title="Historial" />

            <div className="space-y-10">

                <div>
                    <h1 className="text-3xl font-bold text-white">Historial Completo</h1>
                    <p className="mt-2 text-slate-300">
                        Todas tus transacciones y movimientos
                    </p>
                </div>


                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                        <p className="text-slate-400">Ganancias Totales</p>
                        <p className="text-2xl font-bold text-green-400">
                            ${totals.totalGanado.toFixed(2)}
                        </p>
                        <p className="text-slate-400 text-sm">({totals.totalRegistros} registros)</p>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                        <p className="text-slate-400">Retiros Totales</p>
                        <p className="text-2xl font-bold text-red-400">
                            ${totals.totalRetiros.toFixed(2)}
                        </p>
                    </div>

                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Ganancias Mensuales</h3>

                    {loading ? (
                        <p className="text-slate-400">Cargando...</p>
                    ) : earnings.length === 0 ? (
                        <p className="text-slate-400">No hay ganancias registradas</p>
                    ) : (
                        <div className="space-y-4">
                            {earnings.map((earning, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">
                                                Ganancia {earning.porcentaje}%
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                {new Date(earning.fecha).toLocaleDateString()} • {earning.paquete_nombre}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-green-400 font-semibold text-lg">
                                        +${Number(earning.amount).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Retiros</h3>

                    {loading ? (
                        <p className="text-slate-400">Cargando...</p>
                    ) : withdrawals.length === 0 ? (
                        <p className="text-slate-400">No hay retiros registrados</p>
                    ) : (
                        <div className="space-y-4">
                            {withdrawals.map((withdrawal) => (
                                <div
                                    key={withdrawal.id}
                                    className="flex items-center justify-between bg-slate-800/60 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                            <Wallet size={20} color="white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Retiro</p>
                                            <p className="text-slate-400 text-sm">
                                                {new Date(withdrawal.fecha).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[withdrawal.status]}`}
                                        >
                                            {withdrawal.status === "aprobado"
                                                ? "Aprobado"
                                                : withdrawal.status === "pending"
                                                    ? "Pendiente"
                                                    : withdrawal.status === "rechazado"
                                                        ? "Rechazado"
                                                        : "Pendiente"}
                                        </span>
                                        <span className={`${withdrawal.status === "aprobado" ? "text-red-400" : "text-green-400"} font-semibold`}>
                                            {withdrawal.status === "aprobado" ? "-" : "+"}${Number(withdrawal.amount).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
