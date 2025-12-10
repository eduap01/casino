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
      'assets/navidad/queen-navidad.webp',
      'assets/navidad/elvis-navidad.webp',
      'assets/navidad/beatles-navidad.webp',
      'assets/navidad/eddie-navidad.webp',
      'assets/navidad/sinatra-navidad.webp',
      'assets/navidad/kiss-navidad.webp',
      'assets/navidad/acdc-navidad.webp',
      'assets/navidad/mickey-navidad.webp',
      'assets/navidad/paul-navidad.webp',
      'assets/navidad/cosby-navidad.webp',
      'assets/navidad/maiden-navidad.webp',
      'assets/navidad/wham-navidad.webp'
    ];


  get eventosLoop(): string[] {
    return Array(50).fill(this.eventos).flat();
  }

  ngOnInit(): void {}
}
