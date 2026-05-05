import { getHistorial } from '@/services/historial/historial.service'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { HISTORY_TYPE_LABELS } from '@/constants/history-types'
import Link from 'next/link'

export default async function HistorialPage() {
  const historial = await getHistorial()

  return (
    <DashboardShell
      heading="Historial global"
      description="Todas las entradas de historial operativo"
    >
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Resumen</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historial.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-[#6B7280]">
                  Sin entradas de historial
                </TableCell>
              </TableRow>
            ) : (
              historial.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium text-white">{entry.title}</TableCell>
                  <TableCell>
                    <Link
                      href={`/clientes/${entry.client.id}/historial`}
                      className="text-[#38D84E] hover:underline text-xs"
                    >
                      {entry.client.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(entry.type)}>
                      {HISTORY_TYPE_LABELS[entry.type as keyof typeof HISTORY_TYPE_LABELS]}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{entry.summary}</TableCell>
                  <TableCell className="text-xs">
                    {new Date(entry.createdAt).toLocaleDateString('es-CO')}
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
