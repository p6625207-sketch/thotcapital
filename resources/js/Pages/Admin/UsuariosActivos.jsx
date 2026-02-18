// resources/js/Pages/Admin/Retiros.jsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import LayoutAdmin from "@/Layouts/MainLayoutAdmin"; // Asegúrate de usar tu Layout de Admin
import AdminSectionHeader from '@/Components/Admin/Retiros/AdminSectionHeader';
import Pagination from '@/Components/Admin/Pagination';
import UsersTable from '@/Components/Admin/Usuarios/UsersTable';
import BackButton from '@/Components/Welcome/BackButton';

export default function UsuariosActivos({ auth, users }) {
    const [search, setSearch] = useState("");

    const listaUsuarios = users.data ?? [];

    const filteredData = listaUsuarios.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LayoutAdmin title="Inversores">
            <Head title="Usuarios" />
            {/* BOTÓN PARA VOLVER */}
            <div className="mb-8">
                <BackButton />
            </div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <AdminSectionHeader
                    title="Inversores"
                    description="Gestiona y supervisa todos los usuarios que han realizado inversiones en la plataforma."
                    searchTerm={search}
                    onSearchChange={setSearch}
                />

                <UsersTable users={filteredData} />
                <Pagination links={users.links} />
            </div>
        </LayoutAdmin>
    );
}