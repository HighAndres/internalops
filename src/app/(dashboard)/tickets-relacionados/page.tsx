import { getTickets } from '@/services/tickets/tickets.service'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { SyncTicketsButton } from '@/components/tickets/sync-tickets-button'
import Link from 'next/link'

const STATUS_LABELS: Record<string, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En progreso',
  PENDING: 'Pendiente',
  RESOLVED: 'Resuelto',
  CLOSED: 'Cerrado',
}

const PRIORITY_LABELS: Record<string, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente',
  CRITICAL: 'Crítico',
}

export default async function TicketsRelacionadosPage() {
  const tickets = await getTickets()

  const lastSync = tickets.find((t) => t.syncedAt)?.syncedAt

  return (
    <DashboardShell
      heading="Tickets relacionados"
      description="Historial sincronizado desde tickets.mirmiapps.com"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          {lastSync ? (
            <p className="text-xs text-[#4B5563]">
              Última sync:{' '}
              {new Date(lastSync).toLocaleString('es-CO', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </p>
          ) : (
            <p className="text-xs text-[#6B7280]">Sin datos sincronizados aún</p>
          )}
        </div>
        <SyncTicketsButton mode="global" />
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-[#6B7280]">
                  Sin tickets — usa el botón &quot;Sincronizar tickets&quot; para cargar datos
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-xs text-[#38D84E]">
                    {ticket.externalTicketNumber ?? ticket.externalTicketId}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/clientes/${ticket.client.id}/tickets`}
                      className="text-[#38D84E] hover:underline text-xs"
                    >
                      {ticket.client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white max-w-xs truncate">{ticket.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(ticket.status)}>
                      {STATUS_LABELS[ticket.status] ?? ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {ticket.priority && (
                      <Badge variant={statusToBadgeVariant(ticket.priority)}>
                        {PRIORITY_LABELS[ticket.priority] ?? ticket.priority}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    <span>{ticket.requester ?? '—'}</span>
                    {ticket.requesterEmail && (
                      <p className="text-[10px] text-[#6B7280]">{ticket.requesterEmail}</p>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {ticket.openedAt
                      ? new Date(ticket.openedAt).toLocaleDateString('es-CO')
                      : new Date(ticket.createdAt).toLocaleDateString('es-CO')}
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
