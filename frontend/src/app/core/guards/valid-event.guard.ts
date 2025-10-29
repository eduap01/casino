import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EVENTOS } from '../../features/eventos/data/eventos.data';

@Injectable({ providedIn: 'root' })
export class ValidEventGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const nav = this.router.getCurrentNavigation();
    const stateActivo = nav?.extras?.state?.['activo'];
    const historyActivo = Object.prototype.hasOwnProperty.call(history.state || {}, 'activo')
      ? history.state['activo']
      : undefined;

    const activoState = stateActivo ?? historyActivo;
    const id = Number(route.paramMap.get('id'));

    // 1) Si viene con state desde la app, úsalo directamente
    if (activoState === false) {
      this.router.navigate(['/en-construccion']);
      return false;
    }
    if (activoState === true) return true;

    // 2) Si llega por URL directa (sin state), consulta la fuente única
    const evento = EVENTOS.find(e => e.id === id);
    if (!evento || !evento.activo) {
      this.router.navigate(['/en-construccion']);
      return false;
    }

    return true;
  }
}
