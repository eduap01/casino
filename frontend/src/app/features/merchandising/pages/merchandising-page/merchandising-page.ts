import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop} from '../../../../shared/components/back-to-top/back-to-top';
import { MerchandisingItem } from '../../components/merchandising-item/merchandising-item';


@Component({
  selector: 'app-merchandising-page',
  standalone: true,
  imports: [CommonModule, HeaderMini, BackToTop, MerchandisingItem],
  templateUrl: './merchandising-page.html',
  styleUrls: ['./merchandising-page.scss']
})
export class MerchandisingPage {
  productos = [
    {
      imagen: 'assets/merch/camisetaBirrafest.webp',
      titulo: 'Camiseta Birrafest',
      precio: '24,99 €'
    },
    {
      imagen: 'assets/merch/tazaCasino.webp',
      titulo: 'Taza Casino',
      precio: '14,99 €'
    },
    {
      imagen: 'assets/merch/gorraCasino.webp',
      titulo: 'Gorra Casino',
      precio: '19,99 €'
    }
  ];
}
