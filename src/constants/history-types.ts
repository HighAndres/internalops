export type HistoryType =
  | 'INCIDENT'
  | 'MAINTENANCE'
  | 'MEETING'
  | 'DEPLOYMENT'
  | 'SUPPORT'
  | 'TRAINING'
  | 'AUDIT'
  | 'OTHER'

export const HISTORY_TYPE_LABELS: Record<HistoryType, string> = {
  INCIDENT: 'Incidente',
  MAINTENANCE: 'Mantenimiento',
  MEETING: 'Reunión',
  DEPLOYMENT: 'Despliegue',
  SUPPORT: 'Soporte',
  TRAINING: 'Capacitación',
  AUDIT: 'Auditoría',
  OTHER: 'Otro',
}

export const HISTORY_TYPE_COLORS: Record<HistoryType, string> = {
  INCIDENT: 'text-red-400 bg-red-400/10',
  MAINTENANCE: 'text-yellow-400 bg-yellow-400/10',
  MEETING: 'text-blue-400 bg-blue-400/10',
  DEPLOYMENT: 'text-purple-400 bg-purple-400/10',
  SUPPORT: 'text-orange-400 bg-orange-400/10',
  TRAINING: 'text-cyan-400 bg-cyan-400/10',
  AUDIT: 'text-pink-400 bg-pink-400/10',
  OTHER: 'text-gray-400 bg-gray-400/10',
}
