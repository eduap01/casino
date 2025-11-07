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
    id: 5,
    titulo: 'Fiesta Remember',
    descripcion: 'Revive los 90 en el Casino Rock Bar',
    texto: `Vuelve la magia de los 90 y 2000 con los mejores temas de House y Techno House.
    El 15 de noviembre de 2025, a las 23:00.
    Una noche para revivir los grandes himnos de la pista con Stanz DJ al mando.`,
    fechas: ['2025-11-15'],
    imagen: 'assets/eventos/fiestaRemember2025.jpg',
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
    id: 4,
    titulo: 'La Pura Sangre',
    descripcion: 'Nito Serrano y La Pura Sangre llegan con su gira de otoño al Casino Rock Bar.',
    texto: `El sábado 22 de noviembre a las 18:30 h, el escenario del Casino Rock (Esquivias) acoge la Gira Otoño 2025 de Nito Serrano y La Pura Sangre.

Con su mezcla inconfundible de raíces andaluzas, rock y folk, el grupo ofrece un directo cargado de emoción, fuerza y autenticidad. Un viaje sonoro que combina la poesía de las letras con la energía de las guitarras y la calidez del cante.

Entrada libre hasta completar aforo.

No te pierdas una tarde de música en vivo con una de las bandas más vibrantes del panorama nacional.`,
    fechas: ['2025-11-22'],
    imagen: 'assets/eventos/laPuraSangre.jpg',
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
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

