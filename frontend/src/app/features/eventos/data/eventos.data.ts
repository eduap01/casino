// src/app/features/eventos/data/eventos.data.ts

export interface Evento {
  id: number;
  titulo: string;
  descripcion?: string;
  fechas: string[];
  imagen: string[];
  texto?: string;
  enlace?: string;
  enlaces?: { nombre: string; url: string }[];
  activo: boolean;
}

const MEDIA_BASE_URL = 'https://casinorockbar.com/media';
const media = (path: string) => `${MEDIA_BASE_URL}/${path}`;

export const EVENTOS: Evento[] = [
  {
    id: 13,
    titulo: 'Alfonso Ferrer & Los que van en carruaje',
    descripcion: 'Un directo con alma, emoción y una banda que lo eleva todo',
    texto: `
    Las canciones nacen de la palabra,
    pero cobran sentido cuando suenan en directo.

    Este día, el Casino Rock Bar acoge el proyecto de Alfonso Ferrer
    junto a Los Que Van en Carruaje, una banda excepcional que convierte
    cada concierto en una experiencia viva y emocional.

    Pop y folk en castellano, virtuosismo instrumental y una conexión real
    con el público se mezclan en un directo que respira, crece y sorprende.
    Canciones con alma, texturas que envuelven y una energía que se siente
    desde la primera nota.

    Porque hay conciertos que se escuchan
    y otros que se viven.
  `,
    fechas: ['2026-02-07'],
    imagen: [
      media('eventos/alfonso-ferrer1.jpg'),
      media('eventos/alfonso-ferrer2.jpg'),
      media('eventos/alfonso-ferrer3.jpg'),
      media('eventos/alfonso-ferrer4.jpg'),
      media('eventos/alfonso-ferrer5.jpg'),
      media('eventos/alfonso-ferrer6.jpg'),
      media('eventos/alfonso-ferrer7.jpg'),
      media('eventos/alfonso-ferrer8.jpg'),
      media('eventos/alfonso-ferrer9.jpg')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
      id: 12,
      titulo: 'V Jornadas del Cachopo',
      descripcion: 'Tres días para disfrutar del cachopo como se merece',
      texto: `
      Llega una de esas citas que se viven con hambre y con ganas: las V Jornadas del Cachopo en el Casino Rock Bar.

  Un menú cerrado por 29€ por persona, con entrantes para abrir boca, cachopo a elegir y postre para rematar.
  Además, incluye media botella de sidra natural por persona.

  Plazas limitadas. ¡Reserva y no te quedes sin mesa!
    `,
      fechas: ['2026-01-30', '2026-01-31', '2026-02-01'],
      imagen: [
        media('eventos/jornada-cachopo-2026.jpg')

      ],
      enlaces: [
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
      ],
      activo: true
    },
  {
    id: 11,
    titulo: 'Fiesta de Reyes con Stanz DJ',
    descripcion: 'La noche más mágica se baila en el Casino Rock Bar',
    texto: `
  La magia no termina el 5 de enero.
  Empieza cuando sube el volumen y la pista se llena.

  Este viernes, celebra la Fiesta de Reyes en el Casino Rock Bar con Stanz DJ
  y una sesión pensada para todos los regalos musicales:
  mix verbena, petardeo indie y una segunda parte de remember, tech y latin house.

  Desde las 19:30 calentamos motores
  y a partir de las 23:30 la noche se transforma en una auténtica fiesta.

  Porque los Reyes también saben dónde se vive la mejor noche.
  `,
    fechas: ['2026-01-05'],
    imagen: [
      media('eventos/reyes-navidad.jpg')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },
  {
    id: 10,
    titulo: 'Tardevieja con Roberto G',
    descripcion: 'La mejor previa antes de despedir el año',
    texto: `
  El 31 de diciembre no empieza por la noche.
  Empieza cuando la música marca el ritmo y el ambiente se calienta desde primera hora.

  Celebra la Tardevieja en el Casino Rock Bar con Roberto G y una sesión de clásicos electrónicos
  pensada para brindar, reencontrarse y arrancar el último día del año como se merece.

  Porque despedir el año también es una cuestión de actitud.
    `,
    fechas: ['2025-12-31'],
    imagen: [
      media('eventos/tardevieja-navidad.jpg')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 9,
    titulo: 'Cocido en dos vuelcos',
    descripcion: 'Un martes diferente se come a cucharadas',
    texto: `
  Hay días que piden bajar el ritmo, sentarse a la mesa y disfrutar como se hacía antes.
  En el Casino Rock Bar, los martes 23 y 30 de diciembre se sirven a fuego lento con nuestro cocido en dos vuelcos.

  Plato tradicional, ambiente cercano y ese punto especial que convierte una comida en plan.
  Ideal para romper la rutina y darse un homenaje como manda el invierno.

  Bajo reserva. Porque las cosas buenas se preparan con tiempo.
    `,
    fechas: ['2025-12-23', '2025-12-30'],
    imagen: [
      media('eventos/cocido-navidad.jpg')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 8,
    titulo: 'Monstanzbuena',
    descripcion: 'La Nochebuena también se baila',
    texto: `
  Antes de sentarte a la mesa, hay tiempo para mover el cuerpo.
  El 24 de diciembre el Casino Rock Bar celebra la Monstanzbuena con sesiones DJ desde el mediodía.

  Buena música, ambiente navideño sin formalidades y la excusa perfecta para empezar las fiestas
  rodeado de amigos, ritmo y espíritu rockero.

  Porque la Navidad también se vive con volumen alto.
    `,
    fechas: ['2025-12-24'],
    imagen: [
      media('eventos/tardebuena-navidad.jpg')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 7,
    titulo: 'Eventos en Navidad',
    descripcion: 'Estas fiestas se viven en el Casino Rock Bar',
    texto: ` Esta Navidad, el Casino Rock Bar se convierte en el punto de encuentro para los que saben disfrutar de las fiestas como se merecen.

Sesiones con DJ, tardes especiales, platos tradicionales y el mejor ambiente para celebrar diciembre entre amigos, música y buena energía.
Desde los días previos a Nochebuena hasta la despedida del año, te esperamos con eventos pensados para vivir la Navidad sin perder la esencia del rock.

Porque las fiestas también se celebran con volumen alto y actitud. `,
    fechas: ['2025-12-13', '2025-12-31'],
    imagen: [
      media('navidad/eventos-navidad.webp')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 6,
    titulo: ' XLVI Jornadas Cervantinas',
    descripcion: 'Historia, literatura y tradición',
    texto: `Celebra la historia y el legado de Miguel de Cervantes en Esquivias con una semana llena de actividades culturales, recreaciones históricas y visitas guiadas.
    El evento incluye representaciones de la famosa Boda de Cervantes y Catalina, rutas teatralizadas y mercados tradicionales que convierten el municipio en un auténtico viaje al siglo XVI.`,
    fechas: ['2025-12-06', '2025-12-08'],
    imagen: [
      media('eventos/itinerariojornadas2.webp'),
      media('eventos/itinerariojornadas1.webp'),
      media('eventos/cartajornadas2025.webp'),
      media('eventos/conciertosJornadasCervantinas.webp')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 5,
    titulo: 'Fiesta Remember',
    descripcion: 'Revive los 90 en el Casino Rock Bar',
    texto: `Vuelve la magia de los 90 y 2000 con los mejores temas de House y Techno House.
    El 15 de noviembre de 2025, a las 23:00.
    Una noche para revivir los grandes himnos de la pista con Stanz DJ al mando.`,
    fechas: ['2025-11-15'],
    imagen: [
      media('eventos/fiestaRemember2025.webp')
    ],
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
    imagen: [
      media('eventos/laPuraSangre.webp')
    ],
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
    imagen: [
      media('eventos/santo_tardeo2025.webp')
    ],
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  },

  {
    id: 2,
    titulo: 'Pasaje del Terror',
    descripcion: '¡Todo lo recaudado se destina al viaje de fin de curso!',
    texto: `Actividad organizada por los alumnos del C.E.I.P. Miguel de Cervantes (6º curso)
    Viernes 31 desde las 18:00 y Sábado 1 desde las 20:00. Entrada: 2 €.
    Prepárate para una noche escalofriante llena de sustos, risas y mucha adrenalina.`,
    fechas: ['2025-10-31', '2025-11-1'],
    imagen: [
      media('eventos/Pasaje_terror2025.webp')
    ],
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
    imagen: [
      media('eventos/Concierto.webp')
    ],
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
    imagen: [
      media('eventos/Burguer.webp')
    ],
    texto: `Ven y prueba nuestras hamburguesas artesanales...`,
    enlaces: [
      { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
      { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
    ],
    activo: true
  }
];
