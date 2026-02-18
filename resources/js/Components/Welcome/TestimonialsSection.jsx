import React from 'react';
import { Star } from 'lucide-react'; // Opcional: puedes usar iconos de heroicons o lucide

const testimonials = [
    {
        name: "Claudia Moreno",
        location: "Bolivia",
        text: "Me gusta porque mi dinero esta vez si esta trabajando para mi, yo tenia un negocio propio de venta de helados pero aquí estoy ganando mucho mas, gracias a mi patrocinadora.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236855/Captura_de_pantalla_2026-02-16_061116_yhsrba.png",
        stars: 4
    },
    {
        name: "Flavio Gomez",
        location: "España",
        text: "Me esta cambiando la vida y eso me gusta ya que antes mis sueños los veía muy lejos de cumplirlos.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236848/Captura_de_pantalla_2026-02-16_061100_iv9hpt.png",
        stars: 4
    },
    {
        name: "Eduardo Lopez",
        location: "Colombia",
        text: "Soy docente de una universidad muy importante de mi país, ya había visto la historias de otras personas que ganaban muy bien y dije bueno que ya era mi turno y gracias a Dios gano un poco mas que docente.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236848/Captura_de_pantalla_2026-02-16_061040_g5gt0x.png"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-22 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Encabezado */}
                <div className="text-center mb-20">
                    <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">
                        Nuestros Clientes
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Lo que la gente <span className="italic text-slate-400">dice sobre nosotros</span>
                    </h2>
                    <div className="w-24 h-[3px] bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mx-auto mt-6 rounded-full" />
                </div>

                {/* Grid de Testimonios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div 
                            key={index} 
                            className="group relative bg-[#111827] rounded-3xl p-8 border border-slate-800 transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]"
                        >
                            {/* Avatar Flotante Estilo Imagen */}
                            <div className="absolute -top-6 left-8">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-2 border-blue-600 overflow-hidden bg-slate-800">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Icono de comillas azul */}
                                    <div className="absolute -top-1 -left-1 bg-blue-600 rounded-full p-1.5 shadow-lg">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017V21H5.017Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Estrellas */}
                            <div className="flex justify-end mb-6 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < item.stars ? "fill-orange-500 text-orange-500" : "text-slate-600"} 
                                    />
                                ))}
                            </div>

                            {/* Contenido */}
                            <div className="mt-4">
                                <h4 className="text-purple-400 font-bold text-lg leading-tight">
                                    {item.name} - <span className="text-sm font-medium opacity-80">{item.location}</span>
                                </h4>
                                <div className="h-[1px] w-full bg-slate-800 my-4" />
                                <p className="text-slate-400 text-sm leading-relaxed italic">
                                    "{item.text}"
                                </p>
                            </div>
                            
                            {/* Decoración sutil en el borde inferior */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}