export type HistoryType =
  | 'INCIDENT'
  | 'MAINTENANCE'
  | 'MEETING'
  | 'DEPLOYMENT'
  | 'SUPPORT'
  | 'TRAINING'
  | 'AUDIT'
  | 'OTHER'

export interface InternalHistoryEntry {
  id: string
  clientId: string
  relatedTicketId?: string | null
  title: string
  type: HistoryType
  summary: string
  details?: string | null
  rootCause?: string | null
  actionTaken?: string | null
  result?: string | null
  impact?: string | null
  createdById?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateHistoryEntryInput {
  clientId: string
  relatedTicketId?: string
  title: string
  type: HistoryType
  summary: string
  details?: string
  rootCause?: string
  actionTaken?: string
  result?: string
  impact?: string
  createdById?: string
}
