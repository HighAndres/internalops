import { z } from 'zod'

export const clientSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  legalName: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PROSPECT', 'CHURNED']).default('ACTIVE'),
  notes: z.string().optional(),
  ticketsClientSlug: z.string().optional(),
})

export type ClientSchema = z.infer<typeof clientSchema>
