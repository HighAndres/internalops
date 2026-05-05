import Link from 'next/link'
import { getClientes } from '@/services/clientes/clientes.service'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Users, ChevronRight, AlertTriangle, Clock, Ticket } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  PROSPECT: 'Prospecto',
  CHURNED: 'Perdido',
}

export default async function ClientesPage() {
  const clientes = await getClientes()

  return (
    <DashboardShell
      heading="Clientes"
      description={`${clientes.length} cliente${clientes.length !== 1 ? 's' : ''} registrado${clientes.length !== 1 ? 's' : ''}`}
    >
      {clientes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Users size={40} className="text-[#2A2A2A] mb-4" />
          <p className="text-sm text-[#D1D5DB]">No hay clientes registrados</p>
          <p className="text-xs text-[#6B7280] mt-1">Ejecuta el seed para ver datos demo</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {clientes.map((cliente) => (
            <Link
              key={cliente.id}
              href={`/clientes/${cliente.id}/resumen`}
              className="block bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#38D84E]/40 hover:bg-[#1E1E1E] transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#38D84E] transition-colors">
                      {cliente.name}
                    </h3>
                    <Badge variant={statusToBadgeVariant(cliente.status)}>
                      {STATUS_LABELS[cliente.status] ?? cliente.status}
                    </Badge>
                  </div>
                  {cliente.contactName && (
                    <p className="text-xs text-[#D1D5DB] mt-0.5">{cliente.contactName}</p>
                  )}
                  {cliente.contactEmail && (
                    <p className="text-xs text-[#6B7280]">{cliente.contactEmail}</p>
                  )}
                </div>
                <ChevronRight
                  size={16}
                  className="text-[#6B7280] group-hover:text-[#38D84E] transition-colors shrink-0 mt-0.5"
                />
              </div>

              {cliente._count && (
                <div className="mt-4 flex items-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Ticket size={11} />
                    {cliente._count.tickets} tickets
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle size={11} />
                    {cliente._count.risks} riesgos
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {cliente._count.pendingItems} pendientes
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
