import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from './GoogleLoginButton';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar Sesión" />

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Bienvenido</h2>
                <p className="text-slate-400 mt-2 text-sm">Ingresa a tu cuenta de inversión</p>
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-500">{status}</div>}

            <form onSubmit={submit} className="space-y-6">
                {/* Email */}
                <div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Mail size={19} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="Tu correo"
                            value={data.email}
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Lock size={19} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Tu contraseña"
                            value={data.password}
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-slate-400">Recordarme</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-amber-500 hover:text-amber-400 underline underline-offset-4 font-medium"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <button
                    disabled={processing}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                    <LogIn size={20} />
                    INGRESAR
                </button>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
                    <div className="relative flex justify-center text-xs uppercase text-slate-500 px-2 bg-[#1e293b]">O</div>
                </div>

                <GoogleLoginButton />

                <div className="text-center pt-4">
                    <p className="text-slate-400 text-sm">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            href={route('register')}
                            className="text-amber-500 font-bold hover:text-amber-400 underline underline-offset-4"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}