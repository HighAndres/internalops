'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  History,
  Ticket,
  AlertTriangle,
  Clock,
  Package,
  FileText,
  BarChart2,
  Settings,
} from 'lucide-react'
import { MENU_ITEMS } from '@/constants/menu'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard,
  Users,
  History,
  Ticket,
  AlertTriangle,
  Clock,
  Package,
  FileText,
  BarChart2,
  Settings,
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#0F1115] border-r border-[#2A2A2A] flex flex-col z-30">
      <div className="flex items-center gap-2 px-5 h-14 border-b border-[#2A2A2A] shrink-0">
        <span className="text-[#38D84E] font-bold text-lg tracking-tight">Mirmibug</span>
        <span className="text-[#D1D5DB] text-xs font-medium mt-0.5 opacity-60">InternalOps</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {MENU_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition-colors duration-150',
                isActive
                  ? 'bg-[#38D84E]/10 text-[#38D84E]'
                  : 'text-[#D1D5DB] hover:bg-[#1A1A1A] hover:text-white',
              ].join(' ')}
            >
              {Icon && <Icon size={16} />}
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-3 border-t border-[#2A2A2A] shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#38D84E]/20 flex items-center justify-center">
            <span className="text-[#38D84E] text-xs font-bold">A</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">Admin</p>
            <p className="text-[10px] text-[#D1D5DB] truncate">admin@mirmibug.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
