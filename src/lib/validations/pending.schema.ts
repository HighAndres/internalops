import { z } from 'zod'

export const pendingSchema = z.object({
  clientId: z.string().min(1),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED']).default('OPEN'),
  dueDate: z.string().optional(),
})

export type PendingSchema = z.infer<typeof pendingSchema>
