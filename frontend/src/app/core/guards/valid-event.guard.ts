import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ValidEventGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const nav = this.router.getCurrentNavigation();
    const stateActivo = nav?.extras?.state?.['activo'];
    const historyActivo = Object.prototype.hasOwnProperty.call(history.state || {}, 'activo')
      ? history.state['activo']
      : undefined;

    const activo = stateActivo ?? historyActivo;

    // Añadimos esta parte para bloquear accesos directos (sin state)
    if (activo === undefined) {
      console.warn('Intento de acceso directo sin state, redirigiendo...');
      this.router.navigate(['/en-construccion']);
      return false;
    }

    if (activo === false) {
      console.warn('Evento inactivo, redirigiendo...');
      this.router.navigate(['/en-construccion']);
      return false;
    }

    return true;
  }
}
