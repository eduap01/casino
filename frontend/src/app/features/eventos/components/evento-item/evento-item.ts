import { Component, Input, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-evento-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento-item.html',
  styleUrls: ['./evento-item.scss']
})
export class EventoItem {
  @Input() titulo!: string;
  @Input() id!: number;
  @Input() descripcion?: string;
  @Input() fechas: string[] | null = [];
  @Input() imagen!: string;
  @Input() enlace?: string;
  @Input() activo!: boolean;

  @ViewChild('overlay') overlayEl?: ElementRef<HTMLDivElement>;
  showModal = false;

    constructor(private renderer: Renderer2, private router: Router) {} // 👈 INYECTAMOS Router

  irADetalle(): void {
    this.router.navigate(['/eventos', this.id], {
      state: { activo: this.activo }
    });
  }

  openModal(): void {
    this.showModal = true;
    setTimeout(() => {
      const el = this.overlayEl?.nativeElement;
      if (el && el.parentElement !== document.body) {
        this.renderer.appendChild(document.body, el);
      }
      document.body.style.overflow = 'hidden';
    });
  }

  closeModal(): void {
    this.showModal = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.showModal) this.closeModal();
  }


  getFechasCompactas(): string {
    if (!this.fechas || this.fechas.length === 0) return '';

    const parseDate = (str: string): Date => {
      const [year, month, day] = str.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const formatDate = (date: Date): string => {
      const d = String(date.getDate()).padStart(2, '0');
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const y = date.getFullYear();
      return `${d}/${m}/${y}`;
    };

    const fechasOrdenadas = this.fechas
      .map((f: string) => parseDate(f))
      .sort((a, b) => a.getTime() - b.getTime());

    if (fechasOrdenadas.length === 1) {
      return formatDate(fechasOrdenadas[0]);
    }

    const primera = formatDate(fechasOrdenadas[0]);
    const ultima = formatDate(fechasOrdenadas[fechasOrdenadas.length - 1]);
    return `${primera} - ${ultima}`;
  }
}
