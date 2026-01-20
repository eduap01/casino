export interface ClubItem {
  id: number;
  nombre: string;
  lema?: string;
  subtitulo?: string;
  tipo: string;
  descripcion: string;

  esDestacado?: boolean;

  logo: string;
  imagen: string[];

  actividades?: string[];
  activo: boolean;
}

const MEDIA_BASE_URL = 'https://casinorockbar.com/media';
const media = (path: string) => `${MEDIA_BASE_URL}/${path}`;

export const CLUBES: ClubItem[] = [
  {
    id: 1,
    nombre: 'El Garbanzo Negro',
    lema: 'De Cuchara',
    subtitulo: '¡Vuelven los Yonkis de la Cuchara!',
    tipo: 'Asociación Gastronómica Cultural',
    descripcion:
      'Club gastronómico-cultural dedicado al cocido, la cuchara y la tradición culinaria.',

    esDestacado: true,

    logo: media('clubes/garbanzo-negro/garbanzo-negro-logo.png'),
    imagen: [
      media('clubes/garbanzo-negro/garbanzo-negro-logo.png')
    ],

    actividades: [
      'Degustaciones mensuales',
      'Encuentros gastronómicos',
      'Talleres culturales'
    ],

    activo: true
  }
];
