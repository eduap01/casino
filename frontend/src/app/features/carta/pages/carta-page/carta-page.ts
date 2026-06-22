import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Compartir } from '../../components/compartir/compartir';
import { Especiales } from '../../components/especiales/especiales';
import { Ensaladas } from '../../components/ensaladas/ensaladas';
import { Zipotes } from '../../components/zipotes/zipotes';
import { Molletes } from '../../components/molletes/molletes';
import { Tostas } from '../../components/tostas/tostas';
import { Sandwiches } from '../../components/sandwiches/sandwiches';
import { Hamburguesas } from '../../components/hamburguesas/hamburguesas';
import { Perritos } from '../../components/perritos/perritos';
import { Cafes } from '../../components/cafes/cafes';
import { Postres } from '../../components/postres/postres';
import { Helados } from '../../components/helados/helados';
import { Batidos } from '../../components/batidos/batidos';
import { Cocteles } from '../../components/cocteles/cocteles';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop } from '../../../../shared/components/back-to-top/back-to-top';

import { SeoService } from '../../../../shared/seo.service';

import { LucideAngularModule, Handshake, Salad, Sandwich, Hamburger, Coffee, Pizza as PizzaIcon, Cake, Beer, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-carta-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    // Componentes activos de la carta
    Compartir,
    Especiales,
    Ensaladas,
    Zipotes,
    Molletes,
    Tostas,
    Sandwiches,
    Hamburguesas,
    Perritos,
    Cafes,
    Postres,
    Helados,
    Batidos,
    Cocteles,
    HeaderMini,
    BackToTop,
    LucideAngularModule,

  ],
  templateUrl: './carta-page.html',
  styleUrl: './carta-page.scss'
})
export class CartaPage implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Carta | Restaurante y Rock Bar en Esquivias (Toledo) | Casino Rock Bar',
      description:
        'Consulta la carta de Casino Rock Bar: raciones, hamburguesas, pizzas, cafés y postres. Restaurante y rock bar en Esquivias (Toledo), cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/carta',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
