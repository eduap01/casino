import re
from datetime import datetime, timedelta
from fastapi import HTTPException, status

# Control de solicitudes
last_request_by_ip: dict[str, datetime] = {}
last_request_by_email: dict[str, datetime] = {}

# Sanitización de texto plano (asunto, email)
def sanitize_text(text: str) -> str:
  clean = re.sub(r'<.*?>', '', text)
  clean = clean.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
  return clean.strip()

# Sanitización HTML con lista blanca
def sanitize_html_allowlist(html: str) -> str:
  html = re.sub(r'(?is)<(script|style)[^>]*>.*?</\1>', '', html)
  html = re.sub(r'(?is)\son\w+="[^"]*"', '', html)
  html = re.sub(r"(?is)\son\w+='[^']*'", '', html)
  html = re.sub(r'(?is)\s(href|src)\s*=\s*"javascript:[^"]*"', r' \1="#"', html)
  html = re.sub(r"(?is)\s(href|src)\s*=\s*'javascript:[^']*'", r" \1='#'", html)
  html = re.sub(r'(?is)</?(?!p|br|b|strong|i|em|ul|ol|li)\w+[^>]*>', '', html)
  return html

# Rate limit por IP y por email
def validar_rate_limit(ip: str, email: str):
  now = datetime.now()

  # Por IP (cada 10s)
  if ip in last_request_by_ip and now - last_request_by_ip[ip] < timedelta(seconds=10):
    raise HTTPException(
      status_code=status.HTTP_429_TOO_MANY_REQUESTS,
      detail="Demasiadas solicitudes. Espera unos segundos."
    )

  # Por email (cada 1 min)
  if email in last_request_by_email and now - last_request_by_email[email] < timedelta(minutes=1):
    raise HTTPException(
      status_code=status.HTTP_429_TOO_MANY_REQUESTS,
      detail="Demasiadas solicitudes desde este correo. Espera un minuto."
    )

  last_request_by_ip[ip] = now
  last_request_by_email[email] = now

# Extraer y validar fecha de inicio desde el HTML del correo
def validar_fecha_inicio_desde_html(body_html: str):
  # Busca "Fecha inicio:</b> YYYY-MM-DD HH:MM"
  m = re.search(r"Fecha inicio:</b>\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})", body_html)
  if not m:
    return

  fecha_str, hora_str = m.group(1), m.group(2)
  try:
    inicio_dt = datetime.strptime(f"{fecha_str} {hora_str}", "%Y-%m-%d %H:%M")
    if inicio_dt < datetime.now():
      raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="La fecha de inicio no puede ser anterior al momento actual."
      )
  except ValueError:
    # Si el formato no cuadra, no rompemos la petición
    return
