// resources/js/Pages/Admin/AdminDashboard.jsx
import { useRef } from "react";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import { Users, DollarSign } from "lucide-react";

// Importación de componentes locales
import AdminHeader from "@/Components/Admin/AdminHeader.jsx";
import StatCard from "@/Components/Admin/StatCard.jsx";
import AdminCTA from "@/Components/Admin/AdminCTA.jsx";
import { Wallet, Package, ShieldCheck, User, Receipt } from "lucide-react";

export default function AdminDashboard({ stats = { total_users: 0, total_invested: 0 } }) {
  const sectionUsersRef = useRef(null);
  const sectionWithdrawalsRef = useRef(null);
  const sectionPackagesRef = useRef(null);

  const scrollToSection = (ref) => {
    const offset = 100;
    const elementPosition = ref.current?.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans selection:bg-amber-500/30">
      <Head title="Panel de Administración" />

      <div className="sticky top-0 z-50 w-full">
        <AdminHeader />
      </div>

      <main className="flex-grow">
        <section className="min-h-[50vh] sm:min-h-[50vh] flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-5 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter">
              CENTRAL DE <span className="text-amber-500 text-glow">OPERACIONES</span>
            </h1>
            <p className="text-slate-500 font-bold tracking-[0.2em] sm:tracking-[0.4em] text-[9px] sm:text-xs mt-4 uppercase">
              Sistema de Gestión Financiera de Inversiones
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-5xl mb-8 sm:mb-6">
            <StatCard
              label="Usuarios Registrados"
              value={stats.total_users}
              icon={Users}
              color="text-blue-400"
            />
            <StatCard
              label="Inversión Activa Total"
              value={`$${stats.total_invested.toLocaleString()}`}
              icon={DollarSign}
              color="text-emerald-400"
            />
          </div>
        </section>

        <div className="space-y-3 sm:space-y-5 pb-8">

          {/* Versión para Retiros (Original) */}
          <AdminCTA
            sectionRef={sectionWithdrawalsRef}
            title="Solicitudes de Retiro"
  description="Revisa, aprueba o rechaza las solicitudes de retiro realizadas por los usuarios antes de su procesamiento en la red."
            buttonText="REVISAR SOLICITUDES"
            href="/admin/retiros"
            icon={Wallet}
            variant="amber"
          />

          {/* Ejemplo de uso para otra sección (Paquetes) */}
          <AdminCTA
            title="Configuración de Paquetes"
  description="Crea, edita y administra los planes de inversión, incluyendo montos mínimos, porcentajes de retorno y duración."
            buttonText="GESTIONAR PAQUETES"
            href="/admin/paquetes"
            icon={Package}
            variant="blue"
          />

          <AdminCTA
            sectionRef={sectionWithdrawalsRef}
            title="Historial de Transacciones"
  description="Consulta el registro completo de depósitos, retiros e inversiones realizadas dentro de la plataforma."
            buttonText="REVISAR HISTORIAL"
            href="/admin/transactions"
            icon={Receipt}
            variant="amber"
          />

          <AdminCTA
            title="Usuarios Activos"
  description="Supervisa la actividad, balances y rendimiento de los usuarios registrados en la plataforma."
            buttonText="GESTIONAR USUARIOS"
            href="/admin/users"
            icon={User}
            variant="blue"
          />

        </div>
      </main>

      <footer className="py-8 border-t border-slate-900 text-center">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em]">
          Terminal de Acceso Seguro v2.4.0 — AES-256 Enabled
        </p>
      </footer>
    </div>
  );
}