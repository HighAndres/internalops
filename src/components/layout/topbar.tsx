'use client'

import { Bell, Search, LogOut } from 'lucide-react'
import { logoutAction } from '@/app/(auth)/logout/actions'

interface TopbarProps {
  title?: string
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-[#0F1115] border-b border-[#2A2A2A] flex items-center px-6 gap-4 z-20">
      {title && (
        <h1 className="text-sm font-semibold text-white mr-auto">{title}</h1>
      )}
      {!title && <div className="flex-1" />}

      <div className="relative hidden md:flex items-center">
        <Search size={14} className="absolute left-3 text-[#6B7280]" />
        <input
          type="text"
          placeholder="Buscar..."
          className="h-8 pl-8 pr-4 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-white placeholder:text-[#6B7280] outline-none focus:border-[#38D84E] transition-colors w-52"
        />
      </div>

      <button className="relative p-1.5 text-[#D1D5DB] hover:text-white transition-colors cursor-pointer">
        <Bell size={16} />
        <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#38D84E] rounded-full" />
      </button>

      <form action={logoutAction}>
        <button
          type="submit"
          title="Cerrar sesión"
          className="p-1.5 text-[#6B7280] hover:text-white transition-colors cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      </form>
    </header>
  )
}
