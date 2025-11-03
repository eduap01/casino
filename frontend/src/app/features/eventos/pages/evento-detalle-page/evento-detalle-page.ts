import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { EVENTOS } from '../../data/eventos.data';
import {LucideAngularModule} from 'lucide-angular';


@Component({
  selector: 'app-evento-detalle-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './evento-detalle-page.html',
  styleUrls: ['./evento-detalle-page.scss']
})
export class EventoDetallePage {
  id!: number;
  evento: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.evento = EVENTOS.find((e: any) => e.id === this.id);
    if (!this.evento) this.router.navigate(['/en-construccion']);
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
