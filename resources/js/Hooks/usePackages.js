import { useState, useEffect } from 'react'
import PaqueteService from '@/Services/paquete.service'

export function usePackages(userId) {
    const [paquetes, setPaquetes] = useState([])
    const [paqueteActivo, setPaqueteActivo] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPaquetes()
    }, [userId])

    const fetchPaquetes = async () => {
        try {
            setLoading(true)

            // Obtener todos los paquetes
            const paquetesData = await PaqueteService.obtenerPaquetes()
            
            // Obtener paquete activo del usuario
            const paqueteActivoData = await PaqueteService.obtenerPaquetesDeUsuario(userId)

            // Establecer paquete activo
            if (!paqueteActivoData.error) {
                setPaqueteActivo(paqueteActivoData)
            }

            // Marcar el paquete actual en la lista
            if (!paquetesData.error) {
                const paquetesConEstado = paquetesData.map((pkg) => ({
                    ...pkg,
                    isCurrent: paqueteActivoData && !paqueteActivoData.error && pkg.nombre === paqueteActivoData.nombre,
                }))
                setPaquetes(paquetesConEstado)
            }
        } catch (error) {
            console.error('Error al cargar paquetes:', error)
        } finally {
            setLoading(false)
        }
    }

    return {
        paquetes,
        paqueteActivo,
        loading,
        refetch: fetchPaquetes
    }
}