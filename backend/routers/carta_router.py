import json
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException, Request, status

from backend.config.settings import API_KEY
from backend.models.carta_models import Seccion, SeccionCreate, SeccionUpdate, Plato, PlatoCreate, PlatoUpdate

router = APIRouter(prefix="/api/carta", tags=["carta"])

DATA_FILE = Path(__file__).parent.parent / "data" / "carta.json"

ICONOS_DISPONIBLES = [
    {"id": "sinGluten", "nombre": "Sin Gluten", "url": "https://casinorockbar.com/media/sinGluten.webp"}
]


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
# GET /carta  —  carta pública (activa=true, activo=true) o todo (?all=true)
# ---------------------------------------------------------------------------

@router.get("", response_model=list[Seccion])
def get_carta(all: bool = False):
    secciones = _load()
    if not all:
        secciones = [s for s in secciones if s.get("activa", True)]
        for s in secciones:
            s["platos"] = [p for p in s.get("platos", []) if p.get("activo", True)]
    return secciones


# ---------------------------------------------------------------------------
# GET /carta/iconos
# ---------------------------------------------------------------------------

@router.get("/iconos")
def get_iconos():
    return ICONOS_DISPONIBLES


# ---------------------------------------------------------------------------
# POST /carta/secciones  —  crear sección (auth)
# ---------------------------------------------------------------------------

@router.post("/secciones", response_model=Seccion, status_code=status.HTTP_201_CREATED)
def create_seccion(request: Request, data: SeccionCreate):
    _require_api_key(request)
    secciones = _load()
    nueva = {**data.model_dump(), "id": str(uuid.uuid4()), "platos": []}
    secciones.append(nueva)
    _save(secciones)
    return nueva


# ---------------------------------------------------------------------------
# PUT /carta/secciones/{id}  —  editar sección (auth)
# ---------------------------------------------------------------------------

@router.put("/secciones/{seccion_id}", response_model=Seccion)
def update_seccion(seccion_id: str, request: Request, data: SeccionUpdate):
    _require_api_key(request)
    secciones = _load()
    for i, s in enumerate(secciones):
        if s["id"] == seccion_id:
            cambios = {k: v for k, v in data.model_dump().items() if v is not None}
            secciones[i].update(cambios)
            _save(secciones)
            return secciones[i]
    raise HTTPException(status_code=404, detail="Sección no encontrada")


# ---------------------------------------------------------------------------
# DELETE /carta/secciones/{id}  —  eliminar sección + sus platos (auth)
# ---------------------------------------------------------------------------

@router.delete("/secciones/{seccion_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_seccion(seccion_id: str, request: Request):
    _require_api_key(request)
    secciones = _load()
    nuevas = [s for s in secciones if s["id"] != seccion_id]
    if len(nuevas) == len(secciones):
        raise HTTPException(status_code=404, detail="Sección no encontrada")
    _save(nuevas)


# ---------------------------------------------------------------------------
# POST /carta/secciones/{id}/platos  —  crear plato (auth)
# ---------------------------------------------------------------------------

@router.post("/secciones/{seccion_id}/platos", response_model=Plato, status_code=status.HTTP_201_CREATED)
def create_plato(seccion_id: str, request: Request, data: PlatoCreate):
    _require_api_key(request)
    secciones = _load()
    for i, s in enumerate(secciones):
        if s["id"] == seccion_id:
            nuevo_plato = {**data.model_dump(), "id": str(uuid.uuid4()), "seccion_id": seccion_id}
            secciones[i].setdefault("platos", []).append(nuevo_plato)
            _save(secciones)
            return nuevo_plato
    raise HTTPException(status_code=404, detail="Sección no encontrada")


# ---------------------------------------------------------------------------
# PUT /carta/platos/{id}  —  editar plato (auth)
# ---------------------------------------------------------------------------

@router.put("/platos/{plato_id}", response_model=Plato)
def update_plato(plato_id: str, request: Request, data: PlatoUpdate):
    _require_api_key(request)
    secciones = _load()
    for i, s in enumerate(secciones):
        for j, p in enumerate(s.get("platos", [])):
            if p["id"] == plato_id:
                cambios = {k: v for k, v in data.model_dump().items() if v is not None}
                secciones[i]["platos"][j].update(cambios)
                _save(secciones)
                return secciones[i]["platos"][j]
    raise HTTPException(status_code=404, detail="Plato no encontrado")


# ---------------------------------------------------------------------------
# DELETE /carta/platos/{id}  —  eliminar plato (auth)
# ---------------------------------------------------------------------------

@router.delete("/platos/{plato_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_plato(plato_id: str, request: Request):
    _require_api_key(request)
    secciones = _load()
    for i, s in enumerate(secciones):
        platos = s.get("platos", [])
        nuevos = [p for p in platos if p["id"] != plato_id]
        if len(nuevos) < len(platos):
            secciones[i]["platos"] = nuevos
            _save(secciones)
            return
    raise HTTPException(status_code=404, detail="Plato no encontrado")
