export interface Plato {
  id: string;
  seccion_id: string;
  nombre: string;
  precio: string;
  descripcion?: string;
  iconos: string[];
  orden: number;
  activo: boolean;
}

export interface Seccion {
  id: string;
  nombre: string;
  orden: number;
  activa: boolean;
  platos: Plato[];
}
