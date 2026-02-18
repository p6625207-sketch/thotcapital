import { Link } from "@inertiajs/react";
import { Clock } from "lucide-react";

export default function WithdrawalForm({
    user,
    amount,
    setAmount,
    onSubmit,
    isFriday,
    MIN_WITHDRAW = 100,
}) {
    const numericAmount = parseFloat(amount || 0);
    const hasWallet = !!user.wallet;
    const isBalanceZero = user.balance <= 0;
    const isAmountTooLow = numericAmount > 0 && numericAmount < MIN_WITHDRAW;
    const isAmountTooHigh = numericAmount > user.balance;

    const isInvalid =
        !amount ||
        isAmountTooLow ||
        isAmountTooHigh ||
        !isFriday ||
        isBalanceZero ||
        !hasWallet;

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8 space-y-6">
      
            <div className="flex justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                <span className="text-slate-300 font-medium">
                    Balance Disponible
                </span>
                <span className="text-3xl font-bold text-amber-400">
                    ${user.balance.toFixed(2)}
                </span>
            </div>

         
            {isBalanceZero && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
                    No tienes balance disponible para retirar.
                    <div className="mt-2">
                        <Link
                            href="/packages"
                            className="text-amber-400 underline hover:text-amber-300"
                        >
                            Ir a invertir
                        </Link>
                    </div>
                </div>
            )}

       
            {!isFriday && (
                <div className="flex items-center gap-2 text-amber-400 p-3 rounded-xl border border-amber-500/30 text-sm">
                    <Clock size={16} />
                    Disponible solo los viernes
                </div>
            )}


            <div>
                <label className="text-amber-400 text-sm font-medium">
                    Monto a retirar
                </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={!isFriday || isBalanceZero}
                    placeholder="0.00"
                    className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />

                {amount && isAmountTooLow && (
                    <p className="text-red-400 text-sm mt-2">
                        El retiro mínimo es de ${MIN_WITHDRAW}
                    </p>
                )}

                {amount && isAmountTooHigh && (
                    <p className="text-red-400 text-sm mt-2">
                        No puedes retirar más de tu balance disponible
                    </p>
                )}
            </div>

 
            <div>
                <label className="text-amber-400 text-sm font-medium">
                    Wallet registrada
                </label>
                <input
                    type="text"
                    value={user.wallet || "No registrada"}
                    disabled
                    className="mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-300"
                />

                {!hasWallet && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mt-3">
                        No tienes una wallet vinculada.
                        <div className="mt-2">
                            <Link
                                href="/profile"
                                className="text-amber-400 underline hover:text-amber-300"
                            >
                                Registrar Wallet
                            </Link>
                        </div>
                    </div>
                )}
            </div>

       
            <button
                onClick={onSubmit}
                disabled={isInvalid}
                className={`w-full rounded-xl py-3 font-semibold transition-all ${
                    isInvalid
                        ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20"
                }`}
            >
                {isBalanceZero
                    ? "Sin balance"
                    : !hasWallet
                    ? "Wallet requerida"
                    : !isFriday
                    ? "Disponible solo viernes"
                    : "Solicitar Retiro"}
            </button>
        </div>
    );
}