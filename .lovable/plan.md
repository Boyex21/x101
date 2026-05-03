
# Mini SaaS — Plan Completo

## Resumen

Crear la base de datos en PostgreSQL puro (script SQL), conectarla a NocoDB para obtener la API REST, y construir el panel admin directamente en esta app React con login semi-oculto en el footer.

---

## Fase 1: Script SQL para PostgreSQL

Te entregaré un script SQL listo para ejecutar en tu PostgreSQL que crea:

### Tablas

**`plans`** — Los 3 planes disponibles para resellers
- `id`, `name`, `monthly_price`, `installation_fee`, `description`, `is_active`
- Datos iniciales: Plan 25 ($25/mes, $90 instalación), Plan 40 ($40/mes, $90 instalación), Socio América ($0/mes, $0 instalación)

**`resellers`** — Configuración de cada reseller
- `id`, `slug`, `business_name`, `whatsapp_number`, `logo_url`
- Colores de marca: `color_primary`, `color_secondary`, `color_accent`
- Precios personalizados: `price_single`, `price_2years`, `price_duo`, `price_relay`, `renewal_price`
- `plan_id` (FK a plans), `is_active`, `created_at`, `updated_at`

**`reseller_accounts`** — Cuentas/clientes de cada reseller
- `id`, `reseller_id` (FK), `client_name`, `client_email`, `client_phone`
- `account_type`, `status` (active/suspended/expired), `start_date`, `end_date`
- `created_at`, `updated_at`

**`reseller_analytics`** — Eventos de interacción
- `id`, `reseller_id` (FK), `event_type` (page_view, form_open, wa_click, form_submit)
- `metadata` (JSONB para datos extra como país, ciudad, device)
- `created_at`

**`admin_users`** — Usuarios del panel admin
- `id`, `email`, `password_hash`, `name`, `role` (admin/viewer), `is_active`, `created_at`

### Entregable
Un archivo SQL completo con CREATE TABLE, índices, constraints y INSERT de datos iniciales (planes + un admin de prueba).

---

## Fase 2: Integración con NocoDB

Una vez que conectes la DB a NocoDB y me pases el API Token:
- Crear un servicio/lib (`src/lib/nocodb.ts`) que encapsule las llamadas REST a NocoDB
- Guardar el API Token como secret del proyecto
- Funciones para CRUD de resellers, accounts, analytics y planes

---

## Fase 3: Frontend del Panel Admin

### Login semi-oculto en el footer
- Agregar un enlace discreto en el footer de la landing (ej: texto pequeño "Panel" o un icono sutil)
- Ruta `/admin/login` con formulario email + contraseña
- Autenticación contra la tabla `admin_users` vía NocoDB API
- Sesión almacenada en estado local (React context + localStorage con token)

### Panel Admin (`/admin`)
Sin header ni menú en la landing — el panel admin tiene su propio layout con sidebar/tabs:

**Dashboard principal**
- Resumen: total resellers, cuentas activas, eventos del día
- Gráficas de interacciones (page_views, form_opens, wa_clicks) por periodo

**Gestión de Resellers**
- Lista con búsqueda y filtros
- Crear/editar reseller: datos, colores, precios, asignar plan
- Ver cuentas asociadas y estadísticas individuales

**Gestión de Planes**
- Ver los 3 planes con sus parámetros
- Editar precios y configuración básica

**Estadísticas**
- Analytics por reseller: visitas, interacciones con formularios, clicks a WhatsApp
- Filtros por fecha, reseller, tipo de evento
- Datos de geolocalización (país/región del visitante)

**Gestión de Cuentas**
- Lista de cuentas por reseller
- Estado, fechas, tipo de cuenta

### Diseño mobile-first
- Layout responsivo optimizado para móvil (razón principal de no usar NocoDB directamente)
- Navegación por tabs en mobile, sidebar en desktop

---

## Fase 4: Landing dinámica (futuro)

Una vez todo funcione, la landing cargará configuración del reseller según el slug en la URL.

---

## Orden de implementación

1. **Te entrego el script SQL** — lo ejecutas en tu PostgreSQL
2. **Conectas a NocoDB** — me pasas Base URL + API Token
3. **Construyo el login + panel admin** en React
4. **Conectamos analytics** desde la landing existente

---

## Pregunta pendiente

Para el login: la autenticación se hará directamente contra NocoDB API (consultando la tabla `admin_users`). El hash de contraseñas se manejará con bcrypt en una Edge Function para no exponer lógica de auth en el frontend. ¿Te parece bien este approach o prefieres otro método?
