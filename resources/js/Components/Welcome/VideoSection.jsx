import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoSection({ youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }) {
    return (
        <section className="mb-20">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-amber-500/40 rounded-full animate-pulse" />
                        <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-pulse delay-300" />
                        <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-amber-500/30 rounded-full animate-pulse delay-500" />
                        <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-blue-500/30 rounded-full animate-pulse delay-700" />
                        <div className="absolute top-[75%] right-[10%] w-1.5 h-1.5 bg-purple-500/30 rounded-full animate-pulse delay-1000" />
                        <div className="absolute top-[30%] left-[40%] w-1 h-1 bg-green-500/30 rounded-full animate-pulse delay-200" />
                        <div className="absolute bottom-[15%] left-[60%] w-2 h-2 bg-amber-500/20 rounded-full animate-pulse delay-400" />
                        <div className="absolute top-[50%] left-[70%] w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse delay-600" />
                    </div>

                    <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[80px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px]" />
                </div>

                <img
                    src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop"
                    alt="Plataforma de trading"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
                            Descubre cómo funciona
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
                            Mira nuestra presentación
                        </h2>
                    </motion.div>

                    <motion.a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-30 animate-pulse" />
                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/30">
                            <Play
                                size={36}
                                className="text-white ml-1"
                                fill="white"
                            />
                        </div>
                    </motion.a>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-slate-500 text-sm"
                    >
                        Haz clic para ver el video en YouTube
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
