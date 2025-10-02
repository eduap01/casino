import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrls: ['./carrusel.scss']
})
export class Carrusel {
  @Input() images: { src: string; alt: string }[] = [];
  @Input() variant: 'hero' | 'small' = 'hero';
}
