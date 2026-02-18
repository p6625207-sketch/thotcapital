import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReferralStats from "@/Components/Referrals/ReferralStats";
import ReferralCode from "@/Components/Referrals/ReferralCode";
import ReferralsList from "@/Components/Referrals/ReferralsList";
import UserService from "@/Services/user.service";
import ReferidoService from "@/Services/referido.service";

export default function ReferralsView() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [referralCode, setReferralCode] = useState("");
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const [codigoRes, statsRes] = await Promise.all([
                    UserService.obtenerCodigoReferido(user.id),
                    ReferidoService.obtenerListaReferidos(user.id),
                ]);

                // Código de referido
                if (!codigoRes?.error) {
                    setReferralCode(codigoRes.codigo_referido || "");
                }

                // Estadísticas
                if (!statsRes?.error) {
                    setTotalEarnings(statsRes);
                }
                
            } catch (error) {
                console.error("Error al cargar datos de referidos:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchData();
        }
    }, [user?.id]);




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
            <Head title="Referidos" />

            <div className="space-y-10">
               
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Sistema de Referidos
                    </h1>
                    <p className="mt-2 text-slate-300">
                        Invita amigos y gana comisiones por sus inversiones.
                    </p>
                </div>

             
                <ReferralStats
                    totalReferrals={totalEarnings}
                />

                <ReferralCode referralCode={referralCode} />

                
                <ReferralsList referrals={totalEarnings} loading={false} />
            </div>
        </AuthenticatedLayout>
    );
}