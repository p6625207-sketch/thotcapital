export default function ProgresoContrato({ activePackage }) {

    if (!activePackage) return null;

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">

            <div className="flex justify-between items-end mb-4">

                <div>
                    <h3 className="text-white font-bold text-lg">
                        Progreso del Contrato (300%)
                    </h3>

                    <p className="text-white/50 text-sm">
                        Has ganado $
                        {activePackage.ganadoAcumulado.toFixed(2)}
                        {" "}de un máximo de $
                        {activePackage.limite.toFixed(2)}
                    </p>
                </div>

                <span className="text-amber-500 font-bold text-xl">
                    {activePackage.progreso}%
                </span>

            </div>

            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-white/5">
                <div
                    className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${activePackage.progreso}%` }}
                />
            </div>

            <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-wider">

                <span className="text-white/40">
                    Inicio: {activePackage.startDate}
                </span>

                <span className="text-amber-500/80">
                    Quedan $
                    {activePackage.disponible.toFixed(2)}
                    {" "}por cobrar
                </span>

            </div>

        </div>
    );
}