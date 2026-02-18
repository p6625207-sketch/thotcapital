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
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Bienvenido
                </h2>
                <p className="text-slate-400 mt-2 text-sm">
                    Completa tus datos para empezar a invertir
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <User size={19} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            placeholder="Nombre"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
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
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <User size={19} />
                        </div>
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            placeholder="Apellido"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
                            autoComplete="last_name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.last_name} className="ml-2 text-xs text-red-400" />
                </div>

                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Phone size={19} />
                        </div>
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            placeholder="Teléfono (opcional)"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
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
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <UserPlus size={19} />
                        </div>
                        <TextInput
                            id="referred_by"
                            name="referred_by"
                            value={data.referred_by}
                            placeholder="Código de referido (opcional)"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
                            autoComplete="referred_by"
                            onChange={(e) => setData('referred_by', e.target.value)}
                            
                        />
                    </div>
                    <InputError message={errors.referred_by} className="ml-2 text-xs text-red-400" />
                </div>

                
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Mail size={19} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Correo electrónico"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="ml-2 text-xs text-red-400" />
                </div>


                

              
                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Lock size={19} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Contraseña"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-amber-500 transition-colors">
                            <Lock size={19} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            placeholder="Confirmar"
                            className="block w-full pl-11 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl py-3 transition-all"
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
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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

                
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            href={route('login')}
                            className="text-amber-500 font-bold hover:text-amber-400 transition-colors underline underline-offset-4"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}