import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-mini',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-mini.html',
  styleUrls: ['./header-mini.scss']
})
export class HeaderMini implements OnInit {

  basePath = 'assets/';

    eventos: string[] = [
    'assets/artistas/JimmyHendrix.webp',
    'assets/eventos/laPuraSangre.webp',
    'assets/artistas/michaeljackson.webp',
    'assets/artistas/acdc.webp',
    'assets/eventos/fiestaRemember2025.webp',
    'assets/artistas/Fredy.webp',
    'assets/eventos/Concierto.webp',
    'assets/artistas/LedZepelin.webp',
    'assets/artistas/elvis.webp',
    'assets/eventos/santo_tardeo2025.webp',
    'assets/artistas/gunsnroses.webp',
    'assets/artistas/jagger.webp',
    'assets/artistas/johnny_cash.webp',
    'assets/artistas/paul_simonon.webp',
    'assets/artistas/stevie_wonder.webp'
  ];

  get eventosLoop(): string[] {
    return Array(50).fill(this.eventos).flat();
  }

  ngOnInit(): void {}
}
