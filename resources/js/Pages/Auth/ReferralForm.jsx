import { useForm, Head } from '@inertiajs/react';
import { UserPlus, ArrowRight, AlertCircle } from 'lucide-react';

export default function ReferralForm({ email }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
       
        post(route('referral.store'), {
            onError: () => setData('code', ''), // Opcional: limpiar si falla
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-[#020617]">
            <Head title="Ingresar Referido" />
            
            <div className="bg-[#020617] p-8 rounded-[40px] shadow-2xl shadow-blue-900 w-full max-w-md border border-slate-100">
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-indigo-600 bg-indigo-60 rounded-2xl">
                        <UserPlus size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-300">¡Ya casi terminamos!</h1>
                    <p className="mt-2 text-sm text-slate-300">
                        Hola <span className="font-bold text-slate-500">{email}</span>, 
                        ingresa el código de quien te invitó para unirte.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block mb-2 ml-1 text-xs font-bold tracking-widest uppercase text-slate-400">
                            Código de Referido
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={e => setData('code', e.target.value.toUpperCase())}
                            placeholder="EJ: REF-1...."
                            className={`w-full px-5 py-4 rounded-2xl border ${errors.code ? 'border-red-300 bg-red-50' : 'border-slate-600'} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-mono font-bold text-lg text-center`}
                        />
                        {errors.code && (
                            <div className="flex items-center gap-2 mt-2 ml-1 text-xs font-bold text-red-500">
                                <AlertCircle size={14} /> {errors.code}
                            </div>
                        )}
                    </div>

                    <button
                        disabled={processing}
                        className="flex items-center justify-center w-full gap-2 py-4 font-bold text-white transition-all bg-yellow-600 rounded-2xl hover:bg-yellow-800 group disabled:opacity-50"
                    >
                        {processing ? 'Validando...' : 'Completar Registro'}
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </form>
            </div>
        </div>
    );
}