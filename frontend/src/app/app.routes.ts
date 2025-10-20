import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { MenusPage } from './features/menus/pages/menus-page/menus-page';
import { CartaPage } from './features/carta/pages/carta-page/carta-page';
import { EventosPage } from './features/eventos/pages/eventos-page/eventos-page';
import { Welcome } from './features/welcome/pages/welcome-page/welcome-page';
import { EventoDetallePage } from './features/eventos/pages/evento-detalle-page/evento-detalle-page';
import { SobreNosotrosPage } from './features/sobre-nosotros/pages/sobre-nosotros-page/sobre-nosotros-page';
import { ReservaEventoPage } from './features/reserva-evento/pages/reserva-evento-page/reserva-evento-page';
import { QuienesSomosPage } from './features/sobre-nosotros/pages/quienes-somos-page/quienes-somos-page';
import { NuestraHistoriaPage } from './features/sobre-nosotros/pages/nuestra-historia-page/nuestra-historia-page';


export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: 'menus', component: MenusPage },
  { path: 'carta', component: CartaPage },
  { path: 'eventos', component: EventosPage },
  { path: 'eventos/:id', component: EventoDetallePage },
  { path: 'sobre-nosotros', component: SobreNosotrosPage },
  { path: 'quienes-somos', component: QuienesSomosPage },
  { path: 'nuestra-historia', component: NuestraHistoriaPage },
  { path: 'reserva-evento', component: ReservaEventoPage },
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
