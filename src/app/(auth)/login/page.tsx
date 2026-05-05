'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

export default function LoginPage() {
  const [error, action, pending] = useActionState(loginAction, null)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#38D84E] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-lg">Mirmibug</span>
          </div>
          <h1 className="text-2xl font-bold text-white">InternalOps</h1>
          <p className="text-[#6B7280] text-sm mt-1">Acceso interno del equipo</p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#D1D5DB] mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@mirmibug.com"
              className="w-full h-10 px-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder:text-[#4B5563] text-sm outline-none focus:border-[#38D84E] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#D1D5DB] mb-1.5">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full h-10 px-3 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder:text-[#4B5563] text-sm outline-none focus:border-[#38D84E] transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full h-10 bg-[#38D84E] hover:bg-[#2EC443] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm rounded-lg transition-colors"
          >
            {pending ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
