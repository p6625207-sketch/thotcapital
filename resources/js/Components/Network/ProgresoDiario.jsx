export default function ProgresoDiario({ activePackage }) {

    if (!activePackage) return null;

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 mt-6">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h3 className="text-white font-bold text-lg">Capping Diario (200%)</h3>
                    <p className="text-white/50 text-sm">
                        Ganado hoy: ${activePackage.gananciaHoy.toFixed(2)} de un máximo de ${activePackage.limiteDiario.toFixed(2)}
                    </p>
                </div>
                <span className="text-green-400 font-bold text-xl">{activePackage.progresoDiario}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-white/5">
                <div
                    className="bg-gradient-to-r from-green-600 to-green-400 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${activePackage.progresoDiario}%` }}
                />
            </div>
            <div className="mt-4 flex justify-between text-xs font-medium uppercase tracking-wider">
                <span className="text-white/40">El límite diario se reinicia a las 00:00 del día siguiente</span>
                <span className="text-green-400 ">Quedan ${activePackage.disponibleDiario.toFixed(2)} por cobrar</span>
            </div>

        </div>
    );
}