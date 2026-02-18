import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateWalletForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const [editing, setEditing] = useState(false);

    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        wallet_address: user.wallet_address || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.wallet.update'), {
            onSuccess: () => setEditing(false),
        });
    };

    return (
        <section className={`${className} space-y-6`}>
            <header>
                <h2 className="text-xl font-bold text-white">
                    Wallet de Retiro
                </h2>
                <p className="mt-1 text-slate-400 text-sm">
                    Configura tu dirección de wallet para recibir retiros.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-4 mt-6">
                <div className="rounded-xl bg-slate-800 p-4">
                    <label className="block text-sm text-slate-400 mb-1">
                        Dirección de Wallet
                    </label>
                    {editing ? (
                        <input
                            type="text"
                            value={data.wallet_address}
                            onChange={(e) => setData('wallet_address', e.target.value)}
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500 focus:outline-none"
                            placeholder="0x..."
                        />
                    ) : (
                        <p className="text-white font-semibold break-all">
                            {user.wallet_address || 'No configurada'}
                        </p>
                    )}
                    {errors.wallet_address && (
                        <p className="mt-1 text-sm text-red-400">{errors.wallet_address}</p>
                    )}
                </div>

                {editing ? (
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-xl bg-amber-500 py-3 text-white font-semibold hover:bg-amber-600 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setData('wallet_address', user.wallet_address || '');
                            }}
                            className="flex-1 rounded-xl border border-slate-600 py-3 text-slate-300 font-semibold hover:bg-slate-800"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="w-full rounded-xl bg-amber-500 py-3 text-white font-semibold hover:bg-amber-600"
                    >
                        Actualizar Wallet
                    </button>
                )}

                {recentlySuccessful && (
                    <p className="text-sm text-green-400 text-center">
                        Wallet actualizada correctamente.
                    </p>
                )}
            </form>
        </section>
    );
}
