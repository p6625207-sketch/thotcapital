// resources/js/Pages/Admin/Retiros.jsx
import { useState } from 'react';
import { Head } from '@inertiajs/react';
import LayoutAdmin from "@/Layouts/MainLayoutAdmin"; // Asegúrate de usar tu Layout de Admin
import AdminSectionHeader from '@/Components/Admin/Retiros/AdminSectionHeader';
import Pagination from '@/Components/Admin/Pagination';
import PaquetesTable from '@/Components/Admin/Paquetes/PaquetesTable';
import AddPaqueteBtn from '@/Components/Admin/Paquetes/AddPaqueteBtn';
import BackButton from '@/Components/Welcome/BackButton';

export default function UsuariosActivos({ auth, paquetes }) {
    const [search, setSearch] = useState("");

    // Extraemos la lista de paquetes
    const listaPaquetes = paquetes.data ?? [];

    // CAMBIO AQUÍ: Filtrar por la propiedad 'nombre' que viene del controlador
    const filteredData = listaPaquetes.filter(item =>
        item.nombre?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LayoutAdmin title="Paquetes">
            <Head title="Paquetes" />
            
            {/* BOTÓN PARA VOLVER */}
                <div className="mb-8">
                    <BackButton />
                </div>

            <div className="max-w-7xl mx-auto px-6 py-4">
                <AdminSectionHeader
                    title="Paquetes de Inversión"
                    description="Administra, edita y supervisa los planes de inversión disponibles en la plataforma."
                    searchTerm={search}
                    onSearchChange={setSearch}
                />
                <div className="my-3">
                    <AddPaqueteBtn />
                </div>

                <PaquetesTable paquetes={filteredData} />

                <Pagination links={paquetes.links} />
            </div>
        </LayoutAdmin>
    );
}