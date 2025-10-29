// src/app/features/eventos/data/eventos.data.ts
export interface Evento {
  id: number;
  titulo: string;
  descripcion?: string;
  fechas: string[];
  imagen: string;
  texto?: string;
  enlace?: string;
  enlaces?: { nombre: string; url: string }[];
  activo: boolean;
}

export const EVENTOS = [
  {
    id: 3,
    titulo: 'Santo Tardeo',
    descripcion: 'Música, ambiente y mucho miedo...',
    texto: `El 1 de noviembre no te pierdas la mejor tarde post-Halloween con Stanz DJ.
    Desde las 17:30 h.
    ¡Ven disfrazado y sigue la fiesta entre vivos y muertos!`,
    fechas: ['2025-11-1'],
    imagen: 'assets/eventos/santo_tardeo2025.jpg',
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
    id: 2,
    titulo: 'Pasaje del Terror',
    descripcion:'¡Todo lo recaudado se destina al viaje de fin de curso!',
    texto:`Actividad organizada por los alumnos del C.E.I.P. Miguel de Cervantes (6º curso)
    Viernes 31 desde las 18:00 y Sábado 1 desde las 20:00. Entrada: 2 €.
    Prepárate para una noche escalofriante llena de sustos, risas y mucha adrenalina.`,
    fechas: ['2025-10-31', '2025-11-1'],
    imagen: 'assets/eventos/Pasaje_terror2025.jpg',
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
    id: 1,
    titulo: 'Colegui Fest',
    descripcion: 'Conciertos en vivo.',
    fechas: ['2025-10-25'],
    imagen: 'assets/eventos/Concierto.jpeg',
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
    id: 0,
    titulo: 'Hamburbeza',
    descripcion: 'Las 8 mejores hamburguesas del mundo.',
    fechas: ['2025-10-10', '2025-10-12'],
    imagen: 'assets/eventos/Burguer.jpeg',
    texto: `Ven y prueba nuestras hamburguesas artesanales...`,
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  }
];

