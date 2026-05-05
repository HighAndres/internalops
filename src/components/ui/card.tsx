import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`px-5 py-4 border-b border-[#2A2A2A] ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`px-5 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '', ...props }: CardProps) {
  return (
    <h3 className={`text-sm font-semibold text-white ${className}`} {...props}>
      {children}
    </h3>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: string
  color?: string
}

export function StatCard({ label, value, icon, color = '#38D84E' }: StatCardProps) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-[#D1D5DB] uppercase tracking-wider">{label}</p>
          {icon && (
            <span style={{ color }} className="opacity-80">
              {icon}
            </span>
          )}
        </div>
        <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      </div>
    </Card>
  )
}
