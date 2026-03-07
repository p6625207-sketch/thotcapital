import { useMemo } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NetworkLevels from '@/Components/Network/NetworkLevels';
import NetworkStats from '@/Components/Network/NetworkStats';

const NIVEL_COLORS = [
    { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
    { bg: 'bg-yellow-500/15', border: 'border-yellow-500/40', text: 'text-yellow-400' },
    { bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', text: 'text-emerald-400' },
    { bg: 'bg-cyan-500/15', border: 'border-cyan-500/40', text: 'text-cyan-400' },
    { bg: 'bg-blue-500/15', border: 'border-blue-500/40', text: 'text-blue-400' },
    { bg: 'bg-violet-500/15', border: 'border-violet-500/40', text: 'text-violet-400' },
    { bg: 'bg-pink-500/15', border: 'border-pink-500/40', text: 'text-pink-400' },
    { bg: 'bg-slate-700/40', border: 'border-slate-600/50', text: 'text-slate-300' },
];

export default function Network({ tree }) {

    const levelsData = useMemo(() => {
        const levels = [];
        const traverse = (node, depth) => {
            if (!node) return;
            if (!levels[depth]) levels[depth] = { nivel: depth + 1, usuarios: [], total: 0 };
            levels[depth].usuarios.push(node.user);
            levels[depth].total++;
            traverse(node.left, depth + 1);
            traverse(node.right, depth + 1);
        };
        traverse(tree, 0);
        return levels;
    }, [tree]);

    const totalInNetwork = levelsData.reduce((acc, curr) => acc + curr.total, 0);

    const total = totalInNetwork - 1;

    return (
        <AuthenticatedLayout>
            <Head title="Mi Red Binaria" />

            <div className="flex flex-col items-center justify-start min-h-screen w-full mx-auto pb-32 md:pb-10 overflow-y-auto px-full md:px-6">
                <div className="text-center mb-4 md:mb-6 w-full">

                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                        ESTRUCTURA <span className="text-amber-500">BINARIA</span>
                    </h1>
                    <p className="text-slate-500 text-xs tracking-[0.3em] uppercase mb-3">
                        VISUALIZACIÓN DE CRECIMIENTO Y DERRAME
                    </p>
                    <p className="text-green-400 text-xs tracking-[0.3em] uppercase mb-8">
                        {total} MIEMBROS TOTALES
                    </p>

                    <div className="inline-flex items-center gap-4 bg-slate-900/80 border border-slate-800 p-2 pr-6 rounded-full shadow-xl">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                            {tree?.user.name[0]}
                        </div>
                        <div className="text-left">
                            <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest">Patrocinador Principal</p>
                            <p className="text-white font-bold text-sm leading-tight">{tree?.user.name} {tree?.user.last_name}</p>
                        </div>
                    </div>
                </div>

                <NetworkLevels
                    levelsData={levelsData}
                    colors={NIVEL_COLORS}
                />

                <NetworkStats />


            </div>

        </AuthenticatedLayout>
    );
}