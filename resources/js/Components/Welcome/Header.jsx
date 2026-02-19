import React from 'react';
import { Link } from '@inertiajs/react';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0f172a] border-b border-slate-800 text-white sticky top-0 z-50">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                 
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg ">
                            <img src="https://res.cloudinary.com/dcyx3nqj5/image/upload/v1771302950/WhatsApp_Image_2026-02-17_at_12.22.47_AM-removebg-preview_s4hcm0.png"
                             alt="Logo" className="w-20 h-20" />
                        </div>
                    </div>

                  
                    <div className="items-center hidden space-x-8 md:flex">
                        <Link href="/" className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                            Inicio
                        </Link>
                        <Link href="/Acerca" className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                            Acerca
                        </Link>
                        <Link href="/Preguntas" className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                            Preguntas
                        </Link>
                        <Link href="/Politicas" className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                            Politicas
                        </Link>
                        <Link href="/Contacto" className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                            Contacto
                        </Link>
                        
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="px-5 py-2 text-sm font-bold transition rounded-full bg-cyan-600 hover:bg-cyan-500">
                                Mi Panel
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium transition text-slate-300 hover:text-cyan-400">
                                    Inicio de sesión
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    className="px-5 py-2 text-sm font-bold transition bg-transparent border rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

       
            {isOpen && (
                <div className="md:hidden bg-[#1e293b] px-4 pt-2 pb-6 space-y-2 border-b border-slate-700">
                    <Link href="/" className="block py-2 text-slate-300">Inicio</Link>
                    <Link href="/Acerca" className="block py-2 text-slate-300">Acerca</Link>
                    <Link href="/Preguntas" className="block py-2 text-slate-300">Preguntas</Link>
                    <Link href="/Politicas" className="block py-2 text-slate-300">Politicas</Link>
                    <Link href="/Contacto" className="block py-2 text-slate-300">Contacto</Link>
                    <Link href={route('login')} className="block py-2 text-slate-300">Inicio de sesión</Link>
                    <Link href={route('register')} className="block py-2 font-bold text-cyan-400">Registrarse</Link>
                </div>
            )}
        </nav>
    );
}