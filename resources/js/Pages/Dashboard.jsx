import { useState, useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {
    Package,
    TrendingUp,
    Users,
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
                const [codigoRes, paqueteRes,referidosRes] = await Promise.all([
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
                name: paquete.nombre,
                amount: paquete.valor,
                monthlyRate: paquete.rendimiento,
                startDate: paquete.created_at,
                PageDate: paquete.paid_at,
                totalReferrals: referidos?.total_referidos ?? 0,
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

                <Inicio user={user} data={data} showBalance={showBalance} setShowBalance={setShowBalance}/>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </div>


                <div className="grid lg:grid-cols-2 gap-6">
                    <Paquetes data={data}/>
                    <Referido copied={copied} data={data} handleCopyReferral={handleCopyReferral}/>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
