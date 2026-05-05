import { getDashboardKpis } from '@/services/reportes/reportes.service'
import { getHistorial } from '@/services/historial/historial.service'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { StatCard } from '@/components/ui/card'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { HISTORY_TYPE_LABELS } from '@/constants/history-types'
import {
  Users,
  History,
  AlertTriangle,
  Clock,
  Ticket,
} from 'lucide-react'

export default async function DashboardPage() {
  const kpis = await getDashboardKpis()
  const historial = await getHistorial()
  const recientes = historial.slice(0, 6)

  return (
    <DashboardShell
      heading="Dashboard"
      description="Resumen operativo de Mirmibug InternalOps"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Clientes activos"
          value={kpis.clientesActivos}
          icon={<Users size={18} />}
          color="#38D84E"
        />
        <StatCard
          label="Entradas de historial"
          value={kpis.totalHistorial}
          icon={<History size={18} />}
          color="#3B82F6"
        />
        <StatCard
          label="Riesgos abiertos"
          value={kpis.riesgosAbiertos}
          icon={<AlertTriangle size={18} />}
          color="#EF4444"
        />
        <StatCard
          label="Pendientes activos"
          value={kpis.pendientesAbiertos}
          icon={<Clock size={18} />}
          color="#F59E0B"
        />
        <StatCard
          label="Tickets relacionados"
          value={kpis.totalTickets}
          icon={<Ticket size={18} />}
          color="#8B5CF6"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
          <div className="px-5 py-4 border-b border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-white">Actividad reciente</h3>
          </div>
          {recientes.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-[#6B7280]">
              Sin actividad registrada
            </div>
          ) : (
            <ul className="divide-y divide-[#2A2A2A]">
              {recientes.map((entry) => (
                <li key={entry.id} className="px-5 py-3 flex items-start gap-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-[#38D84E] shrink-0 mt-1.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{entry.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#D1D5DB]">{entry.client.name}</span>
                      <Badge variant={statusToBadgeVariant(entry.type)}>
                        {HISTORY_TYPE_LABELS[entry.type as keyof typeof HISTORY_TYPE_LABELS]}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs text-[#6B7280] shrink-0">
                    {new Date(entry.createdAt).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
          <div className="px-5 py-4 border-b border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-white">Estado del sistema</h3>
          </div>
          <div className="px-5 py-5 space-y-4">
            {[
              { label: 'Base de datos', status: 'Operativa', ok: true },
              { label: 'Webhooks', status: 'Listos', ok: true },
              { label: 'API de tickets', status: 'Configurar integración', ok: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-[#D1D5DB]">{item.label}</span>
                <Badge variant={item.ok ? 'success' : 'warning'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
