# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers.email_router import router as email_router
from backend.routers.music_router import router as music_router
from backend.routers.eventos_router import router as eventos_router
from backend.routers.media_router import router as media_router
from backend.utils.security import add_security_headers, limit_request_size

from dotenv import load_dotenv
load_dotenv()


app = FastAPI(title="Backend Web Casino")

# CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=[
    "http://localhost:4200",
    "https://casinorockbar.com",
    "https://www.casinorockbar.com"
  ],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Middlewares de seguridad
app.middleware("http")(add_security_headers)
app.middleware("http")(limit_request_size)

# Rutas de email
app.include_router(email_router, prefix="/email", tags=["email"])
app.include_router(music_router)
app.include_router(eventos_router)
app.include_router(media_router)
