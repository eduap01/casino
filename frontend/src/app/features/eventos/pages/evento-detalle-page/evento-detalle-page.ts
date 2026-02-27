import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { EVENTOS } from '../../data/eventos.data';
import { LucideAngularModule } from 'lucide-angular';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-evento-detalle-page',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './evento-detalle-page.html',
  styleUrls: ['./evento-detalle-page.scss']
})
export class EventoDetallePage implements OnInit {
  id!: number;
  evento: any;

  currentImage = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.evento = EVENTOS.find((e: any) => e.id === this.id);
    if (!this.evento) this.router.navigate(['/en-construccion']);
  }

  ngOnInit(): void {
    if (!this.evento) return;

    const titulo = (this.evento?.titulo ?? 'Evento').toString().trim();
    const descripcion = (this.evento?.descripcion ?? '').toString().trim();

    const title = `${titulo} | Evento en Esquivias (Toledo) | Casino Rock Bar`;

    const description =
      (descripcion ? `${descripcion} ` : '') +
      'Consulta fechas, información y enlaces del evento en Casino Rock Bar (Esquivias, Toledo). Música en directo y eventos cerca de Illescas y Madrid Sur.';

    const canonical = `https://casinorockbar.com/eventos/${this.id}`;

    const ogImage =
      (Array.isArray(this.evento?.imagen) && this.evento.imagen[0]) ? this.evento.imagen[0] : 'https://casinorockbar.com/media/logoCasino.png';

    this.seo.setSeo({
      title,
      description,
      canonical,
      ogImage,
      robots: 'index, follow'
    });
  }

  nextImage() {
    if (!this.evento?.imagen) return;
    this.currentImage =
      (this.currentImage + 1) % this.evento.imagen.length;
  }

  prevImage() {
    if (!this.evento?.imagen) return;
    this.currentImage =
      (this.currentImage - 1 + this.evento.imagen.length) %
      this.evento.imagen.length;
  }

  goToImage(index: number) {
    this.currentImage = index;
  }

  // ===========================
  //   TUS MÉTODOS ORIGINALES
  // ===========================

  getFechasCompactas(): string {
    if (!this.evento?.fechas || this.evento.fechas.length === 0) return '';

    const fechasOrdenadas = this.evento.fechas.sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    );

    if (fechasOrdenadas.length === 1) {
      return new Date(fechasOrdenadas[0]).toLocaleDateString('es-ES');
    }

    const primera = new Date(fechasOrdenadas[0]).toLocaleDateString('es-ES');
    const ultima = new Date(
      fechasOrdenadas[fechasOrdenadas.length - 1]
    ).toLocaleDateString('es-ES');

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
