import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request, UploadFile, File, status

from backend.config.settings import API_KEY

router = APIRouter(prefix="/api/media", tags=["media"])

UPLOAD_DIR = Path("/var/www/media/eventos")
BASE_URL = "https://casinorockbar.com/media/eventos"

ALLOWED_TYPES = {
    "image/jpeg", "image/png", "image/webp",
    "image/gif", "image/avif", "image/svg+xml",
}

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"}

MAX_SIZE_MB = 10


@router.post("/upload")
async def upload_image(request: Request, file: UploadFile = File(...)):
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autorizado")

    # Validar content-type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Tipo de archivo no permitido: {file.content_type}",
        )

    # Validar extensión
    original = Path(file.filename or "file")
    ext = original.suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Extensión no permitida: {ext}",
        )

    # Leer contenido y validar tamaño
    content = await file.read()
    if len(content) > MAX_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"El archivo supera el límite de {MAX_SIZE_MB} MB",
        )

    # Generar nombre único preservando la extensión
    filename = f"{uuid.uuid4().hex}{ext}"

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    dest = UPLOAD_DIR / filename
    dest.write_bytes(content)

    return {"url": f"{BASE_URL}/{filename}"}
