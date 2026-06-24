import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Seccion } from '../models/carta.model';

@Injectable({ providedIn: 'root' })
export class CartaService {
  private readonly apiUrl = 'https://www.casinorockbar.com/api/carta';

  constructor(private http: HttpClient) {}

  getCarta(): Observable<Seccion[]> {
    return this.http.get<Seccion[]>(this.apiUrl, {
      headers: { 'Cache-Control': 'no-cache' }
    }).pipe(
      catchError(() => of([]))
    );
  }
}
