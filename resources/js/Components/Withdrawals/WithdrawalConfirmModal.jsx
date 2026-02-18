export default function WithdrawalConfirmModal({
    show,
    amount,
    wallet,
    onCancel,
    onConfirm,
    loading = false,
}) {
    if (!show) return null;

    const numericAmount = parseFloat(amount || 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">
                    Confirmar Retiro
                </h3>

                <div className="space-y-4 text-slate-300 mb-6">
                    <div className="flex justify-between">
                        <span>Monto</span>
                        <span className="font-bold text-white">
                            ${numericAmount.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Wallet</span>
                        <span className="text-amber-400 text-sm break-all">
                            {wallet}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="w-full rounded-xl bg-slate-800 py-3 text-white hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-full rounded-xl bg-amber-500 py-3 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Procesando..." : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    );
}