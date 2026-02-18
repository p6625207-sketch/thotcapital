// resources/js/Components/admin/Paquetes/AddPaqueteBtn.jsx
import { useState } from 'react';
import { Plus } from "lucide-react";
import CreatePaqueteModal from './CreatePaqueteModal';

export default function AddPaqueteBtn() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 uppercase tracking-tighter italic"
            >
                <Plus size={20} strokeWidth={3} />
                Agregar Nuevo Paquete
            </button>

            {/* Modal para crear el paquete */}
            <CreatePaqueteModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}