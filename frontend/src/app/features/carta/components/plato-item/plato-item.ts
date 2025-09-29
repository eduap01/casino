import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plato-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plato-item.html',
  styleUrl: './plato-item.scss'
})
export class PlatoItem {
  @Input() nombre!: string;
  @Input() descripcion?: string;
  @Input() precio!: string;
  @Input() iconos: string[] = [];
}

