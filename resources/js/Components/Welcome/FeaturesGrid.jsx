import { motion } from 'framer-motion';
import {
    Shield,
    Headphones,
    Bitcoin,
    Lock,
    Zap,
    Globe,
} from 'lucide-react';

const features = [
    {
        icon: Shield,
        title: 'Seguridad Avanzada',
        description: 'Protección de datos y fondos con encriptación de nivel bancario.',
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
    },
    {
        icon: Bitcoin,
        title: 'Crypto Integrado',
        description: 'Opera con las principales criptomonedas del mercado de forma segura.',
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
    },
    {
        icon: Headphones,
        title: 'Soporte 24/7',
        description: 'Equipo de soporte disponible en todo momento para asistirte.',
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
    },
    {
        icon: Lock,
        title: 'Privacidad Total',
        description: 'Tus datos personales y financieros están completamente protegidos.',
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
    },
    {
        icon: Zap,
        title: 'Retiros Rápidos',
        description: 'Procesa tus retiros de manera rápida y sin complicaciones.',
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
    },
    {
        icon: Globe,
        title: 'Alcance Global',
        description: 'Plataforma disponible en múltiples países con soporte multimoneda.',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesGrid() {
    return (
        <section className="mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
                    Nuestras Ventajas
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
                    ¿Por qué elegirnos?
                </h2>
                <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                    Ofrecemos las mejores herramientas y garantías para que tu experiencia de inversión sea excepcional.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="group bg-[#1e293b]/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300"
                        >
                            <div
                                className={`${feature.bg} ${feature.border} border w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                            >
                                <Icon size={26} className={feature.color} />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
