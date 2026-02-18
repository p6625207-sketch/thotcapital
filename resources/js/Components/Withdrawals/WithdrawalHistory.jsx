import { Link } from "@inertiajs/react";
import WithdrawalCard from "@/Components/Withdrawals/WithdrawalCard";

export default function WithdrawalHistory({ withdrawals, loading }) {
    return (
        <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Historial</h3>

            {loading ? (
                <p className="text-slate-400 text-sm">Cargando historial...</p>
            ) : withdrawals.length === 0 ? (
                <p className="text-slate-400 text-sm">No hay retiros aún.</p>
            ) : (
                withdrawals.map((w) => (
                    <WithdrawalCard
                        key={w.id}
                        withdrawal={{
                            id: w.id,
                            amount: w.amount,
                            status: w.status,
                            date: new Date(w.created_at).toLocaleDateString(),
                        }}
                    />
                ))
            )}

            <div className="pt-4 text-center">
                <Link
                    href="/history"
                    className="text-amber-400 text-sm underline hover:text-amber-300 transition"
                >
                    Ver historial completo →
                </Link>
            </div>
        </div>
    );
}