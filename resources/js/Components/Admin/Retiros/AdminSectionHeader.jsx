// resources/js/Components/admin/AdminSectionHeader.jsx
import { Search } from "lucide-react";

export default function AdminSectionHeader({ title, description, searchTerm, onSearchChange }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5">
            <div className="space-y-1">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                    {title}
                </h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                    {description}
                </p>
            </div>

            <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscador por nombre..."
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none"
                />
            </div>
        </div>
    );
}