import { ReactNode } from 'react'

interface DashboardShellProps {
  children: ReactNode
  heading?: string
  description?: string
  actions?: ReactNode
}

export function DashboardShell({
  children,
  heading,
  description,
  actions,
}: DashboardShellProps) {
  return (
    <div className="flex flex-col gap-6">
      {(heading || actions) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {heading && (
              <h2 className="text-xl font-bold text-white">{heading}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-[#D1D5DB]">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
