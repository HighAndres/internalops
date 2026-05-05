'use client'

import { useState } from 'react'
import { Link2, Check, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  clientId: string
  currentSlug: string | null
}

export function ClientSlugConfig({ clientId, currentSlug }: Props) {
  const [editing, setEditing] = useState(false)
  const [slug, setSlug] = useState(currentSlug ?? '')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/clientes/${clientId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketsClientSlug: slug || null }),
      })
      if (!res.ok) throw new Error('Error al guardar')
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      setError('No se pudo guardar')
    } finally {
      setLoading(false)
    }
  }

  if (!editing) {
    return (
      <div className="flex items-center gap-2">
        <Link2 size={12} className="text-[#6B7280]" />
        {currentSlug || slug ? (
          <span className="text-xs font-mono text-[#38D84E]">{slug || currentSlug}</span>
        ) : (
          <span className="text-xs text-[#6B7280]">Sin configurar</span>
        )}
        {saved && <Check size={12} className="text-[#38D84E]" />}
        <button
          onClick={() => setEditing(true)}
          className="text-[#6B7280] hover:text-white transition-colors ml-1"
        >
          <Pencil size={11} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link2 size={12} className="text-[#6B7280]" />
      <input
        autoFocus
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="ej: franslux"
        className="bg-[#111] border border-[#3A3A3A] rounded px-2 py-0.5 text-xs font-mono text-white placeholder-[#4B5563] focus:outline-none focus:border-[#38D84E] w-40"
      />
      <Button size="sm" onClick={handleSave} disabled={loading}>
        {loading ? '…' : 'Guardar'}
      </Button>
      <button
        onClick={() => { setEditing(false); setSlug(currentSlug ?? '') }}
        className="text-xs text-[#6B7280] hover:text-white"
      >
        Cancelar
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
