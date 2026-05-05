import { notFound } from 'next/navigation'
import { getClienteById } from '@/services/clientes/clientes.service'
import { getTickets } from '@/services/tickets/tickets.service'
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

export default async function ClienteTicketsPage({
  params,
}: {
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const [cliente, tickets] = await Promise.all([
    getClienteById(clientId),
    getTickets(clientId),
  ])

  if (!cliente) notFound()

  const lastSync = tickets.find((t) => t.syncedAt)?.syncedAt

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#6B7280]">
            Tickets sincronizados desde{' '}
            <Link
              href="https://tickets.mirmiapps.com"
              target="_blank"
              className="text-[#38D84E] hover:underline"
            >
              tickets.mirmiapps.com
            </Link>
          </p>
          {lastSync && (
            <p className="text-[10px] text-[#4B5563] mt-0.5">
              Última sync:{' '}
              {new Date(lastSync).toLocaleString('es-CO', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </p>
          )}
        </div>
        <SyncTicketsButton mode="client" clientSlug={cliente.ticketsClientSlug ?? null} />
      </div>

      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Asignado</TableHead>
              <TableHead>Apertura</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-[#6B7280]">
                  Sin tickets — usa el botón &quot;Sincronizar tickets&quot; para cargar datos
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs text-[#38D84E]">
                    {t.externalTicketNumber ?? t.externalTicketId}
                  </TableCell>
                  <TableCell className="text-white max-w-xs truncate">{t.title}</TableCell>
                  <TableCell>
                    <Badge variant={statusToBadgeVariant(t.status)}>
                      {STATUS_LABELS[t.status] ?? t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {t.priority && (
                      <Badge variant={statusToBadgeVariant(t.priority)}>
                        {PRIORITY_LABELS[t.priority] ?? t.priority}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    {t.category ?? '—'}
                    {t.subcategory && (
                      <span className="text-[#6B7280]"> / {t.subcategory}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">
                    <span>{t.requester ?? '—'}</span>
                    {t.requesterEmail && (
                      <p className="text-[10px] text-[#6B7280]">{t.requesterEmail}</p>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">{t.assignedTo ?? '—'}</TableCell>
                  <TableCell className="text-xs">
                    {t.openedAt
                      ? new Date(t.openedAt).toLocaleDateString('es-CO')
                      : '—'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
