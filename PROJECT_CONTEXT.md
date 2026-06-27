# Casino Rock Bar — Contexto completo del proyecto

Documentación técnica detallada para asistencia de IA en sesiones futuras.
URL producción: **https://casinorockbar.com**

---

## 1. Descripción general

Web oficial del **Casino Rock Bar**, restaurante y bar de rock en **Esquivias (Toledo)**. Ofrece carta digital dinámica, cartelera de eventos, formulario de reservas con doble confirmación por email, merchandising, modo pantalla para TV y más.

---

## 2. Arquitectura

```
casino/
├── frontend/          # Angular 17+ SPA
├── backend/           # FastAPI (Python)
└── docker-compose.yml # Orquestación de contenedores
```

**Stack:**
- **Frontend**: Angular 18 (standalone components), Bootstrap 5, Lucide Angular, SCSS
- **Backend**: FastAPI + Uvicorn, Pydantic, itsdangerous, httpx, python-dotenv
- **Infraestructura**: Docker Compose → nginx (frontend) + Python slim (backend)
- **Datos**: JSON files en disco (`backend/data/`), no hay base de datos

---

## 3. Frontend — Estructura de archivos

```
frontend/src/app/
├── app.ts                         # Root component — gestiona navbar/footer/modo TV
├── app.routes.ts                  # Definición de rutas
├── app.config.ts                  # ApplicationConfig (provideRouter, provideHttpClient)
│
├── core/
│   └── guards/
│       ├── blocked-route.guard.ts # Redirige a /en-construccion (páginas WIP)
│       └── valid-event.guard.ts   # Valida evento activo antes de /eventos/:id
│
├── shared/
│   ├── seo.service.ts             # SEO dinámico: title, meta, og, canonical
│   └── components/
│       ├── navbar/                # Navbar principal (RouterModule)
│       ├── footer/                # Footer
│       ├── header-mini/           # Cabecera interior (páginas de sección)
│       ├── carrusel/              # Bootstrap Carousel wrapper — recibe images[] + variant
│       ├── back-to-top/           # Botón flotante volver arriba
│       └── now-playing/
│           └── now-playing.service.ts  # Llama a /api/music/now-playing
│
└── features/
    ├── welcome/                   # Página de inicio
    ├── carta/                     # Carta del restaurante
    ├── eventos/                   # Cartelera y detalle de eventos
    ├── menus/                     # Menú del fin de semana
    ├── reserva-evento/            # Formulario de reserva de espacio/evento
    ├── merchandising/             # Catálogo de camisetas
    ├── participa/                 # Encuestas, votaciones, sorteos + Clubes
    ├── sobre-nosotros/            # Quiénes somos / Historia (bloqueadas)
    └── tv/                        # Modo pantalla de TV (/tv)
```

---

## 4. Rutas del frontend

| Ruta | Componente | Guard | Estado |
|------|-----------|-------|--------|
| `/` | → `/welcome` | — | activo |
| `/welcome` | `Welcome` | — | activo |
| `/carta` | `CartaPage` | — | activo |
| `/eventos` | `EventosPage` | — | activo |
| `/eventos/:id` | `EventoDetallePage` | `ValidEventGuard` | activo |
| `/menus` | `MenusPage` | — | activo |
| `/reserva-evento` | `ReservaEventoPage` | `BlockedRouteGuard` | bloqueado → /en-construccion |
| `/sobre-nosotros` | `SobreNosotrosPage` | `BlockedRouteGuard` | bloqueado |
| `/quienes-somos` | `QuienesSomosPage` | `BlockedRouteGuard` | bloqueado |
| `/nuestra-historia` | `NuestraHistoriaPage` | `BlockedRouteGuard` | bloqueado |
| `/participa` | `ParticipaPage` | — | activo |
| `/clubes` | `ClubesPage` | — | activo |
| `/merchandising` | `MerchandisingPage` | — | activo |
| `/tv` | `Tv` (lazy) | — | activo |
| `/en-construccion` | `EnConstruccion` (lazy) | — | activo |
| `/**` | → `/en-construccion` | — | wildcard |

**Importante:** `/welcome` y `/tv` **no muestran** navbar ni footer (app.ts los oculta según URL).
La ruta `/tv` activa la clase `pantalla-mode` en `body` y `html` (para fullscreen/TV display).

---

## 5. Páginas y componentes clave

### 5.1 Welcome (`/welcome`)
- **Archivo**: `features/welcome/pages/welcome-page/welcome-page.ts`
- Muestra el carrusel Bootstrap (`<app-carrusel>`) con imágenes del local y eventos
- Sin navbar ni footer
- Incluye el componente `<app-menu-fin-semana>` embebido (sección desplazable)
- SEO configurado para posicionamiento local (Esquivias, Illescas, Madrid Sur)
- Calcula CSS vars `--app-header-h` y `--app-footer-h` para layout dinámico
- Al navegar de vuelta a `/welcome` fuerza destrucción y recreación del carrusel

### 5.2 Carta (`/carta`)
- **Archivo**: `features/carta/pages/carta-page/carta-page.ts`
- **Servicio**: `CartaService` → `GET https://www.casinorockbar.com/api/carta` (con `Cache-Control: no-cache`)
- **Modelos**: `Seccion { id, nombre, orden, activa, platos[] }` y `Plato { id, seccion_id, nombre, precio, descripcion?, iconos[], orden, activo }`
- Muestra secciones filtradas (`activa=true`) con platos activos
- Subnav horizontal con iconos Lucide mapeados por nombre de sección:
  - Especiales → `star`, Compartir es Vivir → `handshake`, Zipotes/Sándwiches/Tostas/Perritos → `sandwich`, Hamburguesas/Molletes → `hamburger`, Ensaladas → `salad`, Postres → `cake-slice`, Batidos → `cup-soda`, Cócteles → `wine`, Cafés → `coffee`, resto → `utensils`
- Componente `<app-plato-item>` renderiza cada plato
- Componente `<app-back-to-top>` para scroll
- Secciones del menú hardcodeadas como componentes independientes (arroces, batidos, bebidas, cafes, cervezas, compartir, ensaladas, hamburguesas, helados, molletes, perritos, pizzas, postres, sandwiches, tostas, zipotes, cocteles, especiales) — **actualmente vacíos**, la data viene solo del API

### 5.3 Eventos (`/eventos` y `/eventos/:id`)
- **Servicio**: `EventosService` → `GET ${environment.apiUrl}/eventos`
- **Datos estáticos**: `features/eventos/data/eventos.data.ts` (array `EVENTOS` con ~21 eventos, IDs numéricos 0–21 y 90, 100, 101)
- **Lógica de fusión** (EventosPage): combina API + estáticos, deduplica por id, filtra `activo=true` y `visibleEn.includes('web')`, ordena: UUIDs primero, luego numéricos descendentes
- **Campo `visibleEn`**: `'web'` aparece en la web, `'tv'` aparece en la pantalla TV. Los IDs 100 y 101 son solo TV.
- **ValidEventGuard**: busca primero en estáticos → luego en API → redirige a `/en-construccion` si no existe o está inactivo
- **EventoDetallePage**: galería de imágenes con prev/next/dots, fechas formateadas, enlaces externos con validación URL
- **Lazy loading**: `EventoDetallePage` se carga bajo demanda

### 5.4 Reserva de evento (`/reserva-evento`) — BLOQUEADA
- **Archivo**: `features/reserva-evento/pages/reserva-evento-page/reserva-evento-page.ts`
- Formulario reactivo Angular con validaciones complejas:
  - Nombre (mínimo 2 chars), teléfono (regex ES), email (async domain whitelist)
  - Fecha inicio/fin + hora inicio/fin
  - Número de personas (límite variable según zona)
  - Zona: `butakaPie` (120 personas), `butakaSentado` (60), `localCompleto` (200)
  - Comentarios (máx 300 chars)
  - `botCheck` (honeypot anti-bot, campo oculto)
- **Validadores de grupo**: `validarRangoFechasHoras`, `validarCapacidad()`, `validarFechaPasada()`
- **Whitelist de emails**: gmail.com, hotmail.com, outlook.com, yahoo.es, icloud.com
- **Blacklist de emails**: tempmail.com, 10minutemail.com, mailinator.com, guerrillamail.com
- Envía a `POST /api/email/reserva` con header `x-api-key`
- **Actualmente bloqueada** por `BlockedRouteGuard`

### 5.5 TV (`/tv`)
- Lazy loaded
- Sin navbar, sin footer
- Activa `pantalla-mode` en body/html
- Carga eventos con `visibleEn: 'tv'`
- Integra el widget de "Now Playing" (música en directo desde Last.fm)

### 5.6 Merchandising (`/merchandising`)
- 13 camisetas con imagen, título, descripción y precio (10€ cada una)
- Imágenes en `https://casinorockbar.com/media/merch/1.webp` ... `13.webp`
- Modal de vista ampliada

### 5.7 Participa (`/participa`)
- Formulario básico: email + opción (Encuestas/Votaciones/Sorteos)
- Sub-ruta `/clubes`: muestra el Club Gastronómico "El Garbanzo Negro" (datos estáticos en `clubes.data.ts`)

### 5.8 Carrusel (`shared/components/carrusel`)
- Wrapper de Bootstrap 5 Carousel
- Props: `images: { src, alt }[]`, `variant: 'hero' | 'small'`
- Auto-play cada 4000ms, sin pausa al hover, loop infinito
- Destruye la instancia Bootstrap en `ngOnDestroy` (evita memory leaks)

### 5.9 NowPlaying Service
- `shared/components/now-playing/now-playing.service.ts`
- En localhost: `http://localhost:8000/api/music/now-playing`
- En producción: `/api/music/now-playing` (relativo, nginx proxea)

### 5.10 SeoService (`shared/seo.service.ts`)
- Todas las páginas llaman a `this.seo.setSeo({title, description, canonical, ogImage, robots})`
- Actualiza: title, meta description, og:title/description/url/image, twitter:*, canonical link tag

---

## 6. Backend — API Endpoints

Base URL prod: `https://casinorockbar.com/api/`
Dev: `http://localhost:8000/`

### 6.1 Emails (`/email/`)

#### `POST /email/send`
- Auth: header `x-api-key`
- Rate limit: 10s por IP, 1 min por email
- Valida formato email, sanitiza texto (html allowlist)
- Valida que la fecha en el HTML no sea pasada
- Envía email en background task
- Modelo: `EmailRequest { to_email, subject, body }`

#### `POST /email/reserva`
- Auth: `x-api-key`
- Genera token firmado con itsdangerous (`URLSafeTimedSerializer`) con datos de la reserva
- Envía email al cliente con enlace de confirmación (`/api/email/confirm?token=...`)
- El email **no se manda al bar hasta que el cliente confirme**
- Modelo: `ReservaRequest { nombre, email_cliente, telefono, fecha, hora, personas, mensaje }`

#### `GET /email/confirm?token=...`
- **Token de un solo uso** (set `TOKENS_USADOS` en memoria)
- Caduca a las 24 horas
- Si válido y no usado: envía email al bar (`casinorock888@gmail.com`) + email de confirmación al cliente
- Devuelve HTML con mensaje de éxito/error (no JSON)
- Si el token ya fue usado devuelve HTML con mensaje informativo (200)

### 6.2 Música (`/api/music/`)

#### `GET /api/music/now-playing`
- Integración con **Last.fm API** (`user.getrecenttracks`)
- **Caché en memoria**: TTL 45 segundos, backoff 120s si falla
- Lock async para evitar múltiples peticiones simultáneas
- Respuesta: `{ isPlaying, title?, artist?, album?, albumArt?, trackUrl? }`
- Env vars necesarias: `LASTFM_API_KEY`, `LASTFM_USERNAME`

### 6.3 Eventos (`/api/eventos/`)

#### `GET /api/eventos`
- Público
- Query param `?visibleEn=web` o `?visibleEn=tv` para filtrar
- Lee `backend/data/eventos.json`

#### `GET /api/eventos/{id}`
- Público

#### `POST /api/eventos`
- Auth: `x-api-key`
- Genera UUID automático
- Modelo: `EventoCreate { titulo, descripcion, fechas[], imagen[], texto, enlace, enlaces[], activo, visibleEn[] }`

#### `PUT /api/eventos/{id}`
- Auth: `x-api-key`
- Actualización parcial (solo campos no-None)

#### `DELETE /api/eventos/{id}`
- Auth: `x-api-key`
- Devuelve 204

#### `POST /api/eventos/export-ts`
- Auth: `x-api-key`
- Compatibilidad con app Android (solo cuenta y devuelve los eventos)

### 6.4 Carta (`/api/carta/`)

#### `GET /api/carta`
- Público
- `?all=true` devuelve todo incluyendo secciones/platos inactivos
- Por defecto filtra `activa=true` y `activo=true`
- Lee `backend/data/carta.json`

#### `GET /api/carta/iconos`
- Lista de iconos disponibles: actualmente solo `sinGluten`

#### `POST /api/carta/secciones` — Auth
#### `PUT /api/carta/secciones/{id}` — Auth
#### `DELETE /api/carta/secciones/{id}` — Auth (borra también sus platos)

#### `POST /api/carta/secciones/{seccion_id}/platos` — Auth
#### `PUT /api/carta/platos/{plato_id}` — Auth
#### `DELETE /api/carta/platos/{plato_id}` — Auth

### 6.5 Media (`/api/media/`)

#### `POST /api/media/upload`
- Auth: `x-api-key`
- Tipos permitidos: jpeg, png, webp, gif, avif, svg
- Extensiones: .jpg, .jpeg, .png, .webp, .gif, .avif, .svg
- Tamaño máximo: 10 MB
- Guarda en `/var/www/media/eventos/` con nombre UUID
- Devuelve `{ url: "https://casinorockbar.com/media/eventos/{filename}" }`
- Excluido del límite global de 1 MB (tiene su propio límite)

---

## 7. Seguridad (backend)

| Mecanismo | Implementación | Archivo |
|-----------|---------------|---------|
| Autenticación API | Header `x-api-key` vs env `API_KEY` | `utils/security.py`, todos los routers write |
| Rate limiting | 10s/IP, 1min/email (dict en memoria) | `utils/validators.py` |
| Sanitización texto | Strip HTML, escape `<>&` | `utils/validators.py` |
| Sanitización HTML | Allowlist (p, br, b, strong, i, em, ul, ol, li), elimina scripts, eventos JS | `utils/validators.py` |
| Límite request size | 1 MB global (excepto `/api/media/`) | `utils/security.py` |
| Headers HTTP | X-Frame-Options:DENY, nosniff, HSTS, Referrer-Policy | `utils/security.py` |
| Token email | itsdangerous URLSafeTimedSerializer, 24h, 1 uso | `routers/email_router.py` |
| Anti-bot form | Honeypot `botCheck` en frontend | `reserva-evento-page.ts` |
| Email domain | Whitelist + blacklist de dominios | `reserva-evento-page.ts` |
| CORS | Whitelist: localhost:4200, casinorockbar.com | `main.py` |

---

## 8. Persistencia de datos

Los datos se guardan en JSON planos en disco, montados como volúmenes Docker:

| Datos | Ruta en contenedor | Montado desde host |
|-------|-------------------|-------------------|
| Eventos | `/app/backend/data/eventos.json` | `./data/` |
| Carta | `/app/backend/data/carta.json` | `./data/` |
| Logs email | `/app/logs/email_log.txt` | `./logs/` |
| Imágenes media | `/var/www/media/` | `/var/www/media/` |

---

## 9. Infraestructura Docker

**`docker-compose.yml`:**
```yaml
backend:  python:3.11-slim, puerto 8000
frontend: nginx:alpine (desde frontend/Dockerfile), puerto 8080→80
red: webnet (interna)
```

**`frontend/nginx.conf`:**
- Sirve Angular SPA en `/` con `try_files $uri $uri/ /index.html`
- Proxea `/api/` → `http://backend:8000/` (name resolution por Docker network)

**`backend/Dockerfile`:** Python 3.11-slim, instala requirements, ejecuta uvicorn en modo `--no-access-log --log-level warning`

---

## 10. Variables de entorno (backend/.env)

```
SMTP_SERVER=
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
EMAIL_FROM=
API_KEY=                  # Token para operaciones de escritura
EMAIL_SECRET_KEY=         # Clave itsdangerous para tokens de reserva
BASE_URL=http://localhost:8000   # URL base para generar enlaces de confirmación
LASTFM_API_KEY=           # API key de Last.fm
LASTFM_USERNAME=          # Usuario de Last.fm para Now Playing
```

---

## 11. Environments Angular

| Env | apiUrl |
|-----|--------|
| `environment.ts` (dev) | `http://localhost:8000` |
| `environment.prod.ts` | `https://www.casinorockbar.com/api` |

**CartaService** usa URL hardcoded (`https://www.casinorockbar.com/api/carta`) en lugar de `environment.apiUrl`. El resto de servicios usa `environment.apiUrl`.

---

## 12. Guards explicados

### `BlockedRouteGuard`
- Redirige siempre a `/en-construccion`
- Aplicado a: `sobre-nosotros`, `quienes-somos`, `nuestra-historia`, `reserva-evento`
- Las rutas `participa`, `clubes`, `merchandising` tienen el guard comentado (están activas)

### `ValidEventGuard`
- Prioridad 1: Lee el `state.activo` del router navigation (cuando viene de un link `[routerLink]` con state)
- Prioridad 2: Busca en `EVENTOS` estáticos por id
- Prioridad 3: Consulta `GET /api/eventos/:id`
- Si `activo === false` o no existe → redirige a `/en-construccion`

---

## 13. Comportamiento especial por ruta

- **`/welcome`**: Sin navbar, sin footer. Muestra carrusel + menú fin de semana. Recalcula CSS vars al resize.
- **`/tv`**: Sin navbar, sin footer. Activa `pantalla-mode` en body/html. Diseñado para mostrar en una pantalla física en el bar.
- **`/en-construccion`**: Lazy loaded. Página genérica para rutas bloqueadas o errores 404.
- **`/**`** (wildcard): Redirige a `/en-construccion`.

---

## 14. Convenciones del proyecto

- Todos los componentes son **standalone** (Angular 17+)
- Archivos de componente sin sufijo (e.g. `carrusel.ts`, no `carrusel.component.ts`)
- SCSS por componente (mismo nombre, misma carpeta)
- Tests `.spec.ts` junto al componente (muchos son autogenerados/vacíos)
- No hay base de datos: **JSON en disco**
- La carta se actualiza vía API; los eventos tienen doble fuente (estáticos TS + API)
- Imágenes de media en producción: `https://casinorockbar.com/media/` y subdirectorios
- Email del bar: `casinorock888@gmail.com`
- Teléfono: `634 132 000`
