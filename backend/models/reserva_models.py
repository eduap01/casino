from pydantic import BaseModel, EmailStr

class ReservaRequest(BaseModel):
    nombre: str
    email_cliente: EmailStr
    telefono: str | None = None
    fecha: str
    hora: str
    personas: int
    mensaje: str | None = None
    email_casino: EmailStr
    detalle_html: str | None = None
