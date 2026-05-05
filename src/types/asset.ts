export type AssetType =
  | 'SERVER'
  | 'WORKSTATION'
  | 'LAPTOP'
  | 'PRINTER'
  | 'NETWORK_DEVICE'
  | 'PHONE'
  | 'TABLET'
  | 'SOFTWARE'
  | 'LICENSE'
  | 'OTHER'

export type AssetStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'RETIRED'

export interface ClientAsset {
  id: string
  clientId: string
  name: string
  type: AssetType
  brand?: string | null
  model?: string | null
  serialNumber?: string | null
  ipAddress?: string | null
  location?: string | null
  assignedTo?: string | null
  status: AssetStatus
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateAssetInput {
  clientId: string
  name: string
  type: AssetType
  brand?: string
  model?: string
  serialNumber?: string
  ipAddress?: string
  location?: string
  assignedTo?: string
  status?: AssetStatus
  notes?: string
}
