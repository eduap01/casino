import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { MenusPage } from './features/menus/pages/menus-page/menus-page';
import { CartaPage } from './features/carta/pages/carta-page/carta-page';
import { EventosPage } from './features/eventos/pages/eventos-page/eventos-page';
import { Welcome } from './features/welcome/pages/welcome-page/welcome-page';

export const routes: Routes = [
  { path: 'welcome', component: Welcome },
  { path: 'menus', component: MenusPage },
  { path: 'carta', component: CartaPage },
  { path: 'eventos', component: EventosPage },
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
