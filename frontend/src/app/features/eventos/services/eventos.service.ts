import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evento } from '../data/eventos.data';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private readonly apiUrl = `${environment.apiUrl}/eventos`;

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl).pipe(
      catchError(() => of([]))
    );
  }

  getEventoById(id: string): Observable<Evento | undefined> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of(undefined))
    );
  }

  deleteEvento(id: string, apiKey: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: { 'X-API-Key': apiKey }
    });
  }
}
