import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnConstruccion } from '../../../../shared/pages/en-construccion/en-construccion';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-nuestra-historia-page',
  standalone: true,
  imports: [CommonModule, EnConstruccion],
  templateUrl: './nuestra-historia-page.html',
  styleUrl: './nuestra-historia-page.scss'
})
export class NuestraHistoriaPage implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Nuestra historia | Casino Rock Bar | Esquivias (Toledo)',
      description:
        'Conoce la historia de Casino Rock Bar en Esquivias (Toledo): restaurante y espacio cultural con música en directo y eventos cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/nuestra-historia',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

}
