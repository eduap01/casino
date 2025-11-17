import os
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_FROM = os.getenv("EMAIL_FROM")
API_KEY = os.getenv("API_KEY")  # Token secreto para autorización
EMAIL_SECRET_KEY = os.getenv("EMAIL_SECRET_KEY")

BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

# Ruta del log dentro del contenedor
LOG_PATH = "/app/logs/email_log.txt"
