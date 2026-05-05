import { notFound } from 'next/navigation'
import { getClienteById } from '@/services/clientes/clientes.service'
import { getClienteResumen } from '@/services/reportes/reportes.service'
import { StatCard } from '@/components/ui/card'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { ClientSlugConfig } from '@/components/clientes/client-slug-config'
import { HISTORY_TYPE_LABELS } from '@/constants/history-types'
import { History, Ticket, AlertTriangle, Clock, Package } from 'lucide-react'

export default async function ClienteResumenPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const [cliente, resumen] = await Promise.all([
    getClienteById(clientId),
    getClienteResumen(clientId),
  ])

  if (!cliente) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard label="Historial" value={resumen.historial} icon={<History size={16} />} />
        <StatCard label="Tickets" value={resumen.tickets} icon={<Ticket size={16} />} color="#8B5CF6" />
        <StatCard label="Riesgos abiertos" value={resumen.riesgos} icon={<AlertTriangle size={16} />} color="#EF4444" />
        <StatCard label="Pendientes" value={resumen.pendientes} icon={<Clock size={16} />} color="#F59E0B" />
        <StatCard label="Activos" value={resumen.activos} icon={<Package size={16} />} color="#3B82F6" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
          <div className="px-5 py-4 border-b border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-white">Información del cliente</h3>
          </div>
          <dl className="px-5 py-4 space-y-3">
            {[
              { label: 'Razón social', value: cliente.legalName },
              { label: 'Contacto', value: cliente.contactName },
              { label: 'Email', value: cliente.contactEmail },
              { label: 'Teléfono', value: cliente.phone },
              { label: 'Notas', value: cliente.notes },
            ]
              .filter((item) => item.value)
              .map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <dt className="text-xs text-[#6B7280] shrink-0">{item.label}</dt>
                  <dd className="text-xs text-[#D1D5DB] text-right">{item.value}</dd>
                </div>
              ))}
            <div className="flex justify-between gap-4">
              <dt className="text-xs text-[#6B7280]">Registrado</dt>
              <dd className="text-xs text-[#D1D5DB]">
                {new Date(cliente.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </dd>
            </div>
            <div className="flex justify-between gap-4 items-center">
              <dt className="text-xs text-[#6B7280] shrink-0">Slug tickets</dt>
              <dd>
                <ClientSlugConfig
                  clientId={cliente.id}
                  currentSlug={cliente.ticketsClientSlug ?? null}
                />
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl">
          <div className="px-5 py-4 border-b border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-white">Últimas entradas de historial</h3>
          </div>
          {resumen.ultimasEntradas.length === 0 ? (
            <div className="px-5 py-8 text-sm text-[#6B7280] text-center">
              Sin entradas de historial
            </div>
          ) : (
            <ul className="divide-y divide-[#2A2A2A]">
              {resumen.ultimasEntradas.map((entry) => (
                <li key={entry.id} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{entry.title}</p>
                    <p className="text-[10px] text-[#6B7280]">
                      {new Date(entry.createdAt).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                  <Badge variant={statusToBadgeVariant(entry.type)}>
                    {HISTORY_TYPE_LABELS[entry.type as keyof typeof HISTORY_TYPE_LABELS]}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
