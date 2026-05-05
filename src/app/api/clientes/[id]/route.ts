import { NextRequest, NextResponse } from 'next/server'
import { updateCliente, deleteCliente } from '@/services/clientes/clientes.service'
import { clientSchema } from '@/lib/validations/client.schema'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = clientSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const cliente = await updateCliente(id, parsed.data)
    return NextResponse.json(cliente)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar cliente' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteCliente(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar cliente' }, { status: 500 })
  }
}
