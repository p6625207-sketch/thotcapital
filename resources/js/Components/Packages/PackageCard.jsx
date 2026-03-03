import { CheckCircle } from 'lucide-react'

export default function PackageCard({ paquete, selected, onSelect }) {
    const isSelected = selected?.id === paquete.id
    const isCurrent = paquete.isCurrent

    console.log(paquete);

    const handleClick = () => {
        if (!isCurrent) {
            onSelect(paquete)
        }
    }

    return ( 
        <div
            onClick={handleClick}
            className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                isCurrent
                    ? 'border-amber-500/50 bg-slate-800 cursor-not-allowed'
                    : isSelected
                    ? 'border-amber-500 bg-slate-800'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
        >
           
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white">{paquete.nombre}</h3>
                <p className="mt-2 text-3xl font-bold text-amber-400">
                   ${Math.abs( paquete.valor)}
                </p>
            </div>

       
            <div className="space-y-3 text-slate-300">
                <Feature 
                    text={`Rendimiento ${paquete.rendimiento}% mensual`} 
                />
                <Feature 
                    text={`Comisión ${paquete.comision}% por referido`} 
                />
                  <Feature 
                    text="Ganacias del 300%" 
                />
                <Feature text="Retiros los viernes" />
                <Feature text="Soporte 24/7" />
            </div>

            <button
                className={`mt-6 w-full rounded-xl py-3 font-semibold transition-all ${
                    isCurrent
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
            >
                {isCurrent ? 'Actual' : 'Seleccionar'}
            </button>
        </div>
    )
}

function Feature({ text }) {
    return (
        <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-400" />
            <span>{text}</span>
        </div>
    )
}