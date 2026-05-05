import { prisma } from '@/lib/db/prisma'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
}

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En progreso',
  DONE: 'Hecho',
  CANCELLED: 'Cancelado',
}

export default async function ClientePendientesPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const pendientes = await prisma.internalPendingItem.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  })

  if (pendientes.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6B7280]">
        Sin pendientes registrados para este cliente
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {pendientes.map((p) => (
        <div key={p.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-2 w-2 rounded-full shrink-0 ${
                  p.status === 'DONE' || p.status === 'CANCELLED'
                    ? 'bg-[#6B7280]'
                    : 'bg-[#38D84E]'
                }`}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{p.title}</p>
                {p.description && (
                  <p className="text-xs text-[#D1D5DB] mt-0.5">{p.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={statusToBadgeVariant(p.priority)}>
                {PRIORITY_LABELS[p.priority] ?? p.priority}
              </Badge>
              <Badge variant={statusToBadgeVariant(p.status)}>
                {STATUS_LABELS[p.status] ?? p.status}
              </Badge>
              {p.dueDate && (
                <span className="text-xs text-[#6B7280]">
                  {new Date(p.dueDate).toLocaleDateString('es-CO')}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
