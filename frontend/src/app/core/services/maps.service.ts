import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapsService {
  private apiUrl = 'http://localhost:8000/maps/config';

  constructor(private http: HttpClient) {}

  getGoogleMapsConfig(): Observable<{ apiKey: string }> {
    return this.http.get<{ apiKey: string }>(this.apiUrl);
  }
}
