import { Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // <- necesario para acceder al JS de Bootstrap

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrls: ['./carrusel.scss']
})
export class Carrusel implements AfterViewInit, OnDestroy {
  @Input() images: { src: string; alt: string }[] = [];
  @Input() variant: 'hero' | 'small' = 'hero';

  @ViewChild('carouselElement') carouselElement!: ElementRef<HTMLElement>;
  private carouselInstance: any;

  ngAfterViewInit(): void {
    // Re-inicializa el JS de Bootstrap sobre este carrusel
    if (this.carouselElement?.nativeElement) {
      this.carouselInstance = new bootstrap.Carousel(this.carouselElement.nativeElement, {
        interval: 4000,
        ride: 'carousel',
        pause: false,
        wrap: true
      });
    }
  }

  ngOnDestroy(): void {
    // Elimina la instancia al salir para evitar fugas
    if (this.carouselInstance) {
      this.carouselInstance.dispose();
    }
  }
}
