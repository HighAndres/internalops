# Arquitectura - Mirmibug InternalOps

## Descripción general

Mirmibug InternalOps es un sistema de control interno exclusivo para el equipo de Mirmibug. **No es visible para clientes.** Su propósito es documentar, consultar y mantener historial operativo y técnico de cada cliente atendido.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| ORM | Prisma 7 |
| Base de datos | SQLite (desarrollo) / PostgreSQL (producción recomendado) |
| Validaciones | Zod v4 |
| Iconos | lucide-react |

## Estructura de carpetas

```
src/
├── app/
│   ├── (auth)/          # Rutas de autenticación (placeholder)
│   ├── (dashboard)/     # Rutas protegidas del dashboard
│   │   ├── dashboard/   # Página principal con KPIs
│   │   ├── clientes/    # Lista y detalle de clientes
│   │   ├── historial/   # Historial global
│   │   ├── tickets-relacionados/
│   │   ├── riesgos/
│   │   ├── pendientes/
│   │   ├── inventario/
│   │   ├── documentacion/
│   │   ├── reportes/
│   │   └── configuracion/
│   └── api/             # Route Handlers (REST API interna)
├── components/
│   ├── ui/              # Componentes base reutilizables
│   └── layout/          # Shell, Sidebar, Topbar, ClientTabs
├── constants/           # Menú, roles, tipos de historial
├── lib/
│   ├── db/              # Singleton de Prisma
│   └── validations/     # Schemas Zod
├── services/            # Capa de acceso a datos (Prisma queries)
└── types/               # TypeScript interfaces
```

## Principios de diseño

- **Server Components por defecto**: las páginas son async y llaman directamente a Prisma.
- **Sin mock data en producción**: todas las páginas leen desde la base de datos real.
- **Sin autenticación compleja en MVP**: placeholder de usuario admin. La estructura está preparada para NextAuth u otro provider en la siguiente fase.
- **API separada del frontend**: las rutas `/api/*` permiten integraciones externas (webhooks).

## Separación del sistema de tickets

InternalOps **no** reemplaza el sistema de tickets externo (Freshdesk, Jira, etc.). La tabla `RelatedTicket` almacena **referencias** a tickets externos: ID, número, estado, prioridad. Estos datos se sincronizan vía webhook o manualmente.

Ver [integración de tickets](./integracion-tickets.md) para detalles.
