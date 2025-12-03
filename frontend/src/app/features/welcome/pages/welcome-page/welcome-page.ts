import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { LucideAngularModule} from 'lucide-angular';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule,
    LucideAngularModule],
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss']
})
export class Welcome implements AfterViewInit, OnDestroy {
  images = [
    { src: 'assets/logoCasinoVertical.png', alt: 'Logo' },
    { src: 'assets/eventos/cartajornadas2025.webp', alt: 'Conciertos Jornadas Cervantinas' },
    { src: 'assets/eventos/conciertosJornadasCervantinas.webp', alt: 'Fiesta Remember 2025' }
  ];

  showCarousel = true;

  private onResize = () => this.setLayoutVars();
  private routerSub?: Subscription;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.setLayoutVars();
    window.addEventListener('resize', this.onResize);

    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects || e.url || '';
        if (url.includes('/welcome')) {
          const cloned = this.images.slice();
          this.showCarousel = false;
          setTimeout(() => {
            this.images = cloned; // nueva referencia
            this.showCarousel = true; // fuerza destrucción + recreación del <app-carrusel>
          });
        }
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    this.routerSub?.unsubscribe();
  }

  private setLayoutVars(): void {
    const header = document.querySelector('app-header') as HTMLElement | null;
    const footer = document.querySelector('app-footer') as HTMLElement | null;
    const root = document.documentElement;
    if (header) root.style.setProperty('--app-header-h', `${header.offsetHeight}px`);
    if (footer) root.style.setProperty('--app-footer-h', `${footer.offsetHeight}px`);
  }
}
