import { Link, usePage } from '@inertiajs/react';

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    return (
        <section className={`${className} space-y-6`}>
            <header>
                <h2 className="text-xl font-bold text-white">
                    Información de Perfil
                </h2>
                <p className="mt-1 text-slate-400 text-sm">
                    Visualiza la información de tu cuenta. No editable desde aquí.
                </p>
            </header>

            <div className="space-y-4 mt-6">
                <div className="rounded-xl bg-slate-800 p-4">
                    <label className="block text-sm text-slate-400 mb-1">Nombre</label>
                    <p className="text-white font-semibold">{user.name}</p>
                </div>

                <div className="rounded-xl bg-slate-800 p-4">
                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                    <p className="text-white font-semibold">{user.email}</p>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-xl bg-slate-800 p-4">
                        <p className="text-sm text-yellow-400">
                            Tu correo no está verificado.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-amber-400 hover:text-amber-500"
                            >
                                Reenviar correo de verificación
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-400">
                                Se ha enviado un nuevo enlace de verificación.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
