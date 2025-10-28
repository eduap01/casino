import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { ValidEventGuard } from './core/guards/valid-event.guard';
import { BlockedRouteGuard } from './core/guards/blocked-route.guard';

import { MenusPage } from './features/menus/pages/menus-page/menus-page';
import { CartaPage } from './features/carta/pages/carta-page/carta-page';
import { EventosPage } from './features/eventos/pages/eventos-page/eventos-page';
import { Welcome } from './features/welcome/pages/welcome-page/welcome-page';
import { EventoDetallePage } from './features/eventos/pages/evento-detalle-page/evento-detalle-page';
import { SobreNosotrosPage } from './features/sobre-nosotros/pages/sobre-nosotros-page/sobre-nosotros-page';
import { ReservaEventoPage } from './features/reserva-evento/pages/reserva-evento-page/reserva-evento-page';
import { QuienesSomosPage } from './features/sobre-nosotros/pages/quienes-somos-page/quienes-somos-page';
import { NuestraHistoriaPage } from './features/sobre-nosotros/pages/nuestra-historia-page/nuestra-historia-page';
import { ParticipaPage } from './features/participa/pages/participa-page/participa-page';
import { ClubesPage } from './features/participa/pages/clubes-page/clubes-page';
import { MerchandisingPage } from './features/merchandising/pages/merchandising-page/merchandising-page';
import { EnConstruccion } from './shared/pages/en-construccion/en-construccion';



export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: 'menus', component: MenusPage },
  { path: 'carta', component: CartaPage },
  { path: 'eventos', component: EventosPage },
  {
  path: 'eventos/:id',
    canActivate: [ValidEventGuard],
    loadComponent: () => import('./features/eventos/pages/evento-detalle-page/evento-detalle-page')
      .then(m => m.EventoDetallePage)
  },
  {
    path: 'en-construccion',
    loadComponent: () => import('./shared/pages/en-construccion/en-construccion')
      .then(m => m.EnConstruccion)
  },
  { path: 'sobre-nosotros', canActivate: [BlockedRouteGuard], component: SobreNosotrosPage },
  { path: 'quienes-somos', canActivate: [BlockedRouteGuard], component: QuienesSomosPage },
  { path: 'nuestra-historia', canActivate: [BlockedRouteGuard], component: NuestraHistoriaPage },
  { path: 'reserva-evento', canActivate: [BlockedRouteGuard], component: ReservaEventoPage },
  { path: 'participa', canActivate: [BlockedRouteGuard], component: ParticipaPage },
  { path: 'clubes',canActivate: [BlockedRouteGuard], component: ClubesPage },
  { path: 'merchandising', canActivate: [BlockedRouteGuard], component: MerchandisingPage },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' }
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollOffset: [0, 70],
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
