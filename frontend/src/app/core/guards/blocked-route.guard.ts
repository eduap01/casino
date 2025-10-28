import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class BlockedRouteGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    this.router.navigate(['/en-construccion']);
    return false;
  }
}
