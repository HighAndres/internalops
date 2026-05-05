import { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getClienteById } from '@/services/clientes/clientes.service'
import { ClientTabs } from '@/components/layout/client-tabs'
import { Badge, statusToBadgeVariant } from '@/components/ui/badge'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  PROSPECT: 'Prospecto',
  CHURNED: 'Perdido',
}

export default async function ClienteLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ clientId: string }>
}) {
  const { clientId } = await params
  const cliente = await getClienteById(clientId)

  if (!cliente) notFound()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link
          href="/clientes"
          className="inline-flex items-center gap-1 text-xs text-[#D1D5DB] hover:text-white mb-3 transition-colors"
        >
          <ChevronLeft size={14} />
          Clientes
        </Link>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">{cliente.name}</h2>
          <Badge variant={statusToBadgeVariant(cliente.status)}>
            {STATUS_LABELS[cliente.status] ?? cliente.status}
          </Badge>
        </div>
        {cliente.contactName && (
          <p className="text-xs text-[#D1D5DB] mt-0.5">
            {cliente.contactName}
            {cliente.contactEmail && ` · ${cliente.contactEmail}`}
          </p>
        )}
      </div>
      <ClientTabs clientId={clientId} />
      <div>{children}</div>
    </div>
  )
}
