import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const documentos = await prisma.internalDocument.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { id: true, name: true } } },
    })
    return NextResponse.json(documentos)
  } catch {
    return NextResponse.json({ error: 'Error al obtener documentación' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.clientId || !body.title || !body.category || !body.content) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }
    const documento = await prisma.internalDocument.create({ data: body })
    return NextResponse.json(documento, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear documento' }, { status: 500 })
  }
}
