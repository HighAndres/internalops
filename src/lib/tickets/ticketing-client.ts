export interface RemoteTicket {
  id: string
  folio: string
  title: string
  description: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
  requester: { id: string; name: string; email: string }
  assignee: { id: string; name: string; email: string } | null
  category: { id: string; name: string }
  subcategory: { id: string; name: string } | null
  client: { id: string; name: string; slug: string }
  comments: Array<{
    id: string
    content: string
    createdAt: string
    author: { name: string }
  }>
  activities: Array<{
    id: string
    type: string
    field: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: string
    actor: { name: string }
  }>
}

export interface TicketsApiResponse {
  tickets: RemoteTicket[]
  count: number
  syncedAt: string
}

export async function fetchTicketsFromSystem(params: {
  clientSlug?: string
  since?: string
}): Promise<TicketsApiResponse> {
  const baseUrl = process.env.TICKETS_API_URL
  if (!baseUrl) throw new Error('TICKETS_API_URL no configurado')

  const apiKey = process.env.INTERNAL_API_KEY
  if (!apiKey) throw new Error('INTERNAL_API_KEY no configurado')

  const url = new URL('/api/internal/tickets', baseUrl)
  if (params.clientSlug) url.searchParams.set('clientSlug', params.clientSlug)
  if (params.since) url.searchParams.set('since', params.since)

  const res = await fetch(url.toString(), {
    headers: { 'x-internal-api-key': apiKey },
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Error del sistema de tickets: ${res.status} — ${body}`)
  }

  return res.json()
}
