
## Cambio requerido

Actualizar `src/lib/nocodb.ts` para usar el formato correcto de la API v2 de NocoDB.

### Problema actual
El servicio usa rutas v1 inexistentes: `/api/v1/db/data/noco/america_x101/{tableName}`

### Corrección
Cambiar todas las rutas a formato v2: `/api/v2/tables/{tableId}/records`

Table IDs:
- admin_users: `mw9w68mptm2jltt`
- plans: `mk1ucvwftlns1t0`
- resellers: `m6wex13dk8rscz5`
- reseller_accounts: `mv5wvscqqe6nirj`
- reseller_analytics: `mbchtse0ra1km57`

### Cambios técnicos en `src/lib/nocodb.ts`

1. Actualizar las funciones `nocoGet`, `nocoPost`, `nocoPatch`, `nocoDelete` para construir URLs con el formato `/api/v2/tables/{tableId}/records`
2. Actualizar el mapa `TABLES` con los IDs reales
3. Ajustar las operaciones individuales (GET by ID usa `/{recordId}` en vez de query params)
4. Adaptar la respuesta paginada al formato v2 de NocoDB (campos `list` y `pageInfo`)
