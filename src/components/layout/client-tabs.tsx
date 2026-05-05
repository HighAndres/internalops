'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CLIENT_TABS } from '@/constants/menu'

interface ClientTabsProps {
  clientId: string
}

export function ClientTabs({ clientId }: ClientTabsProps) {
  const pathname = usePathname()
  const base = `/clientes/${clientId}`

  return (
    <nav className="flex gap-1 border-b border-[#2A2A2A] overflow-x-auto">
      {CLIENT_TABS.map((tab) => {
        const href = `${base}/${tab.href}`
        const isActive = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link
            key={tab.href}
            href={href}
            className={[
              'px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors duration-150',
              isActive
                ? 'border-[#38D84E] text-[#38D84E]'
                : 'border-transparent text-[#D1D5DB] hover:text-white hover:border-[#2A2A2A]',
            ].join(' ')}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
