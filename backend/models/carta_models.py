from pydantic import BaseModel
from typing import List, Optional


class PlatoCreate(BaseModel):
    nombre: str
    precio: str
    descripcion: Optional[str] = None
    iconos: List[str] = []
    orden: int = 0
    activo: bool = True


class PlatoUpdate(BaseModel):
    nombre: Optional[str] = None
    precio: Optional[str] = None
    descripcion: Optional[str] = None
    iconos: Optional[List[str]] = None
    orden: Optional[int] = None
    activo: Optional[bool] = None


class Plato(PlatoCreate):
    id: str
    seccion_id: str


class SeccionCreate(BaseModel):
    nombre: str
    orden: int = 0
    activa: bool = True


class SeccionUpdate(BaseModel):
    nombre: Optional[str] = None
    orden: Optional[int] = None
    activa: Optional[bool] = None


class Seccion(SeccionCreate):
    id: str
    platos: List[Plato] = []
