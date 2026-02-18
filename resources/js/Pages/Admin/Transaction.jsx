// resources/js/Pages/Admin/Retiros.jsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import LayoutAdmin from "@/Layouts/MainLayoutAdmin"; // Asegúrate de usar tu Layout de Admin
import AdminSectionHeader from '@/Components/Admin/Retiros/AdminSectionHeader';
import Pagination from '@/Components/Admin/Pagination';
import TransactionsTable from '@/Components/Admin/Transaction/TransactionsTable';
import BackButton from '@/Components/Welcome/BackButton';

export default function Transaction({  transactions }) {
    const [search, setSearch] = useState("");

    // Extraemos el array de datos del objeto paginado de Laravel
    const listaTransactions = transactions.data ?? [];

    // Lógica de filtrado por nombre, apellido o incluso por nombre de paquete
    const filteredData = listaTransactions.filter(item =>
        item.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.paquete_nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LayoutAdmin title="Historial de Transacciones">
            <Head title="Historial" />
            
                            <div className="mb-8">
                                <BackButton />
                            </div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <AdminSectionHeader
                    title="Historial de Transacciones"
                    description="Revisión y gestión de transacciones realizadas por los usuarios en la red blockchain."
                    searchTerm={search}
                    onSearchChange={setSearch}
                />

                <TransactionsTable transactions={filteredData} />

                <Pagination links={transactions.links} />
            </div>
        </LayoutAdmin>
    );
}