import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        // Cambiamos el azul brillante por un Slate-950 (el color de fondo del dashboard)
        <div className="flex min-h-screen flex-col items-center bg-[#0f172a] pt-6 sm:justify-center sm:pt-0">
            {/* <div className="mb-4 transform transition hover:scale-105">
                <Link href="/">
                    
                    <ApplicationLogo className="h-20 w-20 fill-current text-amber-500 shadow-amber-500/20 drop-shadow-lg" />
                </Link>
            </div> */}

            {/* 1. bg-slate-900: Mismo color de las cards de paquetes.
               2. border-slate-800: Separación sutil.
               3. shadow-xl: Para dar profundidad sobre el fondo negro.
            */}
            <div className="mt-6 w-full overflow-hidden bg-[#1e293b] border border-slate-800 px-8 py-10 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
            
            {/* Decoración sutil de fondo para que no se vea vacío */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
}