import { Routes } from '@angular/router';
import { MenusPage } from './features/menus/pages/menus-page/menus-page';
import { CartaPage } from './features/carta/pages/carta-page/carta-page';
import { EventosPage } from './features/eventos/pages/eventos-page/eventos-page';

export const routes: Routes = [
  { path: 'menus', component: MenusPage },
  { path: 'carta', component: CartaPage },
  { path: 'eventos', component: EventosPage },
  { path: '', redirectTo: 'carta', pathMatch: 'full' },
  { path: '**', redirectTo: 'carta' }
];
