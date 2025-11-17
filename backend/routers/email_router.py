import re
from fastapi import APIRouter, Request, BackgroundTasks, HTTPException, status
from starlette.responses import HTMLResponse
from urllib.parse import quote

# Modelos
from backend.models.email_models import EmailRequest
from backend.models.reserva_models import ReservaRequest

# Utilidades
from backend.utils.validators import (
    sanitize_text,
    sanitize_html_allowlist,
    validar_rate_limit,
    validar_fecha_inicio_desde_html,
)

from backend.services.email_service import send_email, registrar_log_envio
from backend.config.settings import API_KEY, EMAIL_SECRET_KEY, BASE_URL

# Token seguro
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

router = APIRouter()

# ============================
# CONFIGURACIÓN DEL TOKEN
# ============================

SECRET_KEY = EMAIL_SECRET_KEY
SECURITY_SALT = "email-confirm-salt"

TOKENS_USADOS = set()



serializer = URLSafeTimedSerializer(SECRET_KEY)


def generar_token(data: dict) -> str:
    return serializer.dumps(data, salt=SECURITY_SALT)


def verificar_token(token: str, max_age=86400):  # 24 horas
    try:
        return serializer.loads(token, salt=SECURITY_SALT, max_age=max_age)
    except SignatureExpired:
        raise HTTPException(400, "El enlace ha caducado.")
    except BadSignature:
        raise HTTPException(400, "Token inválido.")

def html_to_text(html: str) -> str:
    # Eliminar etiquetas HTML
    text = re.sub(r"<[^>]+>", "", html)
    # Reemplazar entidades como &nbsp;
    text = text.replace("&nbsp;", " ")
    # Normalizar espacios
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# ============================
# ENDPOINT ORIGINAL /send
# ============================

@router.post("/send")
async def send_email_route(request: Request, background_tasks: BackgroundTasks, data: EmailRequest):
    ip = request.client.host

    # Comprobar API key
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autorizado")

    # Validar formato básico del correo
    if not re.match(r"^[^@]+@[^@]+\.[^@]+$", data.to_email):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo no válido.")

    # Rate limiting (IP + email)
    validar_rate_limit(ip, data.to_email)

    # Validar fecha dentro del HTML
    validar_fecha_inicio_desde_html(data.body)

    # Sanitizar datos
    safe_subject = sanitize_text(data.subject)
    safe_body = sanitize_html_allowlist(data.body)
    safe_to = sanitize_text(data.to_email)

    # Enviar correo en background
    background_tasks.add_task(send_email, safe_to, safe_subject, safe_body)

    # Registrar log
    registrar_log_envio(safe_to, ip)

    return {"message": f"Enviando correo a {safe_to}..."}


# ============================
# ENDPOINT: /reserva
# ============================

@router.post("/reserva")
async def crear_reserva(request: Request, background_tasks: BackgroundTasks, data: ReservaRequest):

    # Comprobar API key
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        raise HTTPException(401, "No autorizado")

    # Generar token con los datos
    # Datos seguros para el token
    token_data = {
        "nombre": data.nombre,
        "email_cliente": data.email_cliente,
        "telefono": data.telefono,
        "fecha": data.fecha,
        "hora": data.hora,
        "personas": data.personas,
        "mensaje": data.mensaje
    }

    token = generar_token(token_data)


    confirm_url = f"{BASE_URL}/api/email/confirm?token={quote(token)}"

    # Email de confirmación al cliente
    body_cliente = f"""
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">

        <p>Hola {data.nombre},</p>

        <p>
          Hemos recibido tu solicitud de reserva en <strong>Casino Rock Bar</strong>.
          Antes de confirmarla, necesitamos verificar que este correo electrónico es correcto.
          Este paso nos ayuda a evitar reservas falsas o errores de contacto.
        </p>

        <p>Haz clic aquí para confirmar tu reserva:</p>

        <p>
          <a href="{confirm_url}"
             style="background:#000;color:#fff;padding:10px 20px;
                    text-decoration:none;border-radius:4px;display:inline-block;">
             Confirmar mi reserva
          </a>
        </p>

        <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
        <p>{confirm_url}</p>

        <p style="margin-top: 20px;">
          Si no has solicitado esta reserva, ignora este mensaje. 
          No se realizará ninguna acción adicional.
        </p>

        <p>Saludos y Rock'n'roll,<br>
           <strong>Casino Rock Bar</strong>
        </p>

      </body>
    </html>
    """

    background_tasks.add_task(
        send_email,
        data.email_cliente,
        "Confirma tu reserva en Casino Rock Bar",
        body_cliente
    )

    registrar_log_envio(data.email_cliente, request.client.host)

    return {"message": "Te hemos enviado un email para confirmar tu reserva."}


# ============================
# NUEVO ENDPOINT: /confirm
# ============================

@router.get("/confirm")
async def confirmar_reserva(token: str, background_tasks: BackgroundTasks):

    # 🔒 Evitar uso doble del enlace
    if token in TOKENS_USADOS:
        return HTMLResponse("""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; text-align: center;">
                <h2 style="color:#c49b63;">Esta reserva ya está verificada</h2>
                <p style="font-size: 16px; line-height: 1.6;">
                    La verificación ya se realizó correctamente y no se ha enviado ningún correo nuevo.
                </p>
                <a href="https://casinorockbar.com"
                   style="display:inline-block; margin-top:25px; padding:12px 20px;
                          background:#c49b63; color:white; text-decoration:none; border-radius:6px;">
                    Volver a la web
                </a>
            </div>
        """, status_code=200)

    # Si el token es inválido o está caducado, esta función lanzará una excepción
    datos = verificar_token(token)

    # Si llegamos aquí, el token es válido → el usuario ha verificado su correo

    # Email al restaurante
    body_casino = f"""
    Nueva reserva confirmada:

    Nombre: {datos['nombre']}
    Email: {datos['email_cliente']}
    Teléfono: {datos.get('telefono')}
    Fecha: {datos['fecha']}
    Hora: {datos['hora']}
    Personas: {datos['personas']}
    Mensaje: {datos.get('mensaje')}

    (UNA BUENA IDEA sería contactar por teléfono con el cliente y saber más detalles...)
    """

    asunto_bar = (
        f"Reserva confirmada - {datos['fecha']} {datos['hora']} - {datos['nombre']}"
    )

    # Enviar correo al bar
    background_tasks.add_task(
        send_email,
        "casinorock888@gmail.com",
        asunto_bar,
        body_casino
    )

    # Email al cliente tras confirmar
    body_cliente = f"""
    <p>Hola {datos['nombre']},</p>

    <p>¡Gracias por verificar tu correo electrónico! 😊</p>

    <p>
    Tu solicitud de reserva en <b>Casino Rock Bar</b> ha quedado registrada correctamente en nuestro sistema.
    Sin embargo, esto <b>no implica la confirmación definitiva</b>.
    </p>

    <p>
    En breve nos pondremos en contacto contigo por teléfono o correo para 
    <strong>confirmar o ajustar los detalles de tu reserva</strong>.
    </p>

    <p>
    Agradecemos tu colaboración en este proceso; nos ayuda a ofrecerte un servicio más rápido y seguro.
    </p>

    <p style="margin-top:20px;">
    Saludos y Rock'n'roll,<br>
    <b>Equipo de Casino Rock Bar</b>
    </p>
    """

    background_tasks.add_task(
        send_email,
        datos["email_cliente"],
        "Tu reserva ha sido confirmada",
        body_cliente
    )

    # 🔒 Marcar token como usado
    TOKENS_USADOS.add(token)

    return HTMLResponse("""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; text-align: center;">
            <h1 style="color:#c49b63;">¡Correo verificado correctamente!</h1>

            <p style="font-size: 16px; line-height: 1.6;">
                Hemos recibido la verificación de tu correo electrónico.  
                <br><br>
                Tu solicitud de reserva en <b>Casino Rock Bar</b> está registrada,
                pero <b>aún no está confirmada</b>.
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
                En breve nos pondremos en contacto contigo por teléfono o email
                para <b>confirmar o ajustar los detalles</b> de tu reserva.
                <br><br>
                ¡Gracias por tu colaboración!
            </p>

            <a href="https://casinorockbar.com"
               style="display:inline-block; margin-top:25px; padding:12px 20px; background:#c49b63;
                      color:white; text-decoration:none; border-radius:6px;">
                Volver a la web
            </a>
        </div>
    """)







