import json
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request, status

from backend.config.settings import API_KEY
from backend.models.evento_models import Evento, EventoCreate, EventoUpdate

router = APIRouter(prefix="/api/eventos", tags=["eventos"])

DATA_FILE = Path(__file__).parent.parent / "data" / "eventos.json"


# ---------------------------------------------------------------------------
# Helpers de persistencia
# ---------------------------------------------------------------------------

def _load() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    with DATA_FILE.open("r", encoding="utf-8") as f:
        return json.load(f)


def _save(data: list[dict]) -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _require_api_key(request: Request) -> None:
    key = request.headers.get("x-api-key")
    if key != API_KEY:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autorizado")


# ---------------------------------------------------------------------------
# GET /eventos  —  lista todos (publico) o filtra por visibleEn
# ---------------------------------------------------------------------------

@router.get("", response_model=list[Evento])
def get_eventos(visibleEn: str | None = None):
    eventos = _load()
    if visibleEn:
        eventos = [e for e in eventos if visibleEn in e.get("visibleEn", [])]
    return eventos


# ---------------------------------------------------------------------------
# GET /eventos/{id}
# ---------------------------------------------------------------------------

@router.get("/{evento_id}", response_model=Evento)
def get_evento(evento_id: str):
    for evento in _load():
        if evento["id"] == evento_id:
            return evento
    raise HTTPException(status_code=404, detail="Evento no encontrado")


# ---------------------------------------------------------------------------
# POST /eventos  —  requiere X-API-Key
# ---------------------------------------------------------------------------

@router.post("", response_model=Evento, status_code=status.HTTP_201_CREATED)
def create_evento(request: Request, data: EventoCreate):
    _require_api_key(request)
    eventos = _load()
    nuevo = Evento(id=str(uuid.uuid4()), **data.model_dump())
    eventos.append(nuevo.model_dump())
    _save(eventos)
    return nuevo


# ---------------------------------------------------------------------------
# PUT /eventos/{id}  —  requiere X-API-Key
# ---------------------------------------------------------------------------

@router.put("/{evento_id}", response_model=Evento)
def update_evento(evento_id: str, request: Request, data: EventoUpdate):
    _require_api_key(request)
    eventos = _load()
    for i, evento in enumerate(eventos):
        if evento["id"] == evento_id:
            cambios = {k: v for k, v in data.model_dump().items() if v is not None}
            eventos[i].update(cambios)
            _save(eventos)
            return eventos[i]
    raise HTTPException(status_code=404, detail="Evento no encontrado")


# ---------------------------------------------------------------------------
# DELETE /eventos/{id}  —  requiere X-API-Key
# ---------------------------------------------------------------------------

@router.delete("/{evento_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_evento(evento_id: str, request: Request):
    _require_api_key(request)
    eventos = _load()
    nuevos = [e for e in eventos if e["id"] != evento_id]
    if len(nuevos) == len(eventos):
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    _save(nuevos)


# ---------------------------------------------------------------------------
# POST /api/eventos/export-ts  —  compatible con la app Android
# ---------------------------------------------------------------------------

@router.post("/export-ts")
def export_ts(request: Request):
    _require_api_key(request)
    eventos = _load()
    return {"ok": True, "eventos_exportados": len(eventos), "ruta": "api/eventos"}
