import { NextRequest, NextResponse } from 'next/server'
import { getTickets } from '@/services/tickets/tickets.service'

export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get('clientId') ?? undefined
    const tickets = await getTickets(clientId)
    return NextResponse.json(tickets)
  } catch {
    return NextResponse.json({ error: 'Error al obtener tickets' }, { status: 500 })
  }
}
