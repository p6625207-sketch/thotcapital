export default function ReferralsList({ referrals, loading }) {
    if (loading) {
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                    Tus Referidos
                </h3>
                <p className="text-slate-400 text-sm">Cargando referidos...</p>
            </div>
        );
    }


    if (!referrals || referrals.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                    Tus Referidos
                </h3>
                <div className="text-center py-8">
                    <p className="text-slate-400 text-sm">
                        Aún no tienes referidos.
                    </p>
                    <p className="text-slate-500 text-xs mt-2">
                        Comparte tu código y empieza a ganar comisiones.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8">
            <h3 className="text-xl font-bold text-white mb-6">
                Tus Referidos ({referrals.total_referidos})
            </h3>

            <div className="space-y-4">
                {referrals.referidos.map((referral) => (
                    <div
                        key={referral.id}
                        className="flex justify-between items-center bg-slate-800/60 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition"
                    >
                        
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 font-bold">
                                {referral.name?.charAt(0) || "?"}
                            </div>

                            <div>
                                <p className="text-white font-medium">
                                    {referral.name || "Usuario"}
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Unido: {new Date(referral.created_at).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                  
                        <div className="flex items-center gap-6">


                            <span className="text-amber-400 font-semibold">
                                ${parseFloat(referral.ganancia_10_por_ciento || 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}