import { useState, useEffect } from 'react'
import { Head, usePage, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {
    Package,
    TrendingUp,
    Users,
    Zap,
    AlertCircle,
    RefreshCw
} from 'lucide-react'
import obtenerCodigoReferido from '@/Services/user.service'
import obtenerPaquetesDeUsuario from '@/Services/paquete.service'
import obtenerNumerodeReferidos from '@/Services/referido.service'
import StatCard from '@/Components/Dashboard/StatCard'
import Inicio from '@/Components/Dashboard/Inicio'
import Paquetes from '@/Components/Dashboard/Paquetes'
import Referido from '@/Components/Dashboard/Referido'

export default function Dashboard() {
    const { auth } = usePage().props
    const user = auth?.user
    const [showBalance, setShowBalance] = useState(true)
    const [paquete, setpaquete] = useState(null)
    const [copied, setCopied] = useState(false)
    const [codigos, setcodigos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [referidos, setreferidos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [codigoRes, paqueteRes, referidosRes] = await Promise.all([
                    obtenerCodigoReferido.obtenerCodigoReferido(user.id),
                    obtenerPaquetesDeUsuario.obtenerPaquetesDeUsuario(user.id),
                    obtenerNumerodeReferidos.obtenerNumerodeReferidos(user.id)
                ]);

                if (!referidosRes?.error) {
                    setreferidos(referidosRes);
                } else {
                    setreferidos(null);
                }


                if (!codigoRes?.error) {
                    setcodigos(codigoRes);
                } else {
                    setcodigos(null);
                }

                if (
                    paqueteRes &&
                    typeof paqueteRes === "object" &&
                    Object.keys(paqueteRes).length > 0 &&
                    paqueteRes.nombre
                ) {
                    setpaquete(paqueteRes);
                } else {
                    setpaquete(null);
                }

            } catch (error) {
                console.error(error);
                setpaquete(null);
                setcodigos(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id]);

    const data = {
        balance: Number(user?.wallet_balance ?? 0),

        activePackage: paquete
            ? {
                name: paquete.nombre || 'Sin paquete',
                amount: Number(paquete.valor ?? 0),
                monthlyRate: paquete.rendimiento,
                startDate: paquete.created_at,
                PageDate: paquete.paid_at,
                totalReferrals: referidos?.total_referidos ?? 0,

                ganadoAcumulado: paquete.ganancia_acumulada ?? 0,
                disponible: paquete.capacidad_disponible ?? 0,
                progreso: paquete.porcentaje_progreso ?? 0,
                limite: paquete.limite_maximo ?? 0,

                gananciaHoy: paquete.ganancia_hoy ?? 0,
                progresoDiario: paquete.porcentaje_diario ?? 0,
                limiteDiario: paquete.limite_diario ?? 0,
                disponibleDiario: paquete.disponible_diario ?? 0,

            }
            : null,
        referralCode: codigos?.codigo_referido ?? null,
    };

    const handleCopyReferral = () => {
        if (!data.referralCode) return;
        navigator.clipboard.writeText(data.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
            <Head title="Dashboard" />

            <div className="space-y-8">

                <Inicio user={user} data={data} showBalance={showBalance} setShowBalance={setShowBalance} />


                {data.activePackage && data.activePackage.progreso >= 90 && (
                    <div className="relative overflow-hidden bg-slate-900 border border-amber-500/50 rounded-2xl p-4 md:p-6 shadow-lg shadow-amber-900/20">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500 animate-pulse">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">
                                        {data.activePackage.progreso >= 100
                                            ? "Ciclo Completado (300%)"
                                            : "¡Cuidado! Tu paquete está por vencer"}
                                    </h4>
                                    <p className="text-slate-400 text-sm">
                                        {data.activePackage.progreso >= 100
                                            ? "Reinvierta ahora para continuar generando ganancias en la red."
                                            : "Has consumido casi el total de tu cupo. Actualiza o reinvierte para no perder comisiones."}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/packages" 
                                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all whitespace-nowrap"
                            >
                                <RefreshCw size={18} />
                                {data.activePackage.progreso >= 100 ? "Reinvertir Paquete" : "Actualizar Paquete"}
                            </Link>
                        </div>

                        <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${data.activePackage.progreso >= 100 ? 'bg-red-500' : 'bg-amber-500'}`}
                                style={{ width: `${Math.min(data.activePackage.progreso, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        icon={Package}
                        label="Paquete Activo:"
                        value={data.activePackage?.name ?? "Sin paquete"}
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Proximo Pago"
                        value={data.activePackage?.PageDate ?? 'Activa un paquete'}
                        trend={paquete?.rendimiento ?? ''}
                    />
                    <StatCard
                        icon={Users}
                        label="Referidos"
                        value={data.activePackage?.totalReferrals ?? '0'}
                    />
                    <StatCard
                        icon={Zap}
                        label="Cupo disponible"
                        value={data.activePackage ? `$${data.activePackage.disponible.toFixed(2)}` : '$0.00'}
                        trend={data.activePackage ? data.activePackage.progreso : 0} />
                </div>

                {data.activePackage && (
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">Progreso del Contrato (300%)</h3>
                                <p className="text-white/50 text-sm">Has ganado ${data.activePackage.ganadoAcumulado.toFixed(2)} de un máximo de ${data.activePackage.limite.toFixed(2)}</p>
                            </div>
                            <span className="text-amber-500 font-bold text-xl">{data.activePackage.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-white/5">
                            <div
                                className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-1000 ease-out"
                                style={{ width: `${data.activePackage.progreso}%` }}
                            />
                        </div>
                        <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-wider">
                            <span className="text-white/40">Inicio: {data.activePackage.startDate}</span>
                            <span className="text-amber-500/80">Quedan ${data.activePackage.disponible.toFixed(2)} por cobrar</span>
                        </div>
                    </div>
                )}

                {data.activePackage && (
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 mt-6">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">Capping Diario (200%)</h3>
                                <p className="text-white/50 text-sm">
                                    Ganado hoy: ${data.activePackage.gananciaHoy.toFixed(2)} de un máximo de ${data.activePackage.limiteDiario.toFixed(2)}
                                </p>
                            </div>
                            <span className="text-green-400 font-bold text-xl">{data.activePackage.progresoDiario}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-white/5">
                            <div
                                className="bg-gradient-to-r from-green-600 to-green-400 h-full transition-all duration-1000 ease-out"
                                style={{ width: `${data.activePackage.progresoDiario}%` }}
                            />
                        </div>
                        <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-wider">
                            <span className="text-white/40">El límite diario se reinicia a las 00:00 del día siguiente</span>
                            <span className="text-green-400 ">Quedan ${data.activePackage.disponibleDiario.toFixed(2)} por cobrar</span>
                        </div>

                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                    <Paquetes data={data} />
                    <Referido copied={copied} data={data} handleCopyReferral={handleCopyReferral} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
