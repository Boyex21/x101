
## CRUD de Cuentas de Resellers

Implementar la gestión completa de cuentas (clientes de cada reseller) en el panel admin, siguiendo el mismo patrón ya usado en `ResellersPage.tsx`.

### Cambios

**1. `src/pages/admin/AccountsPage.tsx`** — Reescribir con CRUD completo:
- Listar cuentas desde NocoDB (`mv5wvscqqe6nirj`) con tarjetas que muestren nombre del cliente, tipo de cuenta, status y reseller asociado
- Botón "Nueva Cuenta" que abre un dialog con formulario: reseller (selector), client_name, client_email, client_phone, account_type (single/duo/2years/relay), status (active/pending/expired), start_date, end_date, notes
- Editar y eliminar cuentas existentes con los mismos dialogs de confirmación usados en Resellers
- Cargar la lista de resellers para el selector del formulario
- Badge de color según status (active=verde, pending=amarillo, expired=rojo)

**2. `src/lib/nocodb.ts`** — Ya tiene `getAccounts`, `createAccount`, `updateAccount`. Agregar:
- `deleteAccount(id)` — falta en el servicio actual

### Detalles técnicos
- Usa los mismos componentes UI (Dialog, AlertDialog, Badge, Button, Input, Select) que ResellersPage
- Campos del formulario mapeados a la tabla: reseller_id, client_name, client_email, client_phone, account_type, status, start_date, end_date, notes
- Filtro opcional por reseller usando query param `where`
