import { prisma } from '@/lib/db/prisma'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import Link from 'next/link'

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

export default async function RiesgosPage() {
  const riesgos = await prisma.internalRisk.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
  })

  return (
    <DashboardShell
      heading="Riesgos"
      description="Todos los riesgos internos registrados"
    >
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riesgos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-[#6B7280]">
                  Sin riesgos registrados
                </TableCell>
              </TableRow>
            ) : (
              riesgos.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium text-white">{r.title}</TableCell>
                  <TableCell>
                    <Link
                      href={`/clientes/${r.client.id}/riesgos`}
                      className="text-[#38D84E] hover:underline text-xs"
                    >
                      {r.client.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(r.severity)}>
                      {SEVERITY_LABELS[r.severity] ?? r.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(r.status)}>
                      {STATUS_LABELS[r.status] ?? r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">
                    {new Date(r.createdAt).toLocaleDateString('es-CO')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  )
}
