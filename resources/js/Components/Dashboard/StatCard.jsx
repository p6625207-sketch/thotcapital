import {
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, trend }) {
    return (
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-800 text-amber-400">
                    <Icon size={22} />
                </div>

                {trend && (
                    <span
                        className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                    >
                        {trend > 0 ? (
                            <ArrowUpRight size={16} />
                        ) : (
                            <ArrowDownRight size={16} />
                        )}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    )
}