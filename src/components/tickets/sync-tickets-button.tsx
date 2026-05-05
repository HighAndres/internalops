'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props =
  | { mode: 'global' }
  | { mode: 'client'; clientSlug: string | null }

export function SyncTicketsButton(props: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ synced: number; errors: string[] } | null>(null)

  const clientSlug = props.mode === 'client' ? props.clientSlug : undefined
  const disabled = loading || (props.mode === 'client' && !props.clientSlug)

  async function handleSync() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/tickets/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientSlug ? { clientSlug } : {}),
      })
      const data = await res.json()
      if (res.ok) {
        setResult({ synced: data.synced, errors: data.errors ?? [] })
      } else {
        setResult({ synced: 0, errors: [data.error ?? 'Error desconocido'] })
      }
    } catch {
      setResult({ synced: 0, errors: ['Error de conexión con el sistema de tickets'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleSync}
        disabled={disabled}
      >
        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Sincronizando…' : 'Sincronizar tickets'}
      </Button>

      {props.mode === 'client' && !props.clientSlug && (
        <span className="text-xs text-yellow-500">
          Configura el slug del cliente para sincronizar
        </span>
      )}

      {result && (
        <span className={`text-xs ${result.errors.length > 0 ? 'text-yellow-400' : 'text-[#38D84E]'}`}>
          {result.errors.length === 0
            ? `${result.synced} tickets sincronizados`
            : `${result.synced} sincronizados — ${result.errors.length} errores`}
        </span>
      )}
    </div>
  )
}
