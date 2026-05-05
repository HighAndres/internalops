import { prisma } from '@/lib/db/prisma'
import type { WebhookTicketPayload } from '@/types/ticket'

export async function getTickets(clientId?: string) {
  return prisma.relatedTicket.findMany({
    where: clientId ? { clientId } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
  })
}

export async function getTicketById(id: string) {
  return prisma.relatedTicket.findUnique({
    where: { id },
    include: { client: { select: { id: true, name: true } } },
  })
}

export async function upsertTicketFromWebhook(payload: WebhookTicketPayload) {
  let clientId = payload.clientId

  if (!clientId && payload.clientName) {
    const existing = await prisma.client.findFirst({
      where: { name: { equals: payload.clientName } },
    })
    if (existing) {
      clientId = existing.id
    } else {
      const created = await prisma.client.create({
        data: { name: payload.clientName, status: 'ACTIVE' },
      })
      clientId = created.id
    }
  }

  if (!clientId) {
    throw new Error('Se requiere clientId o clientName en el payload')
  }

  const existing = await prisma.relatedTicket.findFirst({
    where: { externalTicketId: payload.externalTicketId },
  })

  if (existing) {
    return prisma.relatedTicket.update({
      where: { id: existing.id },
      data: {
        title: payload.title,
        status: payload.status,
        priority: payload.priority ?? null,
        category: payload.category ?? null,
        assignedTo: payload.assignedTo ?? null,
        requester: payload.requester ?? null,
        closedAt: payload.closedAt ? new Date(payload.closedAt) : null,
      },
    })
  }

  return prisma.relatedTicket.create({
    data: {
      clientId,
      externalTicketId: payload.externalTicketId,
      externalTicketNumber: payload.externalTicketNumber ?? null,
      title: payload.title,
      status: payload.status,
      priority: payload.priority ?? null,
      category: payload.category ?? null,
      assignedTo: payload.assignedTo ?? null,
      requester: payload.requester ?? null,
      sourceSystem: payload.sourceSystem ?? 'external',
      openedAt: payload.openedAt ? new Date(payload.openedAt) : null,
      closedAt: payload.closedAt ? new Date(payload.closedAt) : null,
    },
  })
}

export async function countTickets() {
  return prisma.relatedTicket.count()
}
