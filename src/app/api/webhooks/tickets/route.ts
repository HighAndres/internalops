import { NextRequest, NextResponse } from 'next/server'
import { upsertTicketFromWebhook } from '@/services/tickets/tickets.service'
import type { WebhookTicketPayload } from '@/types/ticket'

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookTicketPayload = await request.json()

    if (!payload.externalTicketId) {
      return NextResponse.json(
        { error: 'externalTicketId es requerido' },
        { status: 400 }
      )
    }

    if (!payload.title) {
      return NextResponse.json({ error: 'title es requerido' }, { status: 400 })
    }

    if (!payload.status) {
      return NextResponse.json({ error: 'status es requerido' }, { status: 400 })
    }

    if (!payload.clientId && !payload.clientName) {
      return NextResponse.json(
        { error: 'Se requiere clientId o clientName' },
        { status: 400 }
      )
    }

    const ticket = await upsertTicketFromWebhook(payload)
    return NextResponse.json({ success: true, ticket })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error procesando webhook'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
