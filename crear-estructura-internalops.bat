@echo off
echo Creando estructura Mirmibug InternalOps...

mkdir "src\app\(auth)\login" 2>nul

mkdir "src\app\(dashboard)\dashboard" 2>nul
mkdir "src\app\(dashboard)\clientes" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\resumen" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\historial" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\tickets" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\riesgos" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\pendientes" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\inventario" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\documentacion" 2>nul
mkdir "src\app\(dashboard)\clientes\[clientId]\notas" 2>nul

mkdir "src\app\(dashboard)\historial" 2>nul
mkdir "src\app\(dashboard)\tickets-relacionados" 2>nul
mkdir "src\app\(dashboard)\riesgos" 2>nul
mkdir "src\app\(dashboard)\pendientes" 2>nul
mkdir "src\app\(dashboard)\inventario" 2>nul
mkdir "src\app\(dashboard)\documentacion" 2>nul
mkdir "src\app\(dashboard)\reportes" 2>nul
mkdir "src\app\(dashboard)\configuracion" 2>nul
mkdir "src\app\(dashboard)\configuracion\usuarios" 2>nul
mkdir "src\app\(dashboard)\configuracion\roles" 2>nul
mkdir "src\app\(dashboard)\configuracion\integraciones" 2>nul

mkdir "src\app\api\clientes" 2>nul
mkdir "src\app\api\historial" 2>nul
mkdir "src\app\api\pendientes" 2>nul
mkdir "src\app\api\riesgos" 2>nul
mkdir "src\app\api\inventario" 2>nul
mkdir "src\app\api\documentacion" 2>nul
mkdir "src\app\api\tickets" 2>nul
mkdir "src\app\api\tickets\sync" 2>nul
mkdir "src\app\api\webhooks\tickets" 2>nul
mkdir "src\app\api\reportes" 2>nul

mkdir "src\components\layout" 2>nul
mkdir "src\components\ui" 2>nul
mkdir "src\components\forms" 2>nul
mkdir "src\components\clientes" 2>nul
mkdir "src\components\historial" 2>nul
mkdir "src\components\tickets" 2>nul
mkdir "src\components\riesgos" 2>nul
mkdir "src\components\pendientes" 2>nul
mkdir "src\components\inventario" 2>nul
mkdir "src\components\documentacion" 2>nul
mkdir "src\components\reportes" 2>nul

mkdir "src\lib\auth" 2>nul
mkdir "src\lib\db" 2>nul
mkdir "src\lib\tickets" 2>nul
mkdir "src\lib\validations" 2>nul
mkdir "src\lib\permissions" 2>nul

mkdir "src\services\tickets" 2>nul
mkdir "src\services\clientes" 2>nul
mkdir "src\services\historial" 2>nul
mkdir "src\services\reportes" 2>nul

mkdir "src\types" 2>nul
mkdir "src\constants" 2>nul
mkdir "src\hooks" 2>nul

mkdir "prisma\migrations" 2>nul
mkdir "scripts" 2>nul
mkdir "docs" 2>nul
mkdir "public\logos" 2>nul
mkdir "public\images" 2>nul
mkdir "public\icons" 2>nul

echo.>"src\app\(auth)\login\page.tsx"

echo.>"src\app\(dashboard)\layout.tsx"
echo.>"src\app\(dashboard)\dashboard\page.tsx"

echo.>"src\app\(dashboard)\clientes\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\layout.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\resumen\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\historial\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\tickets\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\riesgos\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\pendientes\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\inventario\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\documentacion\page.tsx"
echo.>"src\app\(dashboard)\clientes\[clientId]\notas\page.tsx"

echo.>"src\app\(dashboard)\historial\page.tsx"
echo.>"src\app\(dashboard)\tickets-relacionados\page.tsx"
echo.>"src\app\(dashboard)\riesgos\page.tsx"
echo.>"src\app\(dashboard)\pendientes\page.tsx"
echo.>"src\app\(dashboard)\inventario\page.tsx"
echo.>"src\app\(dashboard)\documentacion\page.tsx"
echo.>"src\app\(dashboard)\reportes\page.tsx"
echo.>"src\app\(dashboard)\configuracion\page.tsx"
echo.>"src\app\(dashboard)\configuracion\usuarios\page.tsx"
echo.>"src\app\(dashboard)\configuracion\roles\page.tsx"
echo.>"src\app\(dashboard)\configuracion\integraciones\page.tsx"

echo.>"src\app\api\clientes\route.ts"
echo.>"src\app\api\historial\route.ts"
echo.>"src\app\api\pendientes\route.ts"
echo.>"src\app\api\riesgos\route.ts"
echo.>"src\app\api\inventario\route.ts"
echo.>"src\app\api\documentacion\route.ts"
echo.>"src\app\api\tickets\route.ts"
echo.>"src\app\api\tickets\sync\route.ts"
echo.>"src\app\api\webhooks\tickets\route.ts"
echo.>"src\app\api\reportes\route.ts"

echo.>"src\components\layout\sidebar.tsx"
echo.>"src\components\layout\topbar.tsx"
echo.>"src\components\layout\dashboard-shell.tsx"
echo.>"src\components\layout\client-tabs.tsx"

echo.>"src\components\ui\button.tsx"
echo.>"src\components\ui\card.tsx"
echo.>"src\components\ui\input.tsx"
echo.>"src\components\ui\textarea.tsx"
echo.>"src\components\ui\badge.tsx"
echo.>"src\components\ui\table.tsx"
echo.>"src\components\ui\modal.tsx"

echo.>"src\components\clientes\client-list.tsx"
echo.>"src\components\clientes\client-summary.tsx"
echo.>"src\components\historial\history-list.tsx"
echo.>"src\components\historial\history-form.tsx"
echo.>"src\components\historial\history-timeline.tsx"
echo.>"src\components\tickets\related-ticket-list.tsx"
echo.>"src\components\riesgos\risk-list.tsx"
echo.>"src\components\riesgos\risk-form.tsx"
echo.>"src\components\pendientes\pending-list.tsx"
echo.>"src\components\pendientes\pending-form.tsx"
echo.>"src\components\inventario\asset-list.tsx"
echo.>"src\components\inventario\asset-form.tsx"
echo.>"src\components\documentacion\document-list.tsx"
echo.>"src\components\documentacion\document-editor.tsx"
echo.>"src\components\reportes\report-summary.tsx"

echo.>"src\lib\db\prisma.ts"
echo.>"src\lib\auth\auth.ts"
echo.>"src\lib\permissions\roles.ts"
echo.>"src\lib\tickets\ticketing-client.ts"
echo.>"src\lib\tickets\ticket-sync.ts"

echo.>"src\lib\validations\client.schema.ts"
echo.>"src\lib\validations\history.schema.ts"
echo.>"src\lib\validations\risk.schema.ts"
echo.>"src\lib\validations\pending.schema.ts"
echo.>"src\lib\validations\asset.schema.ts"

echo.>"src\services\tickets\tickets.service.ts"
echo.>"src\services\clientes\clientes.service.ts"
echo.>"src\services\historial\historial.service.ts"
echo.>"src\services\reportes\reportes.service.ts"

echo.>"src\types\client.ts"
echo.>"src\types\history.ts"
echo.>"src\types\ticket.ts"
echo.>"src\types\risk.ts"
echo.>"src\types\pending.ts"
echo.>"src\types\asset.ts"
echo.>"src\types\document.ts"

echo.>"src\constants\menu.ts"
echo.>"src\constants\roles.ts"
echo.>"src\constants\history-types.ts"

echo.>"src\hooks\use-client.ts"
echo.>"src\hooks\use-history.ts"

echo.>"prisma\schema.prisma"
echo.>"prisma\seed.ts"

echo.>"scripts\sync-tickets.ts"
echo.>"scripts\create-admin.ts"

echo.>"docs\arquitectura.md"
echo.>"docs\integracion-tickets.md"
echo.>"docs\modelo-datos.md"

echo.>".env.example"

echo.
echo Estructura creada correctamente.
echo Ahora ejecuta:
echo tree src /F
