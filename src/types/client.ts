export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'CHURNED'

export interface Client {
  id: string
  name: string
  legalName?: string | null
  contactName?: string | null
  contactEmail?: string | null
  phone?: string | null
  status: ClientStatus
  notes?: string | null
  ticketsClientSlug?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ClientWithCounts extends Client {
  _count?: {
    history: number
    tickets: number
    risks: number
    pendingItems: number
    assets: number
    documents: number
    internalNotes: number
  }
}

export interface CreateClientInput {
  name: string
  legalName?: string
  contactName?: string
  contactEmail?: string
  phone?: string
  status?: ClientStatus
  notes?: string
  ticketsClientSlug?: string
}

export type UpdateClientInput = Partial<CreateClientInput>
