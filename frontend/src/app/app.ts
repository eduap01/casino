// src/app/app.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showNavbar = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {

        const url = event.urlAfterRedirects;

        const isWelcome  = url === '/welcome';
        const isPantalla = url.startsWith('/tv');

        // Navbar y footer
        this.showNavbar = !isWelcome && !isPantalla;
        this.showFooter = !isWelcome && !isPantalla;

        // Modo pantalla (bloquea scroll, fondo negro, etc.)
        if (isPantalla) {
          document.body.classList.add('pantalla-mode');
          document.documentElement.classList.add('pantalla-mode');
        } else {
          document.body.classList.remove('pantalla-mode');
          document.documentElement.classList.remove('pantalla-mode');
        }
      });
  }

  ngOnInit() {
    // Tema global
    document.body.classList.add('theme-verano');
  }
}
