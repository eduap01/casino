import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop } from '../../../../shared/components/back-to-top/back-to-top';
import { PlatoItem } from '../../components/plato-item/plato-item';

import { SeoService } from '../../../../shared/seo.service';
import { CartaService } from '../../services/carta.service';
import { Seccion } from '../../models/carta.model';

@Component({
  selector: 'app-carta-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderMini,
    BackToTop,
    PlatoItem,
  ],
  templateUrl: './carta-page.html',
  styleUrl: './carta-page.scss'
})
export class CartaPage implements OnInit {
  secciones: Seccion[] = [];

  constructor(private seo: SeoService, private cartaService: CartaService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Carta | Restaurante y Rock Bar en Esquivias (Toledo) | Casino Rock Bar',
      description:
        'Consulta la carta de Casino Rock Bar: raciones, hamburguesas, pizzas, cafés y postres. Restaurante y rock bar en Esquivias (Toledo), cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/carta',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });

    this.cartaService.getCarta().subscribe(secciones => {
      this.secciones = secciones;
    });
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
