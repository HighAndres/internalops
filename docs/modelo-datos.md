# Modelo de datos - Mirmibug InternalOps

## Entidades principales

### User
Usuarios internos de Mirmibug con acceso al sistema.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | cuid | PK |
| name | string | Nombre completo |
| email | string | Email único |
| role | enum | ADMIN, MANAGER, TECHNICIAN, VIEWER |
| isActive | boolean | Estado del usuario |

### Client
Clientes atendidos por Mirmibug.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | cuid | PK |
| name | string | Nombre comercial |
| legalName | string? | Razón social |
| contactName | string? | Nombre del contacto principal |
| contactEmail | string? | Email de contacto |
| phone | string? | Teléfono |
| status | enum | ACTIVE, INACTIVE, PROSPECT, CHURNED |
| notes | string? | Notas generales |

### InternalHistoryEntry
Registro de eventos operativos por cliente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| clientId | FK | Cliente relacionado |
| relatedTicketId | string? | ID externo del ticket relacionado (referencia) |
| type | enum | INCIDENT, MAINTENANCE, MEETING, DEPLOYMENT, SUPPORT, TRAINING, AUDIT, OTHER |
| summary | string | Resumen ejecutivo |
| rootCause | string? | Causa raíz |
| actionTaken | string? | Acciones tomadas |
| result | string? | Resultado |
| impact | string? | Impacto en el cliente |

### RelatedTicket
Referencias a tickets del sistema externo. **No reemplaza** el sistema de tickets.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| clientId | FK | Cliente relacionado |
| externalTicketId | string | ID en el sistema externo |
| externalTicketNumber | string? | Número legible (#1001) |
| status | enum | Estado sincronizado |
| sourceSystem | string | Freshdesk, Jira, ClickUp, etc. |

### InternalRisk
Riesgos operativos o técnicos identificados por cliente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| severity | enum | LOW, MEDIUM, HIGH, CRITICAL |
| status | enum | OPEN, MITIGATED, ACCEPTED, CLOSED |
| recommendation | string? | Recomendación de mitigación |

### InternalPendingItem
Tareas pendientes internas por cliente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| priority | enum | LOW, MEDIUM, HIGH, URGENT |
| status | enum | OPEN, IN_PROGRESS, DONE, CANCELLED |
| dueDate | datetime? | Fecha límite |

### ClientAsset
Inventario de activos tecnológicos del cliente.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| type | enum | SERVER, WORKSTATION, LAPTOP, PRINTER, NETWORK_DEVICE, PHONE, TABLET, SOFTWARE, LICENSE, OTHER |
| status | enum | ACTIVE, INACTIVE, MAINTENANCE, RETIRED |
| serialNumber | string? | Número de serie |
| ipAddress | string? | Dirección IP |

### InternalDocument
Documentación técnica interna por cliente (procedimientos, guías, arquitecturas).

### InternalNote
Notas privadas internas. Solo visibles para el equipo de Mirmibug.

### ActivityLog
Registro de auditoría de acciones en el sistema.

## Relaciones

```
Client 1 --< InternalHistoryEntry
Client 1 --< RelatedTicket
Client 1 --< InternalRisk
Client 1 --< InternalPendingItem
Client 1 --< ClientAsset
Client 1 --< InternalDocument
Client 1 --< InternalNote
```

Todos los registros relacionados se eliminan en cascada si se elimina el cliente.
