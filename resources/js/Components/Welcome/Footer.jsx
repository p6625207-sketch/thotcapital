import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-slate-400 border-t border-slate-900">
      <div className="container mx-auto px-6 py-10">
        
        {/* Grilla Principal Simplificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Branding e Identidad */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl font-black tracking-tighter text-white uppercase">
              EMPRENDIMIENTO <span className="text-amber-500">PRO</span>
            </h3>
            <p className="text-xs leading-relaxed max-w-sm mx-auto md:mx-0">
              Plataforma avanzada de gestión de capital y trading estratégico. 
              Seguridad y transparencia en cada operación.
            </p>
          </div>

          {/* Advertencia Legal Minimalista */}
          <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800/50">
            <div className="flex items-center gap-2 text-green-500 mb-2 justify-center md:justify-start">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Sistema Protegido</span>
            </div>
            <p className="text-[10px] uppercase leading-4 tracking-tight text-center md:text-left">
              El trading implica riesgo. Solo invierta capital que esté dispuesto a perder. 
              <span className="text-amber-500 font-bold ml-1 italic">Opere con prudencia.</span>
            </p>
          </div>
        </div>

        {/* Barra Inferior de Créditos */}
        <div className="border-t border-slate-900 mt-10 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase">
            <Globe size={14} className="text-slate-600" />
            <span>{currentYear} © EMPRENDIMIENTO PRO • BOLIVIA</span>
          </div>
          
          
        </div>
      </div>
    </footer>
  );
}