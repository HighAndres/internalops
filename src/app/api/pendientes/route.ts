import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { pendingSchema } from '@/lib/validations/pending.schema'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const pendientes = await prisma.internalPendingItem.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { id: true, name: true } } },
    })
    return NextResponse.json(pendientes)
  } catch {
    return NextResponse.json({ error: 'Error al obtener pendientes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = pendingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { dueDate, ...rest } = parsed.data
    const item = await prisma.internalPendingItem.create({
      data: { ...rest, dueDate: dueDate ? new Date(dueDate) : null },
    })
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear pendiente' }, { status: 500 })
  }
}
