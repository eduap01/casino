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
      titulo: 'Hamburbeza',
      descripcion: 'Las 8 mejores hamburguesas del mundo.',
      fecha: '2025-10-15',
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
      fecha: '2025-10-25',
      imagen: 'assets/eventos/Concierto.jpeg',
      texto: `Disfruta del mejor ambiente rock con bandas locales e invitados especiales. ¡No te lo pierdas!`,
      enlaces: [
        /*{ nombre: 'Entradas', url: 'https://entradas.casinorockbar.com' },*/
        { nombre: 'Instagram', url: 'https://www.instagram.com/casinorockbar/' }
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

  openExternal(url: string): void {
    try {
      const safeUrl = new URL(url);
      window.open(safeUrl.href, '_blank');
    } catch {
      this.router.navigate(['/welcome']);
    }
  }
}
