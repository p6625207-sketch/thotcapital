import { ShieldCheck } from 'lucide-react';

export default function DescriptionBanner() {
    return (
        <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl mb-12">
            <div className="flex-1 space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                    Respaldo Seguro en <span className="text-amber-500">Cada Operación</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                    Utilizamos tecnología de punta e integración directa con el exchange más grande del mundo para garantizar transparencia en tu crecimiento financiero.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start text-amber-500 font-bold">
                    <ShieldCheck size={24} />
                    <span>Trading Auditado por Profesionales</span>
                </div>
            </div>
            
            <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png" 
                    alt="Binance Support" 
                    className="relative w-48 h-auto object-contain bg-slate-900 p-6 rounded-2xl border border-slate-700"
                />
            </div>
        </div>
    );
}