import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop } from '../../../../shared/components/back-to-top/back-to-top';
import { MerchandisingItem } from '../../components/merchandising-item/merchandising-item';

@Component({
  selector: 'app-merchandising-page',
  standalone: true,
  imports: [CommonModule, HeaderMini, BackToTop, MerchandisingItem],
  templateUrl: './merchandising-page.html',
  styleUrls: ['./merchandising-page.scss']
})
export class MerchandisingPage {

  imagenSeleccionada: string | null = null;

  readonly mediaBase = 'https://casinorockbar.com/media';

  productos = [
    { imagen: 'merch/1.webp',  titulo: 'Camiseta 1',  descripcion: 'Zipote Rock Fest 2017', precio: '10 €' },
    { imagen: 'merch/2.webp',  titulo: 'Camiseta 2',  descripcion: 'ReguetOFF', precio: '10 €' },
    { imagen: 'merch/3.webp',  titulo: 'Camiseta 3',  descripcion: 'Cthulhu', precio: '10 €' },
    { imagen: 'merch/4.webp',  titulo: 'Camiseta 4',  descripcion: 'Calavera en llamas', precio: '10 €' },
    { imagen: 'merch/5.webp',  titulo: 'Camiseta 5',  descripcion: 'Good Morning Party - Bola 8', precio: '10 €' },
    { imagen: 'merch/6.webp',  titulo: 'Camiseta 6',  descripcion: 'Colegui Fest 2025', precio: '10 €' },
    { imagen: 'merch/7.webp',  titulo: 'Camiseta 7',  descripcion: 'Hamburbeza Fest 2025', precio: '10 €' },
    { imagen: 'merch/8.webp',  titulo: 'Camiseta 8',  descripcion: 'Rock and Roll en Las Venas', precio: '10 €' },
    { imagen: 'merch/9.webp',  titulo: 'Camiseta 9',  descripcion: 'Wrath of Zeus', precio: '10 €' },
    { imagen: 'merch/10.webp', titulo: 'Camiseta 10', descripcion: 'Birrafest', precio: '10 €' },
    { imagen: 'merch/11.webp', titulo: 'Camiseta 11', descripcion: 'Freddie Mercury', precio: '10 €' },
    { imagen: 'merch/12.webp', titulo: 'Camiseta 12', descripcion: 'E.T', precio: '10 €' },
    { imagen: 'merch/13.webp', titulo: 'Camiseta 13', descripcion: 'BRF', precio: '10 €' }
  ].map(p => ({
    ...p,
    imagen: `${this.mediaBase}/${p.imagen}`
  }));

  abrirModal(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  cerrarModal() {
    this.imagenSeleccionada = null;
  }
}
