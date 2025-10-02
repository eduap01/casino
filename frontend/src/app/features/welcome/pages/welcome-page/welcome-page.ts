import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Carrusel } from '../../../../shared/components/carrusel/carrusel';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, Carrusel],
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss']
})
export class Welcome implements AfterViewInit, OnDestroy {
  images = [
    { src: 'assets/logoCasinoMuchoAmor.jpeg', alt: 'Logo Casino' },
    { src: 'assets/eventos/Concierto.jpeg', alt: 'Concierto' },
    { src: 'assets/eventos/Burguer.jpeg', alt: 'Burguer' }
  ];

  private onResize = () => this.setLayoutVars();

  ngAfterViewInit(): void {
    this.setLayoutVars();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  private setLayoutVars(): void {
    const header = document.querySelector('app-header') as HTMLElement | null;
    const footer = document.querySelector('app-footer') as HTMLElement | null;
    const root = document.documentElement;

    if (header) {
      root.style.setProperty('--app-header-h', `${header.offsetHeight}px`);
    }
    if (footer) {
      root.style.setProperty('--app-footer-h', `${footer.offsetHeight}px`);
    }
  }
}
