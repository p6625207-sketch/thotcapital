// resources/js/Pages/Admin/Retiros.jsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import LayoutAdmin from "@/Layouts/MainLayoutAdmin"; // Asegúrate de usar tu Layout de Admin
import AdminSectionHeader from '@/Components/Admin/Retiros/AdminSectionHeader';
import WithdrawalsTable from '@/Components/Admin/Retiros/WithdrawalsTable';
import Pagination from '@/Components/Admin/Pagination';
import BackButton from '@/Components/Welcome/BackButton';

export default function Retiros({ auth, retiros }) {
    const [search, setSearch] = useState("");

    // Filtrar retiros localmente por nombre
    const listaRetiros = retiros.data ?? [];

    const filteredData = listaRetiros.filter(item => 
        item.user.name.toLowerCase().includes(search.toLowerCase()) ||
        item.user.last_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LayoutAdmin title="Gestión de Retiros">
            <Head title="Solicitudes de Retiros" />
     
                            <div className="mb-8">
                                <BackButton />
                            </div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <AdminSectionHeader 
                    title="Solicitud de Retiros"
                    description="Gestión y procesamiento de pagos blockchain"
                    searchTerm={search}
                    onSearchChange={setSearch}
                />

                <WithdrawalsTable withdrawals={filteredData} />
                <Pagination links={retiros.links} />
            </div>
        </LayoutAdmin>
    );
}