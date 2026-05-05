import { prisma } from '@/lib/db/prisma'
import type { CreateClientInput, UpdateClientInput } from '@/types/client'

export async function getClientes() {
  return prisma.client.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          history: true,
          tickets: true,
          risks: true,
          pendingItems: true,
          assets: true,
        },
      },
    },
  })
}

export async function getClienteById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          history: true,
          tickets: true,
          risks: true,
          pendingItems: true,
          assets: true,
          documents: true,
          internalNotes: true,
        },
      },
    },
  })
}

export async function createCliente(data: CreateClientInput) {
  return prisma.client.create({ data })
}

export async function updateCliente(id: string, data: UpdateClientInput) {
  return prisma.client.update({ where: { id }, data })
}

export async function deleteCliente(id: string) {
  return prisma.client.delete({ where: { id } })
}

export async function getClientesActivos() {
  return prisma.client.count({ where: { status: 'ACTIVE' } })
}
