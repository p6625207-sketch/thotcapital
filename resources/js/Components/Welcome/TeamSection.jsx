import React from 'react';

const experts = [
    {
        name: "Kathi Angel",
        role: "MARKETING Y RELACIONES",
        description: "Encargada de las relaciones y compromisos de la empresa hacia sus usuarios estratégicos.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236848/Captura_de_pantalla_2026-02-16_061100_iv9hpt.png",
        iconColor: "text-green-500",
        borderColor: "group-hover:border-green-500/50"
    },
    {
        name: "William Trosyon",
        role: "C.E.O.",
        description: "Líder visionario enfocado en el crecimiento exponencial y la estabilidad del ecosistema financiero.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236848/Captura_de_pantalla_2026-02-16_061040_g5gt0x.png",
        iconColor: "text-orange-500",
        borderColor: "group-hover:border-orange-500/50"
    },
    {
        name: "Samanta Garcia",
        role: "OPERACIONES PARA LATAM",
        description: "Especialista en gestión de procesos operativos y expansión en mercados latinoamericanos.",
        image: "https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771236855/Captura_de_pantalla_2026-02-16_061116_yhsrba.png",
        iconColor: "text-blue-500",
        borderColor: "group-hover:border-blue-500/50"
    }
];

export default function TeamSection() {
    return (
        <section className="py-20 bg-[#020617] relative overflow-hidden">
            {/* Fondo decorativo sutil */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Encabezado Estilo Imagen */}
                <div className="text-center mb-8">
                    <p className="text-blue-400 font-medium text-sm tracking-wide mb-3">
                        Ofrecemos las mejores herramientas y garantías
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Conoce a nuestros <span className="text-blue-500">expertos</span>
                    </h2>
                </div>

                {/* Grid de Expertos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experts.map((member, index) => (
                        <div 
                            key={index} 
                            className={`group relative bg-[#111827] rounded-2xl overflow-hidden border border-slate-500 transition-all duration-500 ${member.borderColor}`}
                        >
                            {/* Contenedor de Imagen con Overlay Gradiente */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradiente inferior para legibilidad del nombre si fuera necesario */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60" />
                                
                                {/* Overlay de descripción al hacer Hover */}
                                <div className="absolute inset-0 bg-[#0B1120]/90 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
                                    <p className="text-slate-300 text-base leading-relaxed">
                                        {member.description}
                                    </p>
                                    <div className="mt-6 w-12 h-[2px] bg-blue-500" />
                                </div>
                            </div>

                            {/* Info inferior - Estilo Cards Imagen */}
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${member.iconColor}`}>
                                        {member.role}
                                    </span>
                                    {/* Icono decorativo que emula los de la imagen */}
                                    <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center border border-slate-700">
                                        <div className={`w-2 h-2 rounded-full animate-pulse ${member.iconColor.replace('text', 'bg')}`} />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-bold text-white leading-none">
                                    {member.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}