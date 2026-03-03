import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LayoutAdmin from '@/Layouts/MainLayoutAdmin';
import BackButton from '@/Components/Welcome/BackButton';
import { Users, ChevronDown, ChevronUp, Edit2, Check, X } from 'lucide-react';

const NIVEL_COLORS = [
    { bg: 'bg-amber-500/20',   border: 'border-amber-500/50',   text: 'text-amber-400'   },
    { bg: 'bg-yellow-500/15',  border: 'border-yellow-500/40',  text: 'text-yellow-400'  },
    { bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    { bg: 'bg-cyan-500/15',    border: 'border-cyan-500/40',    text: 'text-cyan-400'    },
    { bg: 'bg-blue-500/15',    border: 'border-blue-500/40',    text: 'text-blue-400'    },
    { bg: 'bg-violet-500/15',  border: 'border-violet-500/40',  text: 'text-violet-400'  },
    { bg: 'bg-pink-500/15',    border: 'border-pink-500/40',    text: 'text-pink-400'    },
    { bg: 'bg-slate-700/40',   border: 'border-slate-600/50',   text: 'text-slate-300'   },
];

function getColor(index) {
    return NIVEL_COLORS[index] ?? NIVEL_COLORS[NIVEL_COLORS.length - 1];
}

export default function Piramide({ piramide = [] }) {
    const [expandedLevel, setExpandedLevel] = useState(null);
    const [editingLevel, setEditingLevel]   = useState(null);
    const [editValue, setEditValue]         = useState('');
    const [saving, setSaving]               = useState(false);

    const handleEdit = (nivel, porcentaje) => {
        setEditingLevel(nivel);
        setEditValue(String(porcentaje));
    };

    const handleSave = (nivel) => {
        const valor = parseFloat(editValue);
        if (isNaN(valor) || valor < 0 || valor > 100) return;

        setSaving(true);
        router.patch(
            `/admin/piramide/${nivel}`,
            { porcentaje: valor },
            {
                preserveScroll: true,
                onFinish: () => {
                    setSaving(false);
                    setEditingLevel(null);
                },
            }
        );
    };

    const handleCancel = () => {
        setEditingLevel(null);
        setEditValue('');
    };

    const toggleExpand = (nivel) =>
        setExpandedLevel(prev => (prev === nivel ? null : nivel));

    const totalUsuarios = piramide.reduce((s, n) => s + n.total_usuarios, 0);

    return (
        <LayoutAdmin title="Pirámide de Usuarios">
            <Head title="Pirámide de Usuarios" />

            <div className="mb-8">
                <BackButton />
            </div>

            <div className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                    PIRÁMIDE DE <span className="text-amber-500">REFERIDOS</span>
                </h1>
                <p className="text-slate-500 text-xs mt-2 tracking-[0.25em] uppercase">
                    Configura el porcentaje de comisión por nivel — {totalUsuarios} usuarios en total
                </p>
            </div>

  
            <div className="flex flex-col items-center gap-2 mb-14">
                {piramide.map((nivel, index) => {
                    const color     = getColor(index);
                    const isEditing = editingLevel === nivel.nivel;
                    // El nivel 1 es el más angosto (cima), el último es el más ancho
                    const widthPct  = 20 + (index / Math.max(piramide.length - 1, 1)) * 75;

                    return (
                        <motion.div
                            key={nivel.nivel}
                            initial={{ opacity: 0, scaleX: 0.8 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
                            style={{ width: `${widthPct}%` }}
                            className="relative"
                        >
                            <div className={`rounded-lg border px-5 py-3 flex items-center justify-between gap-4 ${color.bg} ${color.border}`}>
                          
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className={`text-xs font-bold uppercase tracking-widest shrink-0 ${color.text}`}>
                                        N{nivel.nivel}
                                    </span>
                                    <span className="flex items-center gap-1 text-slate-400 text-xs shrink-0">
                                        <Users size={11} />
                                        {nivel.total_usuarios.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="number"
                                                value={editValue}
                                                onChange={e => setEditValue(e.target.value)}
                                                className="w-20 bg-slate-900 border border-amber-500 text-amber-400 text-center rounded px-2 py-1 text-sm focus:outline-none"
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                autoFocus
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') handleSave(nivel.nivel);
                                                    if (e.key === 'Escape') handleCancel();
                                                }}
                                            />
                                            <span className="text-slate-400 text-sm">%</span>
                                            <button
                                                onClick={() => handleSave(nivel.nivel)}
                                                disabled={saving}
                                                className="text-emerald-400 hover:text-emerald-300 p-1 disabled:opacity-50 transition-colors"
                                            >
                                                <Check size={15} />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="text-red-400 hover:text-red-300 p-1 transition-colors"
                                            >
                                                <X size={15} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className={`font-black text-xl tabular-nums ${color.text}`}>
                                                {nivel.porcentaje}%
                                            </span>
                                            <button
                                                onClick={() => handleEdit(nivel.nivel, nivel.porcentaje)}
                                                className="text-slate-600 hover:text-amber-400 p-1 transition-colors"
                                                title="Editar porcentaje"
                                            >
                                                <Edit2 size={13} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

         
            <div className="space-y-3">
                {piramide.map((nivel, index) => {
                    const color     = getColor(index);
                    const isOpen    = expandedLevel === nivel.nivel;

                    return (
                        <div key={nivel.nivel} className="border border-slate-800 rounded-xl overflow-hidden">
                           
                            <button
                                onClick={() => toggleExpand(nivel.nivel)}
                                className="w-full flex items-center justify-between px-6 py-4 bg-slate-900/50 hover:bg-slate-800/40 transition-colors"
                            >
                                <div className="flex items-center gap-4 flex-wrap">
                                    <span className={`text-sm font-bold uppercase tracking-widest ${color.text}`}>
                                        Nivel {nivel.nivel}
                                    </span>
                                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
                                        {nivel.total_usuarios.toLocaleString()} usuarios
                                    </span>
                                    <span className={`text-sm font-bold ${color.text}`}>
                                        {nivel.porcentaje}% comisión
                                    </span>
                                </div>
                                {isOpen
                                    ? <ChevronUp size={16} className="text-slate-500 shrink-0" />
                                    : <ChevronDown size={16} className="text-slate-500 shrink-0" />
                                }
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        {nivel.usuarios.length === 0 ? (
                                            <p className="text-slate-600 text-sm text-center py-10">
                                                No hay usuarios en este nivel
                                            </p>
                                        ) : (
                                            <div className="divide-y divide-slate-800/50">
                                                {nivel.total_usuarios > 50 && (
                                                    <p className="text-slate-500 text-xs text-center py-2 bg-slate-900/30">
                                                        Mostrando los últimos 50 de {nivel.total_usuarios.toLocaleString()} usuarios
                                                    </p>
                                                )}
                                                {nivel.usuarios.map(user => (
                                                    <div
                                                        key={user.id}
                                                        className="flex items-center justify-between px-6 py-3 hover:bg-slate-900/30 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="text-slate-200 text-sm font-medium">
                                                                {user.name} {user.last_name}
                                                            </p>
                                                            <p className="text-slate-500 text-xs">{user.email}</p>
                                                        </div>
                                                        <span className="text-slate-700 text-xs font-mono">
                                                            #{user.id}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </LayoutAdmin>
    );
}
