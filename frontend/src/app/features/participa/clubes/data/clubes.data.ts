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

    logo: 'assets/clubes/garbanzo-negro/garbanzo-negro-logo.png',
    imagen: ['assets/clubes/garbanzo-negro/garbanzo-negro-logo.png'],

    actividades: [
      'Degustaciones mensuales',
      'Encuentros gastronómicos',
      'Talleres culturales'
    ],

    activo: true
  }
];
