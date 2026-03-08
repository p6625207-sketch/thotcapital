import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoticiaService from "@/Services/noticias.service";
import SliderButton from "./SliderButton";

export default function BlogSection() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [visiblePosts, setVisiblePosts] = useState(3);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await NoticiaService.getNoticias();
                // Si la data es un array, la guardamos
                if (Array.isArray(data)) {
                    setPosts(data);
                } else if (data && !data.error) {
                    setPosts(data);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticias();
    }, []);

    // RESPONSIVE: Detectar tamaño de pantalla para ajustar columnas
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisiblePosts(1); // Móvil: 1 tarjeta
            } else if (window.innerWidth < 1024) {
                setVisiblePosts(2); // Tablet: 2 tarjetas
            } else {
                setVisiblePosts(3); // Desktop: 3 tarjetas
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const total = posts.length;

    const next = () => {
        if (index + 1 <= total - visiblePosts) setIndex(index + 1);
    };

    const prev = () => {
        if (index - 1 >= 0) setIndex(index - 1);
    };

    if (loading) {
        return (
            <div className="py-24 flex flex-col justify-center items-center">
                <Loader2 className="animate-spin text-purple-500 mb-4" size={40} />
                <p className="text-slate-500 text-xs uppercase tracking-widest">Sincronizando noticias...</p>
            </div>
        );
    }

    return (
        <section className="py-12 relative overflow-hidden bg-[#020617]">
           
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-8">
                    <span className="text-purple-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Insights</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Últimas <span className="text-blue-500">noticias</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-10">
                        <BookOpen className="mx-auto text-slate-800 mb-4" size={40} />
                        <p className="text-slate-500">No hay contenido disponible.</p>
                    </div>
                ) : (
                    <div className="relative">

                        <div className=" sm:block">
                            <SliderButton direction="left" onClick={prev} disabled={index === 0} />
                            <SliderButton direction="right" onClick={next} disabled={index + visiblePosts >= total} />
                        </div>


                        <div className={`grid gap-6 md:gap-8 px-2 ${visiblePosts === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                            visiblePosts === 2 ? 'grid-cols-2' : 'grid-cols-3'
                            }`}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {posts.slice(index, index + visiblePosts).map((post) => (
                                    <motion.div
                                        key={post.id || post.title}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="group bg-slate-900/40 backdrop-blur-sm rounded-[25px] border border-slate-800 flex flex-col h-full overflow-hidden hover:border-purple-500/40 transition-colors duration-500"
                                    >

                                        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[22px]">

                                            <img
                                                src={post.image || post.image_url}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                                alt={post.title}
                                            />


                                            <div className="absolute top-4 left-4 backdrop-blur-md bg-white/10 border border-white/20 text-blue-400 text-[9px] font-black tracking-[0.15em] px-3 py-1.5 rounded-full uppercase shadow-xl">
                                                {post.category?.name || post.category || 'MERCADO'}
                                            </div>


                                            <div className="absolute bottom-4 right-4 flex items-center gap-2">
                                                <div className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-purple-900/40">
                                                    {post.date || post.date_text}
                                                </div>

                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 flex flex-col flex-grow">

                                            <h4 className="text-xl font-bold text-white mb-4 min-h-[3.5rem] leading-tight">
                                                {post.title}
                                            </h4>
                                            <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                                                {post.excerpt}
                                            </p>

                                            <button
                                                onClick={() => post.link && window.open(post.link, "_blank")}
                                                className="flex items-center gap-2 text-purple-500 font-bold text-sm group/btn w-fit"
                                            >
                                                Leer más
                                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>


                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: Math.max(0, total - visiblePosts + 1) }).map((_, i) => (
                                <button
                                    key={`dot-${i}`}
                                    onClick={() => setIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'
                                        }`}
                                />
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}