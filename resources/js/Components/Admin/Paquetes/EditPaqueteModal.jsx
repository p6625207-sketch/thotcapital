// resources/js/Components/admin/Paquetes/EditPaqueteModal.jsx
import { useEffect, useState } from 'react';
import { X, Save, Package, DollarSign, TrendingUp, Percent, Loader2 } from "lucide-react";
import PaqueteService from '@/Services/paquetes.admin.service';
import { router } from '@inertiajs/react';

export default function EditPaqueteModal({ isOpen, onClose, paquete }) {
    if (!isOpen || !paquete) return null;

    // Estado local del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        valor: '',
        rendimiento: '',
        comision: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Sincroniza los datos cuando el paquete seleccionado cambia
    useEffect(() => {
        setFormData({
            nombre: paquete.nombre || '',
            valor: paquete.valor || '',
            rendimiento: paquete.rendimiento || '',
            comision: paquete.comision || '',
        });
        setErrors({});
    }, [paquete]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await PaqueteService.update(paquete.id, formData);
            
            // Refrescar los datos de la página actual sin recargar el navegador
            router.reload({ only: ['paquetes'] }); 
            
            onClose();
        } catch (error) {
            // Capturar errores de validación de Laravel (422)
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                
                {/* Cabecera */}
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                        Hacer Cambios
                    </h3>
                    <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={submit} className="p-8 space-y-5">
                    {/* Nombre */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <Package size={12} /> Nombre
                        </label>
                        <input 
                            name="nombre"
                            type="text"
                            value={formData.nombre}
                            onChange={handleChange}
                            className={`w-full bg-slate-950 border ${errors.nombre ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:border-amber-500 transition-colors outline-none`}
                        />
                        {errors.nombre && <span className="text-red-500 text-[10px] font-bold uppercase">{errors.nombre[0]}</span>}
                    </div>

                    {/* Valor */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <DollarSign size={12} /> Valor
                        </label>
                        <input 
                            name="valor"
                            type="number"
                            value={formData.valor}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 transition-colors outline-none"
                        />
                    </div>

                    {/* Rendimiento */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <TrendingUp size={12} /> Rendimiento (%)
                        </label>
                        <input 
                            name="rendimiento"
                            type="number"
                            step="0.01"
                            value={formData.rendimiento}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 transition-colors outline-none"
                        />
                    </div>

                    {/* Comisión */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                            <Percent size={12} /> Comisión (%)
                        </label>
                        <input 
                            name="comision"
                            type="number"
                            step="0.01"
                            value={formData.comision}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 transition-colors outline-none"
                        />
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}