import { prisma } from '@/lib/db/prisma'
import type { CreateHistoryEntryInput } from '@/types/history'

export async function getHistorial(clientId?: string) {
  return prisma.internalHistoryEntry.findMany({
    where: clientId ? { clientId } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { client: { select: { id: true, name: true } } },
  })
}

export async function getHistorialById(id: string) {
  return prisma.internalHistoryEntry.findUnique({
    where: { id },
    include: { client: { select: { id: true, name: true } } },
  })
}

export async function createHistorialEntry(data: CreateHistoryEntryInput) {
  return prisma.internalHistoryEntry.create({ data })
}

export async function countHistorial() {
  return prisma.internalHistoryEntry.count()
}
