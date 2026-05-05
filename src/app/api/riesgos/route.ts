import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { riskSchema } from '@/lib/validations/risk.schema'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const riesgos = await prisma.internalRisk.findMany({
      where: clientId ? { clientId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { client: { select: { id: true, name: true } } },
    })
    return NextResponse.json(riesgos)
  } catch {
    return NextResponse.json({ error: 'Error al obtener riesgos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = riskSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const riesgo = await prisma.internalRisk.create({ data: parsed.data })
    return NextResponse.json(riesgo, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear riesgo' }, { status: 500 })
  }
}
