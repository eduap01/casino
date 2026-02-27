import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnConstruccion } from '../../../../shared/pages/en-construccion/en-construccion';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-quienes-somos-page',
  standalone: true,
  imports: [CommonModule, EnConstruccion],
  templateUrl: './quienes-somos-page.html',
  styleUrl: './quienes-somos-page.scss'
})
export class QuienesSomosPage implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Quiénes somos | Restaurante y Rock Bar en Esquivias | Casino Rock Bar',
      description:
        'Conoce el equipo y el proyecto de Casino Rock Bar en Esquivias (Toledo): restaurante con música en directo y eventos cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/quienes-somos',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

}
