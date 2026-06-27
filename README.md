# Casino Rock Bar — Web oficial

> Aplicación web completa para un restaurante en Toledo.
> Carta digital dinámica, cartelera de eventos, reservas con doble confirmación por email, pantalla de TV y más.

---

## Tecnologías

**Frontend**

![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

**Backend**

![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)

**Infraestructura**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

---

## Funcionalidades

### Carta digital dinámica
La carta del restaurante se gestiona completamente desde la API. Las secciones y platos se crean, editan y desactivan en tiempo real sin tocar código. El frontend consume el endpoint público y renderiza solo el contenido activo, con subnavegación por sección y soporte para iconos de alérgenos.

### Cartelera de eventos
Sistema híbrido: los eventos pueden venir de la base de datos (creados dinámicamente con UUID) o del código fuente estático (array TypeScript con IDs numéricos). La lógica de fusión en el frontend combina ambas fuentes, elimina duplicados y ordena priorizando los eventos recientes.

Cada evento tiene:
- Galería de imágenes con navegación prev/next
- Campo `visibleEn` para controlar si aparece en la web, en la pantalla de TV o en ambos
- Indicador de fechas compacto (rango o fecha única)
- SEO dinámico por evento (title, description, og:image, canonical)

### Reserva con doble confirmación por email
El formulario de reserva implementa un flujo completo de verificación de correo:

1. El usuario rellena el formulario (nombre, teléfono, email, fecha/hora, zona, personas)
2. El backend genera un token firmado con **itsdangerous** y envía un email al cliente
3. El cliente hace clic en el enlace → el token se verifica (24h de validez, un solo uso)
4. Solo entonces se notifica al bar y se confirma la reserva al cliente

El formulario incluye validadores propios: rango de fechas, capacidad por zona, fecha pasada, whitelist/blacklist de dominios de email y honeypot anti-bot.

### Modo pantalla TV
La ruta `/tv` activa un modo de visualización diseñado para mostrarse en una pantalla física del local. Sin navbar ni footer, fondo negro, muestra los eventos marcados como `visibleEn: 'tv'` junto al widget de **Now Playing** integrado con Last.fm.

### Now Playing (Last.fm)
El backend consulta la API de Last.fm para saber qué canción está sonando en ese momento. El resultado se cachea en memoria durante 45 segundos y tiene un backoff de 2 minutos en caso de fallo, evitando saturar la API externa.

### Merchandising
Catálogo de 13 camisetas oficiales del local con visor de imagen modal. Las imágenes se sirven desde el servidor de medios propio.

### Upload de imágenes
API protegida para subir imágenes de eventos. Valida tipo MIME, extensión y tamaño (máx. 10 MB), genera nombres únicos con UUID y las sirve desde `/media/eventos/`.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Compose                          │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────────┐   │
│  │      frontend        │    │        backend           │   │
│  │  nginx + Angular SPA │───▶│  FastAPI + Uvicorn       │   │
│  │       :80            │    │       :8000              │   │
│  └──────────────────────┘    └──────────────────────────┘   │
│           │                            │                    │
│    Sirve /index.html            Volúmenes persistentes:     │
│    Proxea /api/ → backend       ./data/  (JSON)             │
│                                 ./logs/ (email log)         │
│                                 /var/www/media/ (imágenes)  │
└─────────────────────────────────────────────────────────────┘
```

El nginx sirve la SPA de Angular y hace de reverse proxy para el backend: cualquier petición a `/api/` se redirige al contenedor de Python. No hay base de datos: los datos se persisten en archivos JSON montados como volúmenes Docker.

---

## API REST (resumen)

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `GET` | `/api/carta` | — | Carta pública (secciones + platos activos) |
| `POST` | `/api/carta/secciones` | API Key | Crear sección |
| `PUT` | `/api/carta/secciones/:id` | API Key | Editar sección |
| `DELETE` | `/api/carta/secciones/:id` | API Key | Eliminar sección |
| `POST` | `/api/carta/secciones/:id/platos` | API Key | Añadir plato |
| `PUT` | `/api/carta/platos/:id` | API Key | Editar plato |
| `DELETE` | `/api/carta/platos/:id` | API Key | Eliminar plato |
| `GET` | `/api/eventos` | — | Lista eventos (`?visibleEn=web\|tv`) |
| `GET` | `/api/eventos/:id` | — | Detalle de evento |
| `POST` | `/api/eventos` | API Key | Crear evento |
| `PUT` | `/api/eventos/:id` | API Key | Editar evento |
| `DELETE` | `/api/eventos/:id` | API Key | Eliminar evento |
| `GET` | `/api/music/now-playing` | — | Canción actual (Last.fm, caché 45s) |
| `POST` | `/api/email/send` | API Key | Enviar email genérico |
| `POST` | `/api/email/reserva` | API Key | Iniciar reserva (envía email de verificación) |
| `GET` | `/api/email/confirm` | Token URL | Confirmar reserva (token firmado, 1 uso) |
| `POST` | `/api/media/upload` | API Key | Subir imagen (máx. 10 MB) |

---

## Seguridad implementada

- **Autenticación por API Key** en todos los endpoints de escritura
- **Rate limiting** por IP (10 s) y por email (1 min) en envío de correos
- **Sanitización HTML** con lista blanca de etiquetas permitidas
- **Límite de tamaño** de peticiones: 1 MB global (uploads tienen su propio límite)
- **Headers de seguridad**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `HSTS`, `Referrer-Policy`
- **Token de un solo uso** para confirmación de reservas (itsdangerous, caducidad 24h)
- **Honeypot anti-bot** en el formulario de reservas
- **Whitelist de dominios** de email (bloquea tempmail, mailinator, etc.)
- **Validación de URLs externas** antes de abrir en nueva pestaña

---

## Ejecución local

**Prerrequisito:** Docker y Docker Compose instalados.

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/casino.git
cd casino

# Crear el fichero de variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con tus credenciales SMTP y API keys

# Levantar los contenedores
docker compose up --build

# Frontend disponible en:  http://localhost:8080
# Backend (API) en:        http://localhost:8000
```

**Desarrollo Angular sin Docker:**
```bash
cd frontend
npm install
ng serve        # http://localhost:4200
```

**Desarrollo FastAPI sin Docker:**
```bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

---

## Variables de entorno

Crea `backend/.env` con las siguientes variables:

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=tu@gmail.com
SMTP_PASSWORD=tu_app_password
EMAIL_FROM=tu@gmail.com

API_KEY=tu_clave_secreta_para_la_api
EMAIL_SECRET_KEY=clave_para_tokens_itsdangerous

BASE_URL=https://tudominio.com

LASTFM_API_KEY=tu_api_key_lastfm
LASTFM_USERNAME=tu_usuario_lastfm
```

---

## Estructura del proyecto

```
casino/
├── backend/
│   ├── config/settings.py          # Carga de variables de entorno
│   ├── models/                     # Pydantic models (Evento, Plato, Email...)
│   ├── routers/                    # Endpoints por dominio
│   │   ├── carta_router.py
│   │   ├── eventos_router.py
│   │   ├── email_router.py
│   │   ├── music_router.py
│   │   └── media_router.py
│   ├── services/                   # Lógica de negocio
│   │   ├── email_service.py
│   │   ├── lastfm_service.py
│   │   └── now_playing_cache.py
│   ├── utils/
│   │   ├── security.py             # Middlewares de seguridad
│   │   └── validators.py           # Rate limit, sanitización
│   ├── data/                       # JSON persistente (eventos, carta)
│   ├── main.py                     # FastAPI app + CORS + middlewares
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   └── src/app/
│       ├── core/guards/            # BlockedRouteGuard, ValidEventGuard
│       ├── shared/
│       │   ├── seo.service.ts      # SEO dinámico
│       │   └── components/         # Navbar, Footer, Carrusel, BackToTop...
│       └── features/               # Módulos de negocio
│           ├── carta/              # Carta dinámica
│           ├── eventos/            # Cartelera y detalle
│           ├── reserva-evento/     # Reservas con verificación email
│           ├── merchandising/      # Catálogo de camisetas
│           ├── participa/          # Comunidad + clubes
│           ├── tv/                 # Modo pantalla TV
│           └── welcome/            # Landing con carrusel
│
└── docker-compose.yml
```

---

## Autor

Proyecto desarrollado como aplicación real para **Casino Rock Bar** (Esquivias, Toledo).
Arquitectura, diseño e implementación completos: frontend Angular + backend FastAPI + infraestructura Docker.
