import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';

@Component({
  selector: 'app-menus-page',
  standalone: true,
  imports: [CommonModule, HeaderMini],
  templateUrl: './menus-page.html',
  styleUrls: ['./menus-page.scss']
})
export class MenusPage {
  imagenSeleccionada: string | null = null;

  menus = [
    'assets/menus/menu25.webp',
    'assets/menus/menu27.webp',
    'assets/menus/menu29.webp'
  ];

  abrirModal(imagen: string): void {
    this.imagenSeleccionada = imagen;
  }

  cerrarModal(): void {
    this.imagenSeleccionada = null;
  }
}
