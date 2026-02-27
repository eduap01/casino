import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';

import { interval, Subscription, switchMap, startWith, catchError, of } from 'rxjs';

import { EVENTOS, Evento } from '../../../eventos/data/eventos.data';
import {
  NowPlayingService,
  NowPlaying,
} from '../../../../shared/components/now-playing/now-playing.service';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tv.html',
  styleUrl: './tv.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class Tv implements OnInit, OnDestroy, AfterViewInit {
  readonly intervalMs = 10000;
  readonly fadeMs = 700;

  slides: Evento[] = [];
  currentIndex = 0;
  isFading = false;

  private timer?: number;

  nowPlaying: NowPlaying | null = null;
  private nowPlayingSub?: Subscription;

  // --- Now Playing: robustez / fallback ---
  fallbackArt = '/media/now-playing-fallback.png';
  showNowPlaying = false;

  private lastGoodNowPlaying: NowPlaying | null = null;
  private lastGoodTs = 0;
  private readonly keepLastGoodMs = 180000; // 3 min
  // --------------------------------------

  progress = 0;

  @ViewChild('progressBar', { static: false })
  progressBar?: ElementRef<HTMLSpanElement>;

  private progressRafId: number | null = null;
  private progressStartT = 0;

  constructor(
    private meta: Meta,
    private nowPlayingService: NowPlayingService
  ) {
    // Bloquea indexación SOLO en esta ruta
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  ngOnInit(): void {
    const tvEventos = (EVENTOS as Evento[]).filter(
      (e) => e.activo !== false && e.visibleEn.includes('tv')
    );

    const upcoming = this.getUpcomingEventos(tvEventos);
    this.slides = upcoming.length ? upcoming : tvEventos;

    this.preloadImages(this.slides);

    this.timer = window.setInterval(() => this.next(), this.intervalMs);

    this.nowPlayingSub = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => this.nowPlayingService.getNowPlaying()),
        catchError(() => of(null as unknown as NowPlaying))
      )
      .subscribe((data) => {
        const now = Date.now();

        const looksValid =
          !!data &&
          ((data as any).isPlaying === true ||
            !!(data as any).title ||
            !!(data as any).artist ||
            !!(data as any).albumArt);

        if (looksValid) {
          this.lastGoodNowPlaying = data;
          this.lastGoodTs = now;
          this.nowPlaying = data;
          this.showNowPlaying = true;
          return;
        }

        // Si viene vacío o hay fallo puntual, mantenemos lo último bueno 3 minutos
        if (this.lastGoodNowPlaying && now - this.lastGoodTs < this.keepLastGoodMs) {
          this.nowPlaying = this.lastGoodNowPlaying;
          this.showNowPlaying = true;
          return;
        }

        // Pasado el margen, lo ocultamos
        this.nowPlaying = { isPlaying: false } as NowPlaying;
        this.showNowPlaying = false;
      });
  }

  ngAfterViewInit(): void {
    this.startProgress();
  }

  ngOnDestroy(): void {
    // Deja el robots normal para el resto del sitio al salir de /tv
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    if (this.timer) window.clearInterval(this.timer);
    this.nowPlayingSub?.unsubscribe();
    this.stopProgress();
  }

  onAlbumArtError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    if (img && img.src !== this.fallbackArt) {
      img.src = this.fallbackArt;
    }
  }

  next(): void {
    if (this.slides.length <= 1) return;

    this.isFading = true;

    const bar = this.progressBar?.nativeElement;
    if (bar) bar.style.transform = 'scaleX(1)';
    this.stopProgress();

    window.setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.isFading = false;

      this.startProgress();
    }, Math.floor(this.fadeMs * 0.55));
  }

  get current(): Evento | null {
    return this.slides[this.currentIndex] ?? null;
  }

  get heroImage(): string {
    return this.current?.imagen?.[0] ?? '';
  }

  private startProgress(): void {
    this.stopProgress();

    const el = this.progressBar?.nativeElement;
    if (!el) return;

    this.progressStartT = performance.now();
    const duration = this.intervalMs;

    el.style.transformOrigin = 'left center';
    el.style.transform = 'scaleX(0)';

    const tick = (t: number) => {
      const p = Math.min(1, (t - this.progressStartT) / duration);
      this.progress = p;
      el.style.transform = `scaleX(${p})`;

      if (p < 1) {
        this.progressRafId = requestAnimationFrame(tick);
      } else {
        this.progressRafId = null;
      }
    };

    this.progressRafId = requestAnimationFrame(tick);
  }

  private stopProgress(): void {
    if (this.progressRafId != null) {
      cancelAnimationFrame(this.progressRafId);
      this.progressRafId = null;
    }
  }

  private getUpcomingEventos(list: Evento[]): Evento[] {
    const today = this.startOfDay(new Date());

    return list
      .filter((e) => e.activo !== false)
      .filter((e) => this.hasAnyFutureDate(e.fechas, today))
      .sort(
        (a, b) =>
          this.getNearestFuture(a.fechas, today).getTime() -
          this.getNearestFuture(b.fechas, today).getTime()
      );
  }

  private hasAnyFutureDate(fechas: string[], today: Date): boolean {
    return fechas.some((f) => {
      const d = this.parseFecha(f);
      return d && this.startOfDay(d).getTime() >= today.getTime();
    });
  }

  private getNearestFuture(fechas: string[], today: Date): Date {
    const parsed = fechas
      .map((f) => this.parseFecha(f))
      .filter((d): d is Date => !!d)
      .map((d) => this.startOfDay(d))
      .filter((d) => d.getTime() >= today.getTime())
      .sort((a, b) => a.getTime() - b.getTime());

    return parsed[0] ?? today;
  }

  private parseFecha(raw: string): Date | null {
    const s = (raw ?? '').trim();
    if (!s) return null;

    const t = Date.parse(s);
    if (!Number.isNaN(t)) {
      const d = new Date(t);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) {
      const dd = Number(m[1]);
      const mm = Number(m[2]);
      const yyyy = Number(m[3]);
      const d = new Date(yyyy, mm - 1, dd);
      return Number.isNaN(d.getTime()) ? null : d;
    }

    return null;
  }

  private startOfDay(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private preloadImages(list: Evento[]): void {
    for (const e of list) {
      const src = e.imagen?.[0];
      if (!src) continue;
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
    }
  }

  formatFechasCartelera(fechas: string[]): string {
    const dates = (fechas ?? [])
      .map((f) => this.parseFecha(f))
      .filter((d): d is Date => !!d)
      .sort((a, b) => a.getTime() - b.getTime());

    if (!dates.length) return '';

    const fmtMonth = new Intl.DateTimeFormat('es-ES', { month: 'long' });

    const groups = new Map<string, { year: number; month: number; days: number[] }>();
    for (const d of dates) {
      const year = d.getFullYear();
      const month = d.getMonth();
      const key = `${year}-${month}`;
      if (!groups.has(key)) groups.set(key, { year, month, days: [] });
      groups.get(key)!.days.push(d.getDate());
    }

    const ordered = Array.from(groups.values()).sort((a, b) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    );

    const parts = ordered.map((g) => {
      const uniqueDays = Array.from(new Set(g.days)).sort((a, b) => a - b);

      const daysText =
        uniqueDays.length === 1
          ? `${uniqueDays[0]}`
          : uniqueDays.length === 2
          ? `${uniqueDays[0]} y ${uniqueDays[1]}`
          : `${uniqueDays.slice(0, -1).join(', ')} y ${
              uniqueDays[uniqueDays.length - 1]
            }`;

      const monthName = fmtMonth.format(new Date(g.year, g.month, 1));
      const monthCap = monthName.charAt(0).toUpperCase() + monthName.slice(1);

      return `${daysText} de ${monthCap}`;
    });

    return parts.length === 1
      ? parts[0]
      : `${parts.slice(0, -1).join(' y ')} y ${parts[parts.length - 1]}`;
  }
}
