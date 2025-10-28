import { Component } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Compartir } from '../../components/compartir/compartir';
import { Ensaladas } from '../../components/ensaladas/ensaladas';
import { Zipotes } from '../../components/zipotes/zipotes';
import { Molletes } from '../../components/molletes/molletes';
import { Sandwiches } from '../../components/sandwiches/sandwiches';
import { Hamburguesas } from '../../components/hamburguesas/hamburguesas';
import { Cafes } from '../../components/cafes/cafes';
import { Postres } from '../../components/postres/postres';
import { Batidos } from '../../components/batidos/batidos';
import { Bebidas } from '../../components/bebidas/bebidas';
import { Cervezas } from '../../components/cervezas/cervezas';
import { Helados } from '../../components/helados/helados';
import { Arroces } from '../../components/arroces/arroces';
import { Pizzas } from '../../components/pizzas/pizzas';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop} from '../../../../shared/components/back-to-top/back-to-top';



@Component({
  selector: 'app-carta-page',
  standalone:true,
  imports: [
    CommonModule,
    RouterModule,
    Compartir,
    Ensaladas,
    Zipotes,
    Molletes,
    Sandwiches,
    Hamburguesas,
    Cafes,
    Postres,
    Cervezas,
    Arroces,
    Pizzas,
    HeaderMini,
    BackToTop
  ],
  templateUrl: './carta-page.html',
  styleUrl: './carta-page.scss'
})


export class CartaPage {
  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

