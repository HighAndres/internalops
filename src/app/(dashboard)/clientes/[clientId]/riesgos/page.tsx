import { prisma } from '@/lib/db/prisma'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'

const SEVERITY_LABELS: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  CRITICAL: 'Crítico',
}

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Abierto',
  MITIGATED: 'Mitigado',
  ACCEPTED: 'Aceptado',
  CLOSED: 'Cerrado',
}

export default async function ClienteRiesgosPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const riesgos = await prisma.internalRisk.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  })

  if (riesgos.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6B7280]">
        Sin riesgos registrados para este cliente
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {riesgos.map((r) => (
        <div key={r.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                <Badge variant={statusToBadgeVariant(r.severity)}>
                  {SEVERITY_LABELS[r.severity] ?? r.severity}
                </Badge>
                <Badge variant={statusToBadgeVariant(r.status)}>
                  {STATUS_LABELS[r.status] ?? r.status}
                </Badge>
              </div>
              <p className="text-xs text-[#D1D5DB] mt-1.5">{r.description}</p>
              {r.recommendation && (
                <div className="mt-3 bg-[#0F1115] rounded-lg p-3">
                  <p className="text-[10px] text-[#6B7280] font-medium mb-1">Recomendación</p>
                  <p className="text-xs text-[#D1D5DB]">{r.recommendation}</p>
                </div>
              )}
            </div>
            <span className="text-xs text-[#6B7280] shrink-0">
              {new Date(r.createdAt).toLocaleDateString('es-CO')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
