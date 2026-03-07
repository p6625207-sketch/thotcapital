import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Home, Package, Wallet, Users, History, Settings, Menu, X, LogOut, NetworkIcon } from 'lucide-react'

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props
    const { url } = usePage()
    const user = auth?.user

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Paquetes', href: '/packages', icon: Package },
        { name: 'Retiros', href: '/withdrawals', icon: Wallet },
        { name: 'Referidos', href: '/referrals', icon: Users },
        { name: 'Árbol Binario', href: '/network', icon: NetworkIcon },
        { name: 'Historial', href: '/history', icon: History },
        { name: 'Perfil', href: '/profile', icon: Settings },
    ]

    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">


            <div className="fixed left-0 right-0 top-0 z-50 border-b border-slate-700 bg-slate-900 lg:hidden">
                <div className="flex items-center justify-between px-4 py-4">
                    <h1 className="text-2xl font-bold text-amber-500">
                        Thot Capital
                    </h1>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-slate-400"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>


            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-700 bg-slate-900 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex h-full flex-col p-6">


                    <div className="mb-12 hidden lg:block">
                        <h1 className="text-3xl font-bold text-amber-500">
                            Thot Capital
                        </h1>
                    </div>


                    <div className="mb-5 mt-16 sm:mt-16 md:mt-0 border-b border-slate-700 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{user.name}</p>
                                <p className="text-sm text-slate-400">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon
                            const isActive = url.startsWith(item.href)

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                                        ? 'bg-slate-800 text-amber-400'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-amber-400'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="border-t border-slate-700 pt-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition-all hover:bg-red-500/10"
                        >
                            <LogOut size={20} />
                            <span>Cerrar Sesión</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="min-h-screen pt-20 lg:ml-72 lg:pt-0">
                <div className="p-6 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
