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

  readonly mediaBase = 'https://casinorockbar.com/media';

  eventos: string[] = [
    `${this.mediaBase}/artistas/acdc.webp`,
    `${this.mediaBase}/artistas/elvis.webp`,
    `${this.mediaBase}/artistas/Fredy.webp`,
    `${this.mediaBase}/artistas/stevie_wonder.webp`,
    `${this.mediaBase}/artistas/jagger.webp`,
    `${this.mediaBase}/artistas/janis.webp`,
    `${this.mediaBase}/artistas/JimmyHendrix.webp`,
    `${this.mediaBase}/artistas/johnny_cash.webp`,
    `${this.mediaBase}/artistas/LedZepelin.webp`,
    `${this.mediaBase}/artistas/michaeljackson.webp`,
    `${this.mediaBase}/artistas/paul_simonon.webp`,
    `${this.mediaBase}/artistas/gunsnroses.webp`
  ];

  get eventosLoop(): string[] {
    return Array(50).fill(this.eventos).flat();
  }

  ngOnInit(): void {}
}
