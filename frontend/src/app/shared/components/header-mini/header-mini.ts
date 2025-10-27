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
    'Burguer.jpeg',
    'JimmyHendrix.jpg',
    'MichaelJackson.jpg',
    'octoberfest2025.jpg',
    'acdc.jpg',
    'Concierto.jpeg',
    'Fredy.webp',
    'LedZepelin.jpg',
    'elvis.jpg',
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
