from pydantic import BaseModel
from typing import List, Optional


class EnlaceModel(BaseModel):
    nombre: str
    url: str


class EventoCreate(BaseModel):
    titulo: str
    descripcion: str
    fechas: List[str] = []
    imagen: List[str] = []
    texto: str = ""
    enlace: str = ""
    enlaces: List[EnlaceModel] = []
    activo: bool = True
    visibleEn: List[str] = []


class EventoUpdate(BaseModel):
    titulo: Optional[str] = None
    descripcion: Optional[str] = None
    fechas: Optional[List[str]] = None
    imagen: Optional[List[str]] = None
    texto: Optional[str] = None
    enlace: Optional[str] = None
    enlaces: Optional[List[EnlaceModel]] = None
    activo: Optional[bool] = None
    visibleEn: Optional[List[str]] = None


class Evento(EventoCreate):
    id: str
