import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <a
      href={route("google.redirect")}
      className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl 
                 border border-amber-500 bg-[#0f172a] text-amber-500 
                 hover:bg-amber-500 hover:text-slate-900 transition-all duration-300 
                 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]
                 active:scale-95 focus:ring-2 focus:ring-amber-400 focus:outline-none"
    >
      {/* Fondo blanco sutil tras el icono para que resalte en el fondo oscuro */}
      <div className="bg-white rounded-full p-1 flex items-center justify-center">
        <FcGoogle className="text-xl" />
      </div>
      
      <span className="font-bold text-sm sm:text-base tracking-wide uppercase">
        Continuar con Google
      </span>
    </a>
  );
}