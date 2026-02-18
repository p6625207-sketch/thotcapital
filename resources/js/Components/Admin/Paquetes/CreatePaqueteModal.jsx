// resources/js/Components/admin/Paquetes/CreatePaqueteModal.jsx
import { useState } from 'react';
import { X, Save, Package, DollarSign, TrendingUp, Percent, Loader2 } from "lucide-react";
import { router } from '@inertiajs/react';
import PaqueteService from '@/Services/paquetes.admin.service';

export default function CreatePaqueteModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        valor: '',
        rendimiento: '',
        comision: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            // Asumimos que agregaste el método 'create' a tu PaqueteService
            await PaqueteService.create(formData);
            router.reload({ only: ['paquetes'] });
            setFormData({ nombre: '', valor: '', rendimiento: '', comision: '' }); // Limpiar
            onClose();
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Crear Paquete</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={24} /></button>
                </div>

                <form onSubmit={submit} className="p-8 space-y-5">
                    {/* Reutilizamos la estructura de inputs de tu EditModal */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2">
                            <Package size={12} /> Nombre
                        </label>
                        <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} placeholder="Ej. PLATINUM" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all" />
                        {errors.nombre && <span className="text-red-500 text-[10px] font-bold">{errors.nombre[0]}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2">
                            <DollarSign size={12} /> Valor
                        </label>
                        <input name="valor" type="number" value={formData.valor} onChange={handleChange} placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none" />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2"><TrendingUp size={12} /> Rendimiento %</label>
                            <input name="rendimiento" type="number" step="0.01" value={formData.rendimiento} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-2"><Percent size={12} /> Comisión %</label>
                            <input name="comision" type="number" step="0.01" value={formData.comision} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none" />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 px-6 py-3 bg-amber-500 text-slate-950 font-black rounded-xl flex items-center justify-center gap-2">
                            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}