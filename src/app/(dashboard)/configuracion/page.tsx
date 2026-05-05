import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ConfiguracionPage() {
  return (
    <DashboardShell
      heading="Configuración"
      description="Administración del sistema InternalOps"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información del sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {[
                { label: 'Versión', value: '1.0.0-MVP' },
                { label: 'Sistema', value: 'Mirmibug InternalOps' },
                { label: 'Base de datos', value: 'SQLite (desarrollo)' },
                { label: 'Framework', value: 'Next.js 16 + Prisma 7' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <dt className="text-sm text-[#D1D5DB]">{item.label}</dt>
                  <dd className="text-sm font-medium text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integraciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Webhook de tickets', status: 'Activo', endpoint: 'POST /api/webhooks/tickets', ok: true },
                { name: 'Sync de tickets', status: 'Activo', endpoint: 'POST /api/tickets/sync', ok: true },
                { name: 'Sistema de tickets externo', status: 'Pendiente configuración', endpoint: '', ok: false },
              ].map((item) => (
                <div key={item.name} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    {item.endpoint && (
                      <p className="text-xs font-mono text-[#6B7280] mt-0.5">{item.endpoint}</p>
                    )}
                  </div>
                  <Badge variant={item.ok ? 'success' : 'warning'}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usuario activo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#38D84E]/20 flex items-center justify-center">
                <span className="text-[#38D84E] font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin Mirmibug</p>
                <p className="text-xs text-[#D1D5DB]">admin@mirmibug.com</p>
                <Badge variant="default" className="mt-1">Administrador</Badge>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] mt-4">
              La autenticación completa está preparada para implementarse en la siguiente fase.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
