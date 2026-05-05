import { prisma } from '@/lib/db/prisma'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import Link from 'next/link'

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

export default async function PendientesPage() {
  const pendientes = await prisma.internalPendingItem.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
  })

  return (
    <DashboardShell
      heading="Pendientes"
      description="Todos los ítems pendientes registrados"
    >
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Vence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-[#6B7280]">
                  Sin pendientes registrados
                </TableCell>
              </TableRow>
            ) : (
              pendientes.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-white">{p.title}</TableCell>
                  <TableCell>
                    <Link
                      href={`/clientes/${p.client.id}/pendientes`}
                      className="text-[#38D84E] hover:underline text-xs"
                    >
                      {p.client.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(p.priority)}>
                      {PRIORITY_LABELS[p.priority] ?? p.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(p.status)}>
                      {STATUS_LABELS[p.status] ?? p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">
                    {p.dueDate
                      ? new Date(p.dueDate).toLocaleDateString('es-CO')
                      : '—'}
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
