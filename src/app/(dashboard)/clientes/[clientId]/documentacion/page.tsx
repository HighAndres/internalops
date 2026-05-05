import { prisma } from '@/lib/db/prisma'
import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'

export default async function ClienteDocumentacionPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const documentos = await prisma.internalDocument.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  })

  if (documentos.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-[#6B7280]">
        Sin documentos registrados para este cliente
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {documentos.map((doc) => (
        <div key={doc.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <FileText size={16} className="text-[#38D84E] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white">{doc.title}</h3>
                <Badge variant="neutral">{doc.category}</Badge>
              </div>
              {doc.tags && (
                <p className="text-xs text-[#6B7280] mt-0.5">{doc.tags}</p>
              )}
              <p className="text-xs text-[#D1D5DB] mt-3 whitespace-pre-wrap leading-relaxed line-clamp-4">
                {doc.content}
              </p>
              <p className="text-[10px] text-[#6B7280] mt-3">
                {new Date(doc.createdAt).toLocaleDateString('es-CO', {
                  year: 'numeric',
                  month: 'long',
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
