import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 🍿 Importaciones de tus componentes
import { Compartir } from '../../components/compartir/compartir';
import { Ensaladas } from '../../components/ensaladas/ensaladas';
import { Zipotes } from '../../components/zipotes/zipotes';
import { Molletes } from '../../components/molletes/molletes';
import { Sandwiches } from '../../components/sandwiches/sandwiches';
import { Hamburguesas } from '../../components/hamburguesas/hamburguesas';
import { Cafes } from '../../components/cafes/cafes';
import { Postres } from '../../components/postres/postres';
import { Cervezas } from '../../components/cervezas/cervezas';
import { Arroces } from '../../components/arroces/arroces';
import { Pizzas } from '../../components/pizzas/pizzas';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { BackToTop } from '../../../../shared/components/back-to-top/back-to-top';

// 🎥 Importa Lucide y los iconos que usarás
import { LucideAngularModule, Handshake, Salad, Sandwich, Hamburger, Coffee, Pizza as PizzaIcon, Cake, Beer, Utensils } from 'lucide-angular';

@Component({
  selector: 'app-carta-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    // Componentes de la carta
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
    BackToTop,
    LucideAngularModule,

    // Iconos Lucide

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
