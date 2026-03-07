export default function NetworkStats() {
    return (
        <div className="w-full grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-2 md:py-8 ">

            <div className="text-center group">
                <p className="text-amber-500 font-black text-2xl group-hover:scale-110 transition-transform">
                    10%
                </p>
                <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mt-1">
                    Comision Referido
                </p>
            </div>
            <div className="text-center group">
                <p className="text-blue-500 font-black text-2xl group-hover:scale-110 transition-transform">
                    300%
                </p>
                <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mt-1">
                    Ganancia Maxima por Paquete
                </p>
            </div>

            <div className="text-center group ">
                <p className="text-emerald-500 font-black text-2xl group-hover:scale-110 transition-transform">
                    8.33%
                </p>
                <p className="text-slate-600 text-[10px] uppercase font-bold tracking-widest mt-1">
                    Rendimiento Mensual
                </p>
            </div>

            
        </div>
    );
}