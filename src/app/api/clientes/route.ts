import { NextRequest, NextResponse } from 'next/server'
import { getClientes, createCliente } from '@/services/clientes/clientes.service'
import { clientSchema } from '@/lib/validations/client.schema'

export async function GET() {
  try {
    const clientes = await getClientes()
    return NextResponse.json(clientes)
  } catch {
    return NextResponse.json({ error: 'Error al obtener clientes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = clientSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const cliente = await createCliente(parsed.data)
    return NextResponse.json(cliente, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 })
  }
}
