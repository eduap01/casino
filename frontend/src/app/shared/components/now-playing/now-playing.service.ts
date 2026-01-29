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
  private readonly url =
    (typeof window !== 'undefined' && window.location.hostname === 'localhost')
      ? 'http://localhost:8000/api/music/now-playing'
      : '/api/music/now-playing';

  constructor(private http: HttpClient) {}

  getNowPlaying(): Observable<NowPlaying> {
    return this.http.get<NowPlaying>(this.url);
  }
}
