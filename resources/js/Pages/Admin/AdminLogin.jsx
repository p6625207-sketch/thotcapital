import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const res = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = data.redirect;
      } else {
        setError(data.message || "Acceso denegado: Credenciales no válidas");
      }
    } catch (err) {
      setError("Error crítico de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] selection:bg-amber-500/30">
      <Head title="Acceso Administrativo | Central" />
      
      {/* Decoración de fondo sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md px-6">
        {/* Logo / Badge de Seguridad */}
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
            <ShieldCheck className="text-amber-500" size={40} strokeWidth={1.5} />
          </div>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-6"
        >
          <div className="text-center space-y-2 mb-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              Panel de <span className="text-amber-500">Control</span>
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
              Sistema de Gestión Financiera
            </p>
          </div>

          <div className="space-y-4">
            {/* Input Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Correo Administrativo" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none"
  
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5 transition-all outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-4 rounded-xl text-center animate-shake">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="group relative bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black rounded-2xl py-4 transition-all flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-amber-500/10"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            ) : (
              <> 
                ENTRAR
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          Encriptación AES-256 End-to-End activa
        </p>
      </div>
    </div>
  );
}