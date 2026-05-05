import { prisma } from '@/lib/db/prisma'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'

const TYPE_LABELS: Record<string, string> = {
  SERVER: 'Servidor',
  WORKSTATION: 'Estación',
  LAPTOP: 'Laptop',
  PRINTER: 'Impresora',
  NETWORK_DEVICE: 'Red',
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

export default async function ClienteInventarioPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const activos = await prisma.clientAsset.findMany({
    where: { clientId },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Marca / Modelo</TableHead>
            <TableHead>Serial</TableHead>
            <TableHead>IP</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-[#6B7280]">
                Sin activos registrados
              </TableCell>
            </TableRow>
          ) : (
            activos.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium text-white">{a.name}</TableCell>
                <TableCell className="text-xs">{TYPE_LABELS[a.type] ?? a.type}</TableCell>
                <TableCell className="text-xs">
                  {[a.brand, a.model].filter(Boolean).join(' ') || '—'}
                </TableCell>
                <TableCell className="font-mono text-xs">{a.serialNumber ?? '—'}</TableCell>
                <TableCell className="font-mono text-xs">{a.ipAddress ?? '—'}</TableCell>
                <TableCell className="text-xs">{a.assignedTo ?? '—'}</TableCell>
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
  )
}
