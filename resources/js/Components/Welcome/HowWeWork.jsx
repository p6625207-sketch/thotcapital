import { motion } from 'framer-motion';
import { UserPlus, Package, Users, DollarSign } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Crea tu Cuenta',
        description: 'Regístrate en nuestra plataforma de forma rápida y segura en menos de 2 minutos.',
        color: 'from-amber-500 to-amber-600',
        glow: 'shadow-amber-500/20',
    },
    {
        number: '02',
        icon: Package,
        title: 'Elige un Plan',
        description: 'Selecciona el paquete de inversión que mejor se adapte a tus objetivos financieros.',
        color: 'from-cyan-500 to-cyan-600',
        glow: 'shadow-cyan-500/20',
    },
    {
        number: '03',
        icon: Users,
        title: 'Invita Personas',
        description: 'Comparte tu enlace de referido y construye tu red para multiplicar tus ganancias.',
        color: 'from-purple-500 to-purple-600',
        glow: 'shadow-purple-500/20',
    },
    {
        number: '04',
        icon: DollarSign,
        title: 'Gana Comisiones',
        description: 'Recibe comisiones por cada referido activo y observa crecer tus ingresos constantemente.',
        color: 'from-green-500 to-green-600',
        glow: 'shadow-green-500/20',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowWeWork() {
    return (
        <section className="mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
            >
                <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
                    Proceso Simple
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3">
                    ¿Cómo Funciona?
                </h2>
                <p className="text-slate-400 mt-4 max-w-xl mx-auto">
                    En solo 4 pasos puedes empezar a generar ingresos con nuestra plataforma.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={stepVariants}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-slate-700 to-transparent z-0" />
                            )}

                            <div className="relative z-10 mb-6">
                                <div
                                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon size={36} className="text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1e293b] border-2 border-slate-600 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-black text-white">
                                        {step.number}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-[220px]">
                                {step.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
