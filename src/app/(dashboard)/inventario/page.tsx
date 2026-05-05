import { prisma } from '@/lib/db/prisma'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import Link from 'next/link'

const TYPE_LABELS: Record<string, string> = {
  SERVER: 'Servidor',
  WORKSTATION: 'Estación de trabajo',
  LAPTOP: 'Laptop',
  PRINTER: 'Impresora',
  NETWORK_DEVICE: 'Dispositivo de red',
  PHONE: 'Teléfono',
  TABLET: 'Tablet',
  SOFTWARE: 'Software',
  LICENSE: 'Licencia',
  OTHER: 'Otro',
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  MAINTENANCE: 'Mantenimiento',
  RETIRED: 'Retirado',
}

export default async function InventarioPage() {
  const activos = await prisma.clientAsset.findMany({
    orderBy: { name: 'asc' },
    include: { client: { select: { id: true, name: true } } },
  })

  return (
    <DashboardShell
      heading="Inventario"
      description="Todos los activos registrados"
    >
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Marca / Modelo</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-[#6B7280]">
                  Sin activos registrados
                </TableCell>
              </TableRow>
            ) : (
              activos.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-white">{a.name}</TableCell>
                  <TableCell>
                    <Link
                      href={`/clientes/${a.client.id}/inventario`}
                      className="text-[#38D84E] hover:underline text-xs"
                    >
                      {a.client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs">{TYPE_LABELS[a.type] ?? a.type}</TableCell>
                  <TableCell className="text-xs text-[#D1D5DB]">
                    {[a.brand, a.model].filter(Boolean).join(' ') || '—'}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{a.ipAddress ?? '—'}</TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(a.status)}>
                      {STATUS_LABELS[a.status] ?? a.status}
                    </Badge>
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
