import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        title: "¿Es momento de vender bitcoin o comprar ante la caída hacia USD 80.000?",
        excerpt: "El precio de bitcoin (BTC) retrocedió aproximándose hacia la zona de los 80.000...",
        date: "21 Nov",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771237622/2008d9e7017f8c534ec18f3ee7b61d82_gjqd7x.jpg",
        category: "MERCADO"
    },
    {
        title: "Una \"Microstrategy de Ethereum\" tuvo que vender ETH por la caída de acciones",
        excerpt: "FG Nexus vendió 10.922 ETH para recomendar acciones. El precio de las acciones l...",
        date: "21 Nov",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771237622/4d1a4825268074aa0c8ed06658215760_lhw8vw.jpg",
        category: "NOTICIAS"
    },
    {
        title: "2020 Top 50 MLM Companies in the U.S.",
        excerpt: "*Note: 2019 revenue numbers coming soon. Below is the comprehensive list of multi...",
        date: "21 Nov",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771237622/40580549b4b0e7bdf7a55be9dfa11c43_iqoprk.jpg",
        category: "INDUSTRIA"
    }
];

export default function BlogSection() {
    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Encabezado */}
                <div className="text-center mb-10">
                    <span className="text-purple-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">
                        Blogs
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                        Últimas <span className="text-blue-500">noticias</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
                </div>

                {/* Grid de Noticias */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div 
                            key={index} 
                            className="group bg-[#111827] rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/30 transition-all duration-500 flex flex-col"
                        >
                            {/* Contenedor de Imagen */}
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay Gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />
                                
                                {/* Badge de Fecha Estilo Imagen */}
                                <div className="absolute bottom-4 right-4 bg-purple-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
                                    {post.date}
                                </div>

                                {/* Badge de Categoría */}
                                <div className="absolute top-4 left-4 bg-black/40 text-blue-400 text-[9px] font-black tracking-widest px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                                    {post.category}
                                </div>
                            </div>

                            {/* Contenido */}
                            <div className="p-8 flex flex-col flex-grow">
                                <h4 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                                    {post.title}
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {post.excerpt}
                                </p>
                                
                                {/* Botón Leer Más */}
                                <button className="flex items-center text-purple-500 font-bold text-sm group/btn w-fit">
                                    <span className="mr-2 border-b-2 border-transparent group-hover/btn:border-purple-500 transition-all">
                                        Leer más
                                    </span>
                                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}