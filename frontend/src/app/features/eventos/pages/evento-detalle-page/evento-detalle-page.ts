import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-evento-detalle-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-detalle-page.html',
  styleUrls: ['./evento-detalle-page.scss']
})
export class EventoDetallePage {
  id!: number;
  evento: any;

  eventos = [
    {
      titulo: 'Santo Tardeo',
      descripcion: '¡Ven disfrazado y sigue la fiesta entre vivos y muertos!',
      fechas: ['2025-11-1'],
      imagen: 'assets/eventos/santo_tardeo2025.jpg',
      texto: `El 1 de noviembre no te pierdas la mejor tarde post-Halloween con Stanz DJ.
              Música, ambiente y mucha energía desde las 17:30 h. `,
      enlaces: [
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
      ]
    },
    {
      titulo: 'Pasaje del Terror',
      descripcion: 'Actividad organizada por los alumnos del C.E.I.P. Miguel de Cervantes (6º curso)',
      fechas: ['2025-10-31','2025-11-1'],
      imagen: 'assets/eventos/Pasaje_terror2025.jpg',
      texto: `Prepárate para una noche escalofriante llena de sustos, risas y mucha adrenalina.
              Viernes 31 desde las 18:00 y Sábado 1 desde las 20:00.
              Entrada: 2 € — ¡Todo lo recaudado se destina al viaje de fin de curso!`,
      enlaces: [
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
      ]
    },
    {
      titulo: 'Hamburbeza',
      descripcion: 'Las 8 mejores hamburguesas del mundo.',
      fechas: ['2025-10-10', '2025-10-12'],
      imagen: 'assets/eventos/Burguer.jpeg',
      texto: `Ven y prueba nuestras hamburguesas artesanales, preparadas con ingredientes frescos y música en vivo.`,
      enlaces: [
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
      ]
    },
    {
      titulo: 'Colegui Fest',
      descripcion: 'Conciertos en vivo.',
      fechas: ['2025-10-25'],
      imagen: 'assets/eventos/Concierto.jpeg',
      texto: `Disfruta del mejor ambiente rock con bandas locales e invitados especiales. ¡No te lo pierdas!`,
      enlaces: [
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' },
        { nombre: 'Facebook', url: 'https://www.facebook.com/casinorockbar/' }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.evento = this.eventos[this.id];
  }


  getFechasCompactas(): string {
    if (!this.evento?.fechas || this.evento.fechas.length === 0) return '';

    const fechasOrdenadas = this.evento.fechas.sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    );

    if (fechasOrdenadas.length === 1) {
      return new Date(fechasOrdenadas[0]).toLocaleDateString('es-ES');
    }

    const primera = new Date(fechasOrdenadas[0]).toLocaleDateString('es-ES');
    const ultima = new Date(fechasOrdenadas[fechasOrdenadas.length - 1]).toLocaleDateString('es-ES');

    return `${primera} - ${ultima}`;
  }

  openExternal(url: string): void {
    try {
      const safeUrl = new URL(url);
      window.open(safeUrl.href, '_blank');
    } catch {
      this.router.navigate(['/welcome']);
    }
  }
}
