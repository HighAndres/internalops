import { getHistorial } from '@/services/historial/historial.service'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { HISTORY_TYPE_LABELS } from '@/constants/history-types'

export default async function ClienteHistorialPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const historial = await getHistorial(clientId)

  if (historial.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6B7280]">
        Sin entradas de historial para este cliente
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {historial.map((entry) => (
        <div
          key={entry.id}
          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white">{entry.title}</h3>
                <Badge variant={statusToBadgeVariant(entry.type)}>
                  {HISTORY_TYPE_LABELS[entry.type as keyof typeof HISTORY_TYPE_LABELS]}
                </Badge>
              </div>
              <p className="text-xs text-[#D1D5DB] mt-1.5">{entry.summary}</p>
            </div>
            <span className="text-xs text-[#6B7280] shrink-0">
              {new Date(entry.createdAt).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          {(entry.details || entry.rootCause || entry.actionTaken || entry.result || entry.impact) && (
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
              {entry.rootCause && (
                <div className="bg-[#0F1115] rounded-lg p-3">
                  <p className="text-[#6B7280] mb-1 font-medium">Causa raíz</p>
                  <p className="text-[#D1D5DB]">{entry.rootCause}</p>
                </div>
              )}
              {entry.actionTaken && (
                <div className="bg-[#0F1115] rounded-lg p-3">
                  <p className="text-[#6B7280] mb-1 font-medium">Acción tomada</p>
                  <p className="text-[#D1D5DB]">{entry.actionTaken}</p>
                </div>
              )}
              {entry.result && (
                <div className="bg-[#0F1115] rounded-lg p-3">
                  <p className="text-[#6B7280] mb-1 font-medium">Resultado</p>
                  <p className="text-[#D1D5DB]">{entry.result}</p>
                </div>
              )}
              {entry.impact && (
                <div className="bg-[#0F1115] rounded-lg p-3">
                  <p className="text-[#6B7280] mb-1 font-medium">Impacto</p>
                  <p className="text-[#D1D5DB]">{entry.impact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
