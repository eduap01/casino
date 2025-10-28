// src/app/app.ts
import { Component, signal } from '@angular/core';
import { Router, NavigationEnd,RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs/operators';

import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export  class App {
  showNavbar = true;
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const isWelcome = event.urlAfterRedirects === '/welcome';
        this.showNavbar = !isWelcome;
        this.showFooter = !isWelcome;
      });
  }
  ngOnInit() {
    // 👇 Aplica el tema que quieras al iniciar la app
    document.body.classList.add('theme-halloween');
    // Si prefieres dejar el estándar:
    // document.body.classList.add('theme-standard');
  }
}
