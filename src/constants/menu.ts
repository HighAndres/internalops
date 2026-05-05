export interface MenuItem {
  label: string
  href: string
  icon: string
  description?: string
}

export const MENU_ITEMS: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Clientes', href: '/clientes', icon: 'Users' },
  { label: 'Historial', href: '/historial', icon: 'History' },
  { label: 'Tickets relacionados', href: '/tickets-relacionados', icon: 'Ticket' },
  { label: 'Riesgos', href: '/riesgos', icon: 'AlertTriangle' },
  { label: 'Pendientes', href: '/pendientes', icon: 'Clock' },
  { label: 'Inventario', href: '/inventario', icon: 'Package' },
  { label: 'Documentación', href: '/documentacion', icon: 'FileText' },
  { label: 'Reportes', href: '/reportes', icon: 'BarChart2' },
  { label: 'Configuración', href: '/configuracion', icon: 'Settings' },
]

export const CLIENT_TABS = [
  { label: 'Resumen', href: 'resumen' },
  { label: 'Historial', href: 'historial' },
  { label: 'Tickets', href: 'tickets' },
  { label: 'Riesgos', href: 'riesgos' },
  { label: 'Pendientes', href: 'pendientes' },
  { label: 'Inventario', href: 'inventario' },
  { label: 'Documentación', href: 'documentacion' },
  { label: 'Notas', href: 'notas' },
]
