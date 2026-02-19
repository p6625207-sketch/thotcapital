import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import GoogleLoginButton from './GoogleLoginButton';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        referred_by: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear Cuenta" />

          
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Bienvenido
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                    Completa tus datos para empezar a invertir
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <User size={19} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            placeholder="Nombre"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="ml-2 text-xs text-red-400" />
                </div>

                
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <User size={19} />
                        </div>
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            placeholder="Apellido"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="last_name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.last_name} className="ml-2 text-xs text-red-400" />
                </div>

                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <Phone size={19} />
                        </div>
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            placeholder="Teléfono (opcional)"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="phone"
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9+]/g, '');
                                setData('phone', onlyNums);
                            }}
                        />
                    </div>
                    <InputError message={errors.phone} className="ml-2 text-xs text-red-400" />
                </div>


                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <UserPlus size={19} />
                        </div>
                        <TextInput
                            id="referred_by"
                            name="referred_by"
                            value={data.referred_by}
                            placeholder="Código de referido"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="referred_by"
                            onChange={(e) => setData('referred_by', e.target.value)}
                            
                        />
                    </div>
                    <InputError message={errors.referred_by} className="ml-2 text-xs text-red-400" />
                </div>

                
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <Mail size={19} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Correo electrónico"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="ml-2 text-xs text-red-400" />
                </div>


                

              
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <Lock size={19} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Contraseña"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 transition-colors pointer-events-none text-slate-500 group-focus-within:text-amber-500">
                            <Lock size={19} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            placeholder="Confirmar"
                            className="block w-full py-3 text-white transition-all pl-11 bg-slate-900/50 border-slate-700 placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>

                {(errors.password || errors.password_confirmation) && (
                    <InputError message={errors.password || errors.password_confirmation} className="ml-2 text-xs text-red-400" />
                )}

              
                <div className="pt-2">
                    <button
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-amber-500/20 disabled:opacity-50 group"
                    >
                        <UserPlus size={20} />
                        <span>REGISTRARSE</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

            
                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#1e293b] px-3 text-slate-500 font-semibold tracking-widest">O</span>
                    </div>
                </div>

            
                <GoogleLoginButton />

                
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            href={route('login')}
                            className="font-bold underline transition-colors text-amber-500 hover:text-amber-400 underline-offset-4"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}