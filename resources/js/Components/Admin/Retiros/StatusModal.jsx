import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react";

export default function StatusModal({ isOpen, onClose, onConfirm, transaction, statusStep }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Fondo oscurecido */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={statusStep === 'idle' ? onClose : null} // Evita cerrar mientras ejecuta
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                {/* Ventana Modal */}
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                >
                    {/* Botón cerrar (solo visible en estado reposo) */}
                    {statusStep === 'idle' && (
                        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    )}

                    <div className="text-center">
                        
                        {/* --- ESTADO 1: SELECCIÓN (IDLE) --- */}
                        {statusStep === 'idle' && (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                                    <AlertCircle className="text-amber-500" size={32} />
                                </div>

                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
                                    Gestionar Retiro
                                </h3>
                                <p className="text-slate-400 text-sm mb-8">
                                    ¿Deseas aprobar o rechazar la solicitud de <span className="text-white font-bold">{transaction?.user?.name}</span> por <span className="text-amber-500 font-bold">${transaction?.amount}</span>?
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => onConfirm('rechazado')}
                                        className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/50 text-red-500 font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest"
                                    >
                                        <XCircle size={16} /> Rechazar
                                    </button>
                                    
                                    <button
                                        onClick={() => onConfirm('aprobado')}
                                        className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 uppercase text-[10px] tracking-widest"
                                    >
                                        <CheckCircle size={16} /> Aprobar
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* --- ESTADO 2: EJECUTANDO (EXECUTING) --- */}
                        {statusStep === 'executing' && (
                            <motion.div key="executing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10">
                                <Loader2 className="mx-auto text-amber-500 animate-spin mb-4" size={48} />
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                                    Ejecutando...
                                </h3>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                                    Sincronizando con la base de datos
                                </p>
                            </motion.div>
                        )}

                        {/* --- ESTADO 3: ÉXITO (SUCCESS) --- */}
                        {statusStep === 'success' && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-10">
                                <div className="mx-auto w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                                    <CheckCircle className="text-emerald-500" size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                                    ¡Éxito!
                                </h3>
                                <p className="text-slate-400 text-sm mt-2">
                                    El estado se actualizó correctamente.
                                </p>
                                
                                {/* Barra de progreso de cierre automático */}
                                <div className="w-full bg-slate-800 h-1.5 mt-8 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: "100%" }} 
                                        transition={{ duration: 2 }} 
                                        className="bg-emerald-500 h-full" 
                                    />
                                </div>
                            </motion.div>
                        )}

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}