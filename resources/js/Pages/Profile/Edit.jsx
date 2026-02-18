import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateWalletForm from './Partials/UpdateWalletForm';

export default function EditProfileView({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil" />

            <div className="space-y-10 md:mt-14">
                <div className="grid md:grid-cols-3 md:items-center max-w-full gap-5 sm:px-6 lg:px-8">

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
                        <UpdateWalletForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
