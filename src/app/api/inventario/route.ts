import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { assetSchema } from '@/lib/validations/asset.schema'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const activos = await prisma.clientAsset.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { name: 'asc' },
      include: { client: { select: { id: true, name: true } } },
    })
    return NextResponse.json(activos)
  } catch {
    return NextResponse.json({ error: 'Error al obtener inventario' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = assetSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const activo = await prisma.clientAsset.create({ data: parsed.data })
    return NextResponse.json(activo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear activo' }, { status: 500 })
  }
}
