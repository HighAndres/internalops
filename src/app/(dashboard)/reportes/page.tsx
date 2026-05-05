import { getDashboardKpis } from '@/services/reportes/reportes.service'
import { getClientes } from '@/services/clientes/clientes.service'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'

export default async function ReportesPage() {
  const [kpis, clientes] = await Promise.all([getDashboardKpis(), getClientes()])

  const clientesActivos = clientes.filter((c) => c.status === 'ACTIVE')
  const clientesConRiesgos = clientes.filter(
    (c) => c._count && c._count.risks > 0
  )

  return (
    <DashboardShell
      heading="Reportes"
      description="Métricas y resúmenes operativos"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen general</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {[
                { label: 'Clientes activos', value: kpis.clientesActivos },
                { label: 'Total historial', value: kpis.totalHistorial },
                { label: 'Riesgos abiertos', value: kpis.riesgosAbiertos },
                { label: 'Pendientes activos', value: kpis.pendientesAbiertos },
                { label: 'Tickets relacionados', value: kpis.totalTickets },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <dt className="text-sm text-[#D1D5DB]">{item.label}</dt>
                  <dd className="text-sm font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clientes con riesgos activos</CardTitle>
          </CardHeader>
          <CardContent>
            {clientesConRiesgos.length === 0 ? (
              <p className="text-sm text-[#6B7280]">Ningún cliente con riesgos abiertos</p>
            ) : (
              <ul className="space-y-2">
                {clientesConRiesgos.map((c) => (
                  <li key={c.id} className="flex justify-between items-center">
                    <span className="text-sm text-[#D1D5DB]">{c.name}</span>
                    <span className="text-sm font-bold text-red-400">
                      {c._count?.risks} riesgo{c._count && c._count.risks !== 1 ? 's' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              {[
                { label: 'Activos', value: clientesActivos.length, color: '#38D84E' },
                {
                  label: 'Inactivos',
                  value: clientes.filter((c) => c.status === 'INACTIVE').length,
                  color: '#6B7280',
                },
                {
                  label: 'Prospectos',
                  value: clientes.filter((c) => c.status === 'PROSPECT').length,
                  color: '#3B82F6',
                },
                {
                  label: 'Perdidos',
                  value: clientes.filter((c) => c.status === 'CHURNED').length,
                  color: '#EF4444',
                },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <dt className="flex items-center gap-2 text-sm text-[#D1D5DB]">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </dt>
                  <dd className="text-sm font-bold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
