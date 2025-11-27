# backend/services/email_service.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
from datetime import datetime
import os
import uuid

from backend.config.settings import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, EMAIL_FROM, LOG_PATH

def send_email(to_email: str, subject: str, body: str) -> bool:
  msg = MIMEMultipart()
  msg["From"] = f"Casino Rock Bar <{EMAIL_FROM}>"
  msg["Reply-To"] = f"Casino Rock Bar <{SMTP_USERNAME}>"
  msg["Date"] = formatdate(localtime=True)
  msg["To"] = to_email
  msg["Subject"] = subject
  msg.add_header("X-Mailer", "Casino Rock Bar Backend")
  msg.add_header("X-Content-Type-Options", "nosniff")
  msg["Message-ID"] = f"<{uuid.uuid4()}@casinorockbar.com>"
  # Si contiene etiquetas HTML -> enviar como HTML
  if "<" in body and ">" in body:
      msg.attach(MIMEText(body, "html", "utf-8"))
  else:
      msg.attach(MIMEText(body, "plain", "utf-8"))

  try:
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
      server.starttls()
      server.login(SMTP_USERNAME, SMTP_PASSWORD)
      server.send_message(msg)
    print(f"Correo enviado a {to_email}")
    return True
  except Exception as e:
    print(f"Error enviando correo a {to_email}: {e}")
    return False

def registrar_log_envio(to_email: str, ip: str):
  os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
  with open(LOG_PATH, "a", encoding="utf-8") as f:
    f.write(f"[{datetime.now()}] Email enviado a {to_email} desde IP {ip}\n")

  # Limpiar si supera 5 MB
  if os.path.exists(LOG_PATH) and os.path.getsize(LOG_PATH) > 5_000_000:
    open(LOG_PATH, "w").close()
