// resources/js/Components/Admin/BackButton.jsx
import { Link } from '@inertiajs/react';
import { ArrowLeft } from "lucide-react";

export default function BackButton({ href = "/admin/dashboard", text = "Volver al Dashboard" }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all duration-300 font-bold text-xs uppercase tracking-widest italic"
        >
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-amber-500/50 group-hover:bg-amber-500/5 transition-all">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            {text}
        </Link>
    );
}