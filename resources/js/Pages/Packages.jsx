import { useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PackageCard from '@/Components/Packages/PackageCard'
import PurchaseModal from '@/Components/Packages/PaymentModal'
import { usePackages } from '@/Hooks/usePackages'

export default function Packages() {
    const { auth } = usePage().props
    const user = auth?.user
    const [selectedPackage, setSelectedPackage] = useState(null)
    
    const { paquetes, paqueteActivo, loading, refetch } = usePackages(user.id)

     if (loading) {
            return (
                <AuthenticatedLayout>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                            <p className="text-white text-lg">Cargando ...</p>
                        </div>
                    </div>
                </AuthenticatedLayout>
            )
        }

    return (
        <AuthenticatedLayout>
            <Head title="Paquetes" />

            <div className="space-y-10">
              
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Paquetes de Inversión
                    </h1>
                    <p className="mt-2 text-slate-400">
                        Elige el paquete que mejor se adapte a tus objetivos.
                    </p>

                    {paqueteActivo && (
                        <p className="mt-4 text-slate-400">
                            Paquete actual:{' '}
                            <span className="font-semibold text-amber-400">
                                {paqueteActivo.nombre}
                            </span>
                        </p>
                    )}
                </div>

               
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paquetes.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            paquete={pkg}
                            selected={selectedPackage}
                            onSelect={setSelectedPackage}
                        />
                    ))}
                </div>

          
                {selectedPackage && (
                    <PurchaseModal
                        paquete={selectedPackage}
                        onClose={() => setSelectedPackage(null)}
                        onPurchaseComplete={() => {
                            setSelectedPackage(null)
                            refetch()
                        }}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    )
}