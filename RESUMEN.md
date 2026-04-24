# RESUMEN DEL PROYECTO: Casino Rock Bar

## 1. Estructura de carpetas

```
casino/
├── backend/                          # API Python/FastAPI
│   ├── config/
│   │   └── settings.py               # Variables de entorno y configuración
│   ├── models/
│   │   ├── email_models.py           # Modelos Pydantic para emails
│   │   └── reserva_models.py         # Modelos Pydantic para reservas
│   ├── routers/
│   │   ├── email_router.py           # Endpoints de email y reservas
│   │   └── music_router.py           # Endpoint now-playing (Last.fm)
│   ├── services/
│   │   ├── email_service.py          # Lógica de envío SMTP
│   │   ├── lastfm_service.py         # Integración con API de Last.fm
│   │   └── now_playing_cache.py      # Caché en memoria (TTL 45s)
│   ├── utils/
│   │   ├── security.py               # Cabeceras de seguridad y límite de tamaño
│   │   └── validators.py             # Rate limiting, sanitización HTML, validación fechas
│   ├── .env                          # Credenciales SMTP, API keys (NO en git)
│   ├── Dockerfile
│   ├── main.py                       # Punto de entrada FastAPI + CORS
│   └── requirements.txt
│
├── frontend/                         # SPA Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── guards/
│   │   │   │   │   ├── blocked-route.guard.ts   # Bloquea rutas deshabilitadas
│   │   │   │   │   └── valid-event.guard.ts     # Valida que el evento exista
│   │   │   │   └── services/
│   │   │   │       └── maps.service.ts
│   │   │   ├── features/
│   │   │   │   ├── carta/
│   │   │   │   │   ├── components/              # Un componente por categoría
│   │   │   │   │   │   ├── arroces/
│   │   │   │   │   │   ├── batidos/
│   │   │   │   │   │   ├── bebidas/
│   │   │   │   │   │   ├── cafes/
│   │   │   │   │   │   ├── cervezas/
│   │   │   │   │   │   ├── compartir/
│   │   │   │   │   │   ├── ensaladas/
│   │   │   │   │   │   ├── hamburguesas/
│   │   │   │   │   │   ├── helados/
│   │   │   │   │   │   ├── molletes/
│   │   │   │   │   │   ├── pizzas/
│   │   │   │   │   │   ├── plato-item/          # Componente reutilizable
│   │   │   │   │   │   ├── postres/
│   │   │   │   │   │   ├── sandwiches/
│   │   │   │   │   │   └── zipotes/
│   │   │   │   │   └── pages/carta-page/
│   │   │   │   ├── eventos/
│   │   │   │   │   ├── components/evento-item/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   └── eventos.data.ts      # ★ Fuente de datos de eventos
│   │   │   │   │   └── pages/
│   │   │   │   │       ├── evento-detalle-page/
│   │   │   │   │       └── eventos-page/
│   │   │   │   ├── menus/
│   │   │   │   │   └── pages/
│   │   │   │   │       ├── menu-fin-semana/
│   │   │   │   │       └── menus-page/
│   │   │   │   ├── merchandising/
│   │   │   │   ├── participa/
│   │   │   │   │   └── clubes/
│   │   │   │   │       └── data/
│   │   │   │   │           └── clubes.data.ts   # Fuente de datos de clubes
│   │   │   │   ├── reserva-evento/
│   │   │   │   ├── sobre-nosotros/
│   │   │   │   ├── tv/                          # Modo pantalla TV
│   │   │   │   └── welcome/
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   ├── carrusel/
│   │   │   │   │   ├── footer/
│   │   │   │   │   ├── navbar/
│   │   │   │   │   └── now-playing/             # Widget canción en curso
│   │   │   │   ├── now-playing.service.ts
│   │   │   │   └── seo.service.ts
│   │   │   ├── app.routes.ts                    # Rutas lazy-load
│   │   │   └── app.ts
│   │   ├── assets/fonts/                        # Barrio, Bebas Neue, Rubik...
│   │   └── styles/themes.scss
│   ├── Dockerfile
│   ├── angular.json
│   ├── nginx.conf                               # Proxy /api → backend, SPA fallback
│   └── package.json
│
├── docker-compose.yml                           # Orquestación completa
└── RESUMEN.md                                   # Este archivo
```

---

## 2. Tecnologías y frameworks

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend framework | FastAPI | 0.119.0 |
| Backend runtime | Python | 3.11 |
| Backend server | Uvicorn | latest |
| Frontend framework | Angular | 20.1.0 |
| Lenguaje frontend | TypeScript | 5.8.2 |
| CSS framework | Bootstrap | 5.3.8 |
| Carousel | Swiper | 12.0.3 |
| Iconos | Lucide Angular | 0.552.0 |
| Mapas | @angular/google-maps | — |
| Validación datos | Pydantic | 2.12.3 |
| HTTP async | httpx | — |
| Contenedores | Docker + Docker Compose | — |
| Servidor web prod | Nginx | 1.27-alpine |
| Música integración | Last.fm API | — |

---

## 3. Cómo se almacena y sirve el contenido

### Carta / Menú
Los platos **están hardcodeados en plantillas HTML de Angular**. No hay base de datos ni fichero JSON externo.

- Cada categoría tiene su propio componente en `frontend/src/app/features/carta/components/{categoria}/`
- Cada plato se declara con el componente reutilizable `<app-plato-item>`:
  ```html
  <app-plato-item
    nombre="York chuky"
    descripcion="AOVE, tomate natural, mozzarella y jamón cocido"
    precio="11,90€"
    [iconos]="['https://casinorockbar.com/media/sinGluten.webp']">
  </app-plato-item>
  ```
- Las imágenes de iconos (sin gluten, vegano, etc.) se sirven desde `https://casinorockbar.com/media/`

### Eventos
Los eventos se almacenan en un **array TypeScript exportado** como constante:

- Fichero: `frontend/src/app/features/eventos/data/eventos.data.ts`
- Exporta `EVENTOS: Evento[]`
- Estructura de cada evento:
  ```ts
  {
    id: 27,
    titulo: 'Nombre del evento',
    descripcion: 'Descripción corta',
    fechas: ['2026-04-05', '2026-04-06'],   // YYYY-MM-DD
    imagen: ['https://casinorockbar.com/media/imagen.webp'],
    texto: 'Descripción larga (opcional)',
    enlaces: [{ nombre: 'Reservar', url: 'https://...' }],
    activo: true,
    visibleEn: ['web', 'tv']               // dónde aparece
  }
  ```
- `ValidEventGuard` usa este array para validar rutas de detalle (`/eventos/:id`)

### Menús especiales (fin de semana, etc.)
Hardcodeados directamente en las plantillas HTML de sus componentes en `features/menus/pages/`.

### Clubes
Array TypeScript en `frontend/src/app/features/participa/clubes/data/clubes.data.ts`.

### Widget "Now Playing"
El componente `now-playing` llama al backend en tiempo real:
- Frontend → `GET /api/music/now-playing`
- Backend → Last.fm API → devuelve `{ isPlaying, title, artist, albumArt, trackUrl }`
- Caché en memoria de 45 s en el backend para no saturar la API de Last.fm

---

## 4. Base de datos

**No hay base de datos.** Todo el contenido es estático:

- Los platos y eventos están en ficheros TypeScript/HTML del frontend
- El backend solo procesa emails/reservas en tiempo real (no persiste nada salvo un log en texto plano)
- Log de emails: `/app/logs/email_log.txt` dentro del contenedor backend

Si en el futuro se necesita una BD, habría que añadir SQLAlchemy/SQLModel al backend y conectarlo a PostgreSQL, por ejemplo.

---

## 5. Cómo se despliega la web

### Arquitectura de contenedores

```
docker-compose.yml
 ├── servicio: backend  →  Python 3.11 + Uvicorn  (puerto interno 8000)
 └── servicio: frontend →  Nginx 1.27-alpine       (puerto 8080 → host)
         ├── Stage 1: Node 20 → npm run build (genera dist/frontend/browser)
         └── Stage 2: Nginx copia el dist y lo sirve como SPA
```

### Routing en producción (nginx.conf)
- `GET /api/*` → proxy_pass al contenedor backend en puerto 8000
- Todo lo demás → `try_files $uri $uri/ /index.html` (SPA fallback para Angular Router)

### Proceso de despliegue
```bash
# Desde la raíz del proyecto
docker-compose up --build -d
```

No hay CI/CD configurado; el despliegue es manual.

### Variables de entorno necesarias (backend/.env)
```
SMTP_SERVER=...
SMTP_PORT=...
SMTP_USERNAME=...
SMTP_PASSWORD=...
EMAIL_FROM=...
API_KEY=...                  # Clave para el header x-api-key
EMAIL_SECRET_KEY=...         # Para tokens de verificación de email
BASE_URL=https://casinorockbar.com
LASTFM_API_KEY=...           # Opcional, para el widget de música
LASTFM_USERNAME=...
```

---

## 6. Qué archivos tocar para añadir contenido nuevo

### Añadir un plato al menú

**1 solo archivo** (el de la categoría correspondiente):

```
frontend/src/app/features/carta/components/{categoria}/{categoria}.html
```

Añadir dentro de la sección correspondiente:
```html
<app-plato-item
  nombre="Nombre del plato"
  descripcion="Ingredientes o descripción"
  precio="X,XX€"
  [iconos]="['https://casinorockbar.com/media/sinGluten.webp']">
</app-plato-item>
```

Iconos disponibles en `casinorockbar.com/media/`: `sinGluten.webp`, `vegano.webp`, `picante.webp`, etc.

Si la categoría no existe aún, habría que crear un nuevo componente y registrarlo en `carta-page`.

---

### Añadir un evento nuevo

**1 solo archivo**:

```
frontend/src/app/features/eventos/data/eventos.data.ts
```

Añadir un objeto al array `EVENTOS`:
```ts
{
  id: 28,                                          // Siguiente ID disponible
  titulo: 'Nombre del evento',
  descripcion: 'Descripción corta para la tarjeta',
  fechas: ['2026-05-10'],                          // Una o varias fechas YYYY-MM-DD
  imagen: ['https://casinorockbar.com/media/nombre-imagen.webp'],
  texto: 'Texto largo con detalles (opcional)',
  enlaces: [
    { nombre: 'Reservar', url: 'https://...' },
    { nombre: 'Más info', url: 'https://...' }
  ],
  activo: true,
  visibleEn: ['web']                               // 'web', 'tv' o ambos
},
```

> Las imágenes deben subirse previamente al servidor en `/media/`.

---

### Resumen rápido

| Quiero... | Archivo a editar |
|-----------|-----------------|
| Añadir plato a pizzas | `features/carta/components/pizzas/pizzas.html` |
| Añadir plato a hamburguesas | `features/carta/components/hamburguesas/hamburguesas.html` |
| Añadir plato a cualquier categoría | `features/carta/components/{categoria}/{categoria}.html` |
| Añadir / editar un evento | `features/eventos/data/eventos.data.ts` |
| Añadir un club | `features/participa/clubes/data/clubes.data.ts` |
| Cambiar menú de fin de semana | `features/menus/pages/menu-fin-semana/menu-fin-semana.html` |
| Cambiar CORS o rutas API | `backend/main.py` |
| Cambiar credenciales SMTP/API keys | `backend/.env` |
