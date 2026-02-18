import { Head } from '@inertiajs/react';
import Header from '@/Components/Welcome/Header';
import Footer from '@/Components/Welcome/Footer';

export default function Layout({ title, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 relative selection:bg-amber-500/30">
      <Head title={title || "Negocio"} />

      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <Header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer className="bg-[#020617] border-t border-slate-800 py-10" />
    </div>
  );
}