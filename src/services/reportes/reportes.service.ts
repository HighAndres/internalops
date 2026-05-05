import { prisma } from '@/lib/db/prisma'

export async function getDashboardKpis() {
  const [
    clientesActivos,
    totalHistorial,
    riesgosAbiertos,
    pendientesAbiertos,
    totalTickets,
  ] = await Promise.all([
    prisma.client.count({ where: { status: 'ACTIVE' } }),
    prisma.internalHistoryEntry.count(),
    prisma.internalRisk.count({ where: { status: 'OPEN' } }),
    prisma.internalPendingItem.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.relatedTicket.count(),
  ])

  return {
    clientesActivos,
    totalHistorial,
    riesgosAbiertos,
    pendientesAbiertos,
    totalTickets,
  }
}

export async function getClienteResumen(clientId: string) {
  const [historial, tickets, riesgos, pendientes, activos] = await Promise.all([
    prisma.internalHistoryEntry.count({ where: { clientId } }),
    prisma.relatedTicket.count({ where: { clientId } }),
    prisma.internalRisk.count({ where: { clientId, status: 'OPEN' } }),
    prisma.internalPendingItem.count({ where: { clientId, status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
    prisma.clientAsset.count({ where: { clientId, status: 'ACTIVE' } }),
  ])

  const ultimasEntradas = await prisma.internalHistoryEntry.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, title: true, type: true, createdAt: true },
  })

  return { historial, tickets, riesgos, pendientes, activos, ultimasEntradas }
}
