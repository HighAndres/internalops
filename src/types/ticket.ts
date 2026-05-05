export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED' | 'CLOSED'
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL'

export interface RelatedTicket {
  id: string
  clientId: string
  externalTicketId: string
  externalTicketNumber?: string | null
  title: string
  status: TicketStatus
  priority?: TicketPriority | null
  category?: string | null
  assignedTo?: string | null
  requester?: string | null
  sourceSystem: string
  openedAt?: Date | null
  closedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface WebhookTicketPayload {
  externalTicketId: string
  externalTicketNumber?: string
  clientName?: string
  clientId?: string
  title: string
  status: TicketStatus
  priority?: TicketPriority
  category?: string
  assignedTo?: string
  requester?: string
  sourceSystem?: string
  openedAt?: string
  closedAt?: string
}
