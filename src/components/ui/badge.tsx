import { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'text-[#38D84E] bg-[#38D84E]/10 border-[#38D84E]/20',
  success: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  warning: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  danger: 'text-red-400 bg-red-400/10 border-red-400/20',
  info: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  neutral: 'text-[#D1D5DB] bg-[#D1D5DB]/10 border-[#D1D5DB]/20',
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export function statusToBadgeVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    ACTIVE: 'success',
    OPEN: 'danger',
    IN_PROGRESS: 'info',
    PENDING: 'warning',
    RESOLVED: 'success',
    CLOSED: 'neutral',
    LOW: 'info',
    MEDIUM: 'warning',
    HIGH: 'danger',
    URGENT: 'danger',
    CRITICAL: 'danger',
    MITIGATED: 'success',
    ACCEPTED: 'warning',
    DONE: 'success',
    CANCELLED: 'neutral',
    INACTIVE: 'neutral',
    PROSPECT: 'info',
    CHURNED: 'danger',
    RETIRED: 'neutral',
    MAINTENANCE: 'warning',
  }
  return map[status] ?? 'neutral'
}
