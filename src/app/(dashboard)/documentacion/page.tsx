import { prisma } from '@/lib/db/prisma'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default async function DocumentacionPage() {
  const documentos = await prisma.internalDocument.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
  })

  return (
    <DashboardShell
      heading="Documentación"
      description="Documentos internos de todos los clientes"
    >
      {documentos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText size={40} className="text-[#2A2A2A] mb-4" />
          <p className="text-sm text-[#D1D5DB]">Sin documentos registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#38D84E]/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <FileText size={16} className="text-[#38D84E] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-white truncate">{doc.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Link
                      href={`/clientes/${doc.client.id}/documentacion`}
                      className="text-xs text-[#38D84E] hover:underline"
                    >
                      {doc.client.name}
                    </Link>
                    <Badge variant="neutral">{doc.category}</Badge>
                  </div>
                  {doc.tags && (
                    <p className="text-xs text-[#6B7280] mt-1">{doc.tags}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
