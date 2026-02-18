import React from 'react';
import { Link } from '@inertiajs/react';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0f172a] border-b border-slate-800 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    
                 
                    <div className="flex items-center gap-2">
                        <div className="bg-cyan-500 p-2 rounded-lg">
                            <Wallet className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            FINEX <span className="text-cyan-400">AI</span>
                        </span>
                    </div>

                  
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                            Inicio
                        </Link>
                        <Link href="/Acerca" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                            Acerca
                        </Link>
                        <Link href="/Preguntas" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                            Preguntas
                        </Link>
                        <Link href="/Politicas" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                            Politicas
                        </Link>
                        <Link href="/Contacto" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                            Contacto
                        </Link>
                        
                        {auth?.user ? (
                            <Link href={route('dashboard')} className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-full text-sm font-bold transition">
                                Mi Panel
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition">
                                    Inicio de sesión
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    className="bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-5 py-2 rounded-full text-sm font-bold transition"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
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
                    <Link href={route('register')} className="block py-2 text-cyan-400 font-bold">Registrarse</Link>
                </div>
            )}
        </nav>
    );
}