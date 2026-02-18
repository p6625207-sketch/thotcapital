// resources/js/Components/admin/StatCard.jsx
export default function StatCard({ label, value, icon: Icon, color }) {
    return (
        <div className="bg-slate-900 border items-center border-slate-800 p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-center mb-4">
                <div className={`p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800 ${color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
            <p className="text-slate-500 text-[10px] sm:text-xs text-center font-bold uppercase tracking-[0.15em]">{label}</p>
            <p className="text-2xl sm:text-3xl text-center font-black text-white mt-1 break-words">{value}</p>
        </div>
    );
}