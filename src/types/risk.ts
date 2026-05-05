export type RiskSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type RiskStatus = 'OPEN' | 'MITIGATED' | 'ACCEPTED' | 'CLOSED'

export interface InternalRisk {
  id: string
  clientId: string
  title: string
  description: string
  severity: RiskSeverity
  status: RiskStatus
  recommendation?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface CreateRiskInput {
  clientId: string
  title: string
  description: string
  severity: RiskSeverity
  status?: RiskStatus
  recommendation?: string
}
