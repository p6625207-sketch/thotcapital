import { motion } from 'framer-motion';
import { TrendingUp, Users, BarChart3 } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="mb-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex-1 relative group"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                    <div className="relative overflow-hidden rounded-3xl border border-slate-700/50">
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=500&fit=crop"
                            alt="Equipo profesional"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex gap-3">
                                <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-xl px-4 py-2 text-amber-400 text-sm font-bold">
                                    +5 Años
                                </div>
                                <div className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-2 text-cyan-400 text-sm font-bold">
                                    Expertos en Trading
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex-1 space-y-6"
                >
                    <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
                        Sobre Nosotros
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                        Impulsamos tu crecimiento{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            financiero
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Somos un equipo de profesionales dedicados a brindarte las mejores herramientas
                        y estrategias para que tu inversión crezca de manera segura y constante.
                    </p>
                    <p className="text-slate-500 leading-relaxed">
                        Nuestra plataforma combina tecnología de punta con la experiencia de traders
                        profesionales para ofrecerte rendimientos consistentes y transparentes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 text-center">
                            <TrendingUp size={24} className="text-amber-500 mx-auto mb-2" />
                            <p className="text-2xl font-black text-white">95%</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Efectividad</p>
                        </div>
                        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 text-center">
                            <Users size={24} className="text-cyan-500 mx-auto mb-2" />
                            <p className="text-2xl font-black text-white">10K+</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Usuarios</p>
                        </div>
                        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 text-center">
                            <BarChart3 size={24} className="text-green-500 mx-auto mb-2" />
                            <p className="text-2xl font-black text-white">24/7</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Operaciones</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
