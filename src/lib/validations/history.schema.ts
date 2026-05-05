import { z } from 'zod'

export const historySchema = z.object({
  clientId: z.string().min(1),
  relatedTicketId: z.string().optional(),
  title: z.string().min(1, 'El título es requerido'),
  type: z.enum([
    'INCIDENT',
    'MAINTENANCE',
    'MEETING',
    'DEPLOYMENT',
    'SUPPORT',
    'TRAINING',
    'AUDIT',
    'OTHER',
  ]),
  summary: z.string().min(1, 'El resumen es requerido'),
  details: z.string().optional(),
  rootCause: z.string().optional(),
  actionTaken: z.string().optional(),
  result: z.string().optional(),
  impact: z.string().optional(),
})

export type HistorySchema = z.infer<typeof historySchema>
