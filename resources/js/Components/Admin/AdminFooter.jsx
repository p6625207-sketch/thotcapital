import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-slate-400 border-t border-slate-900">
      <div className="container mx-auto px-6 py-10">
       

        {/* Barra Inferior de Créditos */}
          <div className="flex items-center justify-center text-center gap-2 text-[14px] font-bold tracking-widest uppercase">
            <Globe size={14} className="text-slate-600" />
            <span>{currentYear} © EMPRENDIMIENTO PRO • BOLIVIA</span>
          </div>
          
          
     
      </div>
    </footer>
  );
}