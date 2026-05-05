export type PendingPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type PendingStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'

export interface InternalPendingItem {
  id: string
  clientId: string
  title: string
  description?: string | null
  priority: PendingPriority
  status: PendingStatus
  dueDate?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface CreatePendingItemInput {
  clientId: string
  title: string
  description?: string
  priority?: PendingPriority
  status?: PendingStatus
  dueDate?: string
}
