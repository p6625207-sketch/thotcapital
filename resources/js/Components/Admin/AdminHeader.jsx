import { LogOut, Shield, LayoutDashboard, UserCircle } from "lucide-react";

export default function AdminHeader() {
  const handleLogout = async () => {
    // Uso de encadenamiento opcional para evitar el error de "null" si no se encuentra el token
    const token = document.querySelector('meta[name="csrf-token"]')?.content;

    try {
      await fetch("/admin/logout", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
          "Accept": "application/json",
        },
      });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <header className="w-full bg-[#1e293b]/50 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-2xl">
      {/* Lado Izquierdo: Branding */}
      <div className="flex items-center gap-4">
        <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
          <Shield className="w-6 h-6 text-amber-500" strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight leading-none uppercase">
            Sistema <span className="text-amber-500">Central</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] mt-1 uppercase">
            Administración de Inversiones
          </p>
        </div>
      </div>

      {/* Lado Derecho: Acciones y Usuario */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-950/40 border border-slate-800 rounded-full text-slate-400 text-xs font-semibold">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Administrador Online
        </div>

        <div className="h-8 w-[1px] bg-slate-800 mx-2" />

        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 text-slate-400 hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-all"
        >
          <div className="p-2 rounded-lg group-hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </div>
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
}