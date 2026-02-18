import { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import WithdrawalForm from "@/Components/Withdrawals/WithdrawalForm";
import WithdrawalHistory from "@/Components/Withdrawals/WithdrawalHistory";
import WithdrawalConfirmModal from "@/Components/Withdrawals/WithdrawalConfirmModal";
import retiroService from "@/Services/retiros.service";

export default function Withdrawals() {
    const { auth } = usePage().props;
    const users = auth?.user;

    const [amount, setAmount] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [balance, setBalance] = useState(
        parseFloat(users?.wallet_balance || 0)
    );
    const today = new Date().getDay();
    const isFriday = today === 5; // 5 = viernes

    const MIN_WITHDRAW = 1;

    const user = {
        balance: balance,
        wallet: users?.wallet_address || "",
    };

    useEffect(() => {
        const fetchHistorial = async () => {
            const data = await retiroService.obtenerHistorialDeRetiro(users.id);

            if (!data.error) {
                setWithdrawals(data);
            }
            
            setLoading(false);
        };

        if (users?.id) {
            fetchHistorial();
        }
    }, [users?.id]);

    const handleSubmitWithdrawal = () => {
        setShowConfirm(true);
    };

    const handleConfirmWithdrawal = async () => {
        setSubmitting(true);

        try {
            const response = await retiroService.solicitarRetiro({
                amount: parseFloat(amount),
            });

            if (!response.error) {

                // El retiro viene en response.data
                const newWithdrawal = response.data;
  
                // Actualizar historial correctamente
                setWithdrawals((prev) => [
                    {
                        id: newWithdrawal.id,
                        amount: newWithdrawal.amount,
                        status: newWithdrawal.status,
                        created_at: newWithdrawal.created_at,
                    },
                    ...prev,
                ]);

                setBalance((prev) => prev - parseFloat(amount));
                setAmount("");
                setShowConfirm(false);

                alert("Retiro solicitado con éxito");

            } else {
                alert(response.message || "Error al solicitar el retiro");
            }

        } catch (error) {
            console.error("Error al solicitar retiro:", error);
            alert("Error al procesar la solicitud");
        } finally {
            setSubmitting(false);
        }
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
            <Head title="Retiros" />

            <div className="space-y-10">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Retiros
                    </h1>
                    <p className="mt-2 text-slate-300">
                        Los retiros se procesan únicamente los viernes.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <WithdrawalForm
                        user={user}
                        amount={amount}
                        setAmount={setAmount}
                        onSubmit={handleSubmitWithdrawal}
                        isFriday={isFriday}
                        MIN_WITHDRAW={MIN_WITHDRAW}
                    />

                    <WithdrawalHistory
                        withdrawals={withdrawals}
                        loading={loading}
                    />
                </div>

                <WithdrawalConfirmModal
                    show={showConfirm}
                    amount={amount}
                    wallet={user.wallet}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={handleConfirmWithdrawal}
                    loading={submitting}
                />
            </div>
        </AuthenticatedLayout>
    );
}