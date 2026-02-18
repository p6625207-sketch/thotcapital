import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Rocket, TrendingUp, Shield } from 'lucide-react';

function ConstellationCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        const PARTICLE_COUNT = 80;
        const CONNECTION_DISTANCE = 150;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * canvas.offsetWidth,
                    y: Math.random() * canvas.offsetHeight,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                });
            }
        };

        const animate = () => {
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        createParticles();
        animate();
        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: 'none' }}
        />
    );
}

export default function ConstellationHero() {
    return (
        <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" />
            <ConstellationCanvas />

            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-2xl mx-4"
            >
                <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-2xl shadow-lg shadow-amber-500/20">
                            <Rocket size={32} className="text-white" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black text-center text-white tracking-tight leading-tight mb-4"
                    >
                        Tu Futuro Financiero{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            Comienza Aquí
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-slate-400 text-center text-lg mb-8 leading-relaxed"
                    >
                        Únete a la plataforma líder en inversión inteligente. Tecnología avanzada, resultados reales.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                    >
                        <Link
                            href={route('register')}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 text-center shadow-lg shadow-amber-500/20"
                        >
                            Comenzar Ahora
                        </Link>
                        <Link
                            href={route('login')}
                            className="bg-slate-800/60 border border-slate-600 hover:border-amber-500/50 text-slate-300 font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 text-center"
                        >
                            Iniciar Sesión
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex justify-center gap-8 text-sm text-slate-500"
                    >
                        <div className="flex items-center gap-2">
                            <Shield size={14} className="text-green-500" />
                            <span>100% Seguro</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-amber-500" />
                            <span>Rendimiento Real</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
