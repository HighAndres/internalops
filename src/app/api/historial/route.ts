import { NextRequest, NextResponse } from 'next/server'
import { getHistorial, createHistorialEntry } from '@/services/historial/historial.service'
import { historySchema } from '@/lib/validations/history.schema'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const historial = await getHistorial(clientId)
    return NextResponse.json(historial)
  } catch {
    return NextResponse.json({ error: 'Error al obtener historial' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = historySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const entry = await createHistorialEntry(parsed.data)
    return NextResponse.json(entry, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear entrada de historial' }, { status: 500 })
  }
}
