import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronDown, ChevronUp } from "lucide-react";
import UserCard from "./UserCard";

export default function NetworkLevelItem({
    level,
    index,
    color,
    widthPct,
    expandedLevel,
    setExpandedLevel
}) {

    const isOpen = expandedLevel === level.nivel;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            style={{ width: `${widthPct}%` }}
            className="group"
        >
            <div
                onClick={() => setExpandedLevel(isOpen ? null : level.nivel)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border px-2 py-4 flex items-center justify-between transition-all duration-300 hover:brightness-125 shadow-lg ${color.bg} ${color.border} ${isOpen ? 'ring-2 ring-white/30 brightness-110' : ''}`}
            >

                <div className="flex items-center gap-4 relative z-10">
                    <div className={`text-[12px] font-black uppercase tracking-widest ${color.text}`}>
                        NIVEL {level.nivel}
                    </div>

                    <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg text-slate-300 text-xs border border-white/5 font-bold">
                        <Users size={14} className={color.text} />
                        {level.nivel === 1
                            ? "TÚ"
                            : `${level.total} ${level.total === 1 ? "Usuario" : "Usuarios"}`
                        }
                    </div>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                    {level.nivel > 1 && (
                        <>
                            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em] hidden sm:block">
                                Ver
                            </span>

                            {isOpen
                                ? <ChevronUp size={20} className="text-white" />
                                : <ChevronDown size={20} className="text-slate-500" />
                            }
                        </>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {level.nivel > 1 && isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        className="overflow-hidden bg-slate-900/60 border-x border-b border-slate-800 rounded-b-2xl mx-2 pt-2 md:pt-4 px-2 md:px-4 pb-2 md:pb-4 shadow-inner"
                    >
                        <div className="grid grid-cols-1 gap-1">
                            {level.usuarios.map((u) => (
                                <UserCard key={u.id} user={u} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}