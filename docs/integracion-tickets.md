# Integración con sistema de tickets

## Principio fundamental

Mirmibug InternalOps **no reemplaza** el sistema de tickets externo. El sistema externo (Freshdesk, Jira, ClickUp, etc.) sigue siendo la fuente de verdad para el ciclo de vida de los tickets.

InternalOps guarda **referencias** a esos tickets para:
- Tener contexto operativo junto al historial del cliente
- Relacionar incidentes con entradas de historial interno
- Generar reportes cruzados

## Endpoints de integración

### Webhook de tickets

`POST /api/webhooks/tickets`

Recibe un payload cuando un ticket cambia en el sistema externo.

**Payload esperado:**
```json
{
  "externalTicketId": "EXT-1001",
  "externalTicketNumber": "#1001",
  "clientName": "FRANSLUX",
  "title": "Error en módulo de facturación",
  "status": "RESOLVED",
  "priority": "HIGH",
  "category": "Bug",
  "assignedTo": "Técnico A",
  "requester": "Franco Suárez",
  "sourceSystem": "Freshdesk",
  "openedAt": "2026-04-10T08:00:00Z",
  "closedAt": "2026-04-12T14:30:00Z"
}
```

- Si `clientName` coincide con un cliente existente, se asocia automáticamente.
- Si no existe, se crea el cliente con `status: ACTIVE`.
- Si se puede, preferir enviar `clientId` directamente para evitar duplicados por nombre.

### Sync manual

`POST /api/tickets/sync`

Mismo formato que el webhook. Útil para sincronización batch o pruebas.

## Configuración en sistemas externos

### Freshdesk
1. Ir a Admin > Automation > Webhooks
2. Crear nuevo webhook apuntando a `https://tu-dominio/api/webhooks/tickets`
3. Mapear campos en el JSON template

### Jira
1. Usar Jira Automation (o Zapier)
2. Trigger: Issue updated / created
3. Acción: POST al webhook con el payload mapeado

## Campos de ticket soportados

| Campo | Tipo | Requerido |
|-------|------|-----------|
| externalTicketId | string | Sí |
| externalTicketNumber | string | No |
| clientName o clientId | string | Uno de los dos |
| title | string | Sí |
| status | enum | Sí |
| priority | enum | No |
| category | string | No |
| assignedTo | string | No |
| requester | string | No |
| sourceSystem | string | No |
| openedAt | ISO date | No |
| closedAt | ISO date | No |

## Valores de status
`OPEN`, `IN_PROGRESS`, `PENDING`, `RESOLVED`, `CLOSED`

## Valores de priority
`LOW`, `MEDIUM`, `HIGH`, `URGENT`, `CRITICAL`
