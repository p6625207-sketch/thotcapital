const PlanesHeader = () => (
    <div className="text-center mb-5">
        <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">
            Nuestros Planes
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            Elige su <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">Inversión</span>
        </h2>
        
        {/* Línea decorativa neón personalizada */}
        <div className="w-24 h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
    </div>
);

export default PlanesHeader;