import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EVENTOS } from '../../features/eventos/data/eventos.data';
import { EventosService } from '../../features/eventos/services/eventos.service';

@Injectable({ providedIn: 'root' })
export class ValidEventGuard implements CanActivate {
  constructor(private router: Router, private eventosService: EventosService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    const nav = this.router.getCurrentNavigation();
    const stateActivo = nav?.extras?.state?.['activo'];
    const historyActivo = Object.prototype.hasOwnProperty.call(history.state || {}, 'activo')
      ? history.state['activo']
      : undefined;

    const activoState = stateActivo ?? historyActivo;

    // 1) Si viene con state desde la app, úsalo directamente
    if (activoState === false) {
      this.router.navigate(['/en-construccion']);
      return false;
    }
    if (activoState === true) return true;

    // 2) Si llega por URL directa (sin state), buscar primero en estáticos
    const id = route.paramMap.get('id') ?? '';
    const staticEvento = EVENTOS.find(e => String(e.id) === id);
    if (staticEvento) {
      if (!staticEvento.activo) {
        this.router.navigate(['/en-construccion']);
        return false;
      }
      return true;
    }

    // 3) Si no está en estáticos, consultar la API (eventos creados desde la app)
    return this.eventosService.getEventoById(id).pipe(
      map(evento => {
        if (!evento || !evento.activo) {
          this.router.navigate(['/en-construccion']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/en-construccion']);
        return of(false);
      })
    );
  }
}
