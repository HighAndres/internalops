export interface InternalDocument {
  id: string
  clientId: string
  title: string
  category: string
  content: string
  tags?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface InternalNote {
  id: string
  clientId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateDocumentInput {
  clientId: string
  title: string
  category: string
  content: string
  tags?: string
}

export interface CreateNoteInput {
  clientId: string
  title: string
  content: string
}
