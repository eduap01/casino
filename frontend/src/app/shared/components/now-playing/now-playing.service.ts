import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  trackUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class NowPlayingService {
  // En local:
  private readonly url = 'http://localhost:8000/api/music/now-playing';

  // En producción (cuando lo tengas en tu dominio):
  // private readonly url = '/api/music/now-playing';

  constructor(private http: HttpClient) {}

  getNowPlaying(): Observable<NowPlaying> {
    return this.http.get<NowPlaying>(this.url);
  }
}
