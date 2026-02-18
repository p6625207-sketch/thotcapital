import { Link } from '@inertiajs/react'

export default function Paquetes({data}) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
                Paquete Actual
            </h3>

            {data.activePackage ? (
                <>
                    <div className="space-y-3 text-slate-300">
                        <p>
                            Inversión:
                            <span className="text-white font-semibold ml-2">
                                ${Math.abs(data.activePackage.amount)}
                            </span>
                        </p>
                        <p>
                            Rendimiento mensual:
                            <span className="text-green-400 font-semibold ml-2">
                                {Math.abs(data.activePackage.monthlyRate)}%
                            </span>
                        </p>
                        <p>
                            Fecha inicio:
                            <span className="text-white font-semibold ml-2">
                                {data.activePackage.startDate}
                            </span>
                        </p>
                    </div>

                    <Link
                        href="/packages"
                        className="mt-6 block text-center bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-all"
                    >
                        Mejorar Paquete
                    </Link>
                </>
            ) : (
                <div className="text-center py-6">
                    <p className="text-slate-400 mb-4">
                        No tienes un paquete activo.
                    </p>

                    <Link
                        href="/packages"
                        className="bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-xl transition-all inline-block"
                    >
                        Comprar Paquete
                    </Link>
                </div>
            )}
        </div>
    );
}