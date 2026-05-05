import { prisma } from '@/lib/db/prisma'
import { fetchTicketsFromSystem, type RemoteTicket } from './ticketing-client'

export interface SyncResult {
  synced: number
  errors: string[]
  clientSlug?: string
}

function mapStatus(status: string): string {
  const map: Record<string, string> = {
    OPEN: 'OPEN',
    IN_PROGRESS: 'IN_PROGRESS',
    PENDING: 'PENDING',
    RESOLVED: 'RESOLVED',
    CLOSED: 'CLOSED',
  }
  return map[status] ?? 'OPEN'
}

function mapPriority(priority: string): string {
  const map: Record<string, string> = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    URGENT: 'URGENT',
  }
  return map[priority] ?? 'MEDIUM'
}

async function resolveClientId(ticket: RemoteTicket): Promise<string | null> {
  const client = await prisma.client.findFirst({
    where: { ticketsClientSlug: ticket.client.slug },
    select: { id: true },
  })
  if (client) return client.id

  // Fallback: buscar por nombre
  const byName = await prisma.client.findFirst({
    where: { name: { equals: ticket.client.name } },
    select: { id: true },
  })
  return byName?.id ?? null
}

async function upsertTicket(ticket: RemoteTicket): Promise<void> {
  const clientId = await resolveClientId(ticket)
  if (!clientId) return

  const status = mapStatus(ticket.status) as any
  const priority = mapPriority(ticket.priority) as any

  await prisma.relatedTicket.upsert({
    where: { externalTicketId: ticket.id },
    create: {
      clientId,
      externalTicketId: ticket.id,
      externalTicketNumber: ticket.folio,
      title: ticket.title,
      status,
      priority,
      category: ticket.category.name,
      subcategory: ticket.subcategory?.name ?? null,
      assignedTo: ticket.assignee?.name ?? null,
      requester: ticket.requester.name,
      requesterEmail: ticket.requester.email,
      sourceSystem: 'mirmibug-tickets',
      openedAt: new Date(ticket.createdAt),
      closedAt: ticket.status === 'CLOSED' || ticket.status === 'RESOLVED'
        ? new Date(ticket.updatedAt)
        : null,
      commentsJson: JSON.stringify(ticket.comments),
      activitiesJson: JSON.stringify(ticket.activities),
      ticketUpdatedAt: new Date(ticket.updatedAt),
      syncedAt: new Date(),
    },
    update: {
      title: ticket.title,
      status,
      priority,
      category: ticket.category.name,
      subcategory: ticket.subcategory?.name ?? null,
      assignedTo: ticket.assignee?.name ?? null,
      requester: ticket.requester.name,
      requesterEmail: ticket.requester.email,
      closedAt: ticket.status === 'CLOSED' || ticket.status === 'RESOLVED'
        ? new Date(ticket.updatedAt)
        : null,
      commentsJson: JSON.stringify(ticket.comments),
      activitiesJson: JSON.stringify(ticket.activities),
      ticketUpdatedAt: new Date(ticket.updatedAt),
      syncedAt: new Date(),
    },
  })
}

export async function syncTickets(clientSlug?: string): Promise<SyncResult> {
  const result: SyncResult = { synced: 0, errors: [], clientSlug }

  try {
    const { tickets } = await fetchTicketsFromSystem({ clientSlug })

    for (const ticket of tickets) {
      try {
        await upsertTicket(ticket)
        result.synced++
      } catch (err) {
        result.errors.push(
          `${ticket.folio}: ${err instanceof Error ? err.message : String(err)}`
        )
      }
    }
  } catch (err) {
    result.errors.push(err instanceof Error ? err.message : String(err))
  }

  await prisma.ticketSyncLog.create({
    data: {
      clientSlug: clientSlug ?? null,
      status: result.errors.length === 0 ? 'success' : 'partial',
      message: result.errors.length > 0 ? result.errors.slice(0, 3).join('; ') : null,
      count: result.synced,
    },
  })

  return result
}
