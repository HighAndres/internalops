import { prisma } from '@/lib/db/prisma'
import { StickyNote } from 'lucide-react'

export default async function ClienteNotasPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const notas = await prisma.internalNote.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  })

  if (notas.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6B7280]">
        Sin notas registradas para este cliente
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {notas.map((nota) => (
        <div key={nota.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <StickyNote size={15} className="text-yellow-400/70 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">{nota.title}</h3>
              <p className="text-xs text-[#D1D5DB] mt-2 whitespace-pre-wrap leading-relaxed">
                {nota.content}
              </p>
              <p className="text-[10px] text-[#6B7280] mt-3">
                {new Date(nota.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
