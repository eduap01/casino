import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header-mini',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-mini.html',
  styleUrl: './header-mini.scss'
})
export class HeaderMini {
  eventos: string[] = [
    'JimmyHendrix.jpg',
    'laPuraSangre.jpg',
    'MichaelJackson.jpg',
    'acdc.jpg',
    'fiestaRemember2025.jpg',
    'Fredy.webp',
    'Concierto.jpeg',
    'LedZepelin.jpg',
    'elvis.jpg',
    'santo_tardeo2025.jpg',
    'gunsnroses.jpg',
    'jagger.jpg',
    'johnny_cash.jpg',
    'paul_simonon.jpg',
    'stevie_wonder.jpg'
  ];

get eventosLoop(): string[] {
  return Array(50).fill(this.eventos).flat();
}


  ngOnInit(): void {}
}
