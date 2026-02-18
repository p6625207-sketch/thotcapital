// resources/js/Components/Admin/Pagination.jsx
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Si no hay links o solo hay una página, no mostrar nada
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-4">
            {links.map((link, key) => (
                <Link
                    key={key}
                    href={link.url || "#"}
                    // preserveScroll mantiene la posición del scroll al cambiar de página
                    preserveScroll
                    className={`
                        px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200
                        ${link.active 
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                        }
                        ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                    `}
                >
                    {/* Renderiza los números y las flechas correctamente */}
                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                </Link>
            ))}
        </div>
    );
}