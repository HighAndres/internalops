import { z } from 'zod'

export const riskSchema = z.object({
  clientId: z.string().min(1),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  status: z.enum(['OPEN', 'MITIGATED', 'ACCEPTED', 'CLOSED']).default('OPEN'),
  recommendation: z.string().optional(),
})

export type RiskSchema = z.infer<typeof riskSchema>
