import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-menus-page',
  standalone: true,
  imports: [CommonModule, HeaderMini],
  templateUrl: './menus-page.html',
  styleUrls: ['./menus-page.scss']
})
export class MenusPage implements OnInit {
  imagenSeleccionada: string | null = null;

  menus = [
    'https://casinorockbar.com/media/menus/menu25.webp',
    'https://casinorockbar.com/media/menus/menu27.webp',
    'https://casinorockbar.com/media/menus/menu29.webp'
  ];

  menusDia = [
    { imagen: 'https://casinorockbar.com/media/menus/menu_otis.jpg',  titulo: 'Menú Otis',  precio: '16€',  descripcion: '' },
    { imagen: 'https://casinorockbar.com/media/menus/menu_elvis.jpg', titulo: 'Menú Elvis', precio: '22€',  descripcion: '' },
    { imagen: 'https://casinorockbar.com/media/menus/menu_janis.jpg', titulo: 'Menú Janis', precio: '27€',  descripcion: '' },
    { imagen: 'https://casinorockbar.com/media/menus/menu_freddie.jpg', titulo: 'Menú Freddie', precio: '33€',  descripcion: '' },
    { imagen: 'https://casinorockbar.com/media/menus/menu_tina.jpg',  titulo: 'Menú Tina',  precio: '36€',  descripcion: '' },
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Menús | Restaurante en Esquivias (Toledo) | Casino Rock Bar',
      description:
        'Consulta nuestros menús en Casino Rock Bar: restaurante en Esquivias (Toledo) con ambiente rock. Cerca de Illescas, Seseña y Madrid Sur.',
      canonical: 'https://casinorockbar.com/menus',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

  abrirModal(imagen: string): void {
    this.imagenSeleccionada = imagen;
  }

  cerrarModal(): void {
    this.imagenSeleccionada = null;
  }
}
