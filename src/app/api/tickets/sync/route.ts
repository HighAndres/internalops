import { NextRequest, NextResponse } from 'next/server'
import { syncTickets } from '@/lib/tickets/ticket-sync'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const clientSlug = body.clientSlug as string | undefined

    const result = await syncTickets(clientSlug)

    return NextResponse.json({
      success: true,
      synced: result.synced,
      errors: result.errors,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error en sincronización'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
