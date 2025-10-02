import { Component, Input, ElementRef, Renderer2, ViewChild, HostListener } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-evento-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './evento-item.html',
  styleUrls: ['./evento-item.scss']
})
export class EventoItem {
  @Input() titulo!: string;
  @Input() descripcion?: string;
  @Input() fecha?: string;
  @Input() imagen!: string;
  @Input() enlace?: string;

  @ViewChild('overlay') overlayEl?: ElementRef<HTMLDivElement>;
  showModal = false;

  constructor(private renderer: Renderer2) {}

  openModal(): void {
    this.showModal = true;
    // Espera a que *ngIf pinte el overlay y lo movemos al <body>
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
  onEsc() { if (this.showModal) this.closeModal(); }
}
