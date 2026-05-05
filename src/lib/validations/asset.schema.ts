import { z } from 'zod'

export const assetSchema = z.object({
  clientId: z.string().min(1),
  name: z.string().min(1, 'El nombre es requerido'),
  type: z.enum([
    'SERVER',
    'WORKSTATION',
    'LAPTOP',
    'PRINTER',
    'NETWORK_DEVICE',
    'PHONE',
    'TABLET',
    'SOFTWARE',
    'LICENSE',
    'OTHER',
  ]),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  ipAddress: z.string().optional(),
  location: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED']).default('ACTIVE'),
  notes: z.string().optional(),
})

export type AssetSchema = z.infer<typeof assetSchema>
