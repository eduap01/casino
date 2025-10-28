import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventosService } from '../../features/eventos/services/eventos.service';

@Injectable({ providedIn: 'root' })
export class ValidEventGuard implements CanActivate {
  constructor(private eventosService: EventosService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/en-construccion']);
      return false;
    }

    try {
      const evento = await this.eventosService.getEventoById(id);
      if (!evento) {
        this.router.navigate(['/en-construccion']);
        return false;
      }
      return true;
    } catch {
      this.router.navigate(['/en-construccion']);
      return false;
    }
  }
}
