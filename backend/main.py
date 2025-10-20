from pydantic import BaseModel
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# --- Cargar variables del entorno (.env) ---
load_dotenv()

# --- Crear app ---
app = FastAPI(title="Backend Web Casino")

# --- Configurar CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # 🔥 frontend Angular
    allow_credentials=True,
    allow_methods=["*"],                      # permite OPTIONS, GET, POST...
    allow_headers=["*"],                      # permite Content-Type, etc.
)

# --- Leer variables del entorno ---
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")

# --- RUTA 1: Configuración Google Maps ---
@app.get("/maps/config")
async def get_maps_config():
    """Devuelve la clave de Google Maps al frontend"""
    return {"apiKey": GOOGLE_MAPS_API_KEY}

# --- FUNCIÓN: Envío de correo ---
def send_email(to_email: str, subject: str, body: str):
    msg = MIMEMultipart()
    msg["From"] = EMAIL_FROM
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "html", "utf-8"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        print(f"✅ Correo enviado a {to_email}")
    except Exception as e:
        print(f"❌ Error enviando correo: {e}")

# --- RUTA 2: Enviar correo ---
class EmailRequest(BaseModel):
    to_email: str
    subject: str
    body: str

@app.post("/email/send")
async def send_email_route(background_tasks: BackgroundTasks, data: EmailRequest):
    """Envía un correo electrónico en segundo plano."""
    background_tasks.add_task(send_email, data.to_email, data.subject, data.body)
    return {"message": f"Enviando correo a {data.to_email}..."}

