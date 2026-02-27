import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-sobre-nosotros-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sobre-nosotros-page.html',
  styleUrl: './sobre-nosotros-page.scss'
})
export class SobreNosotrosPage implements OnInit {

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Sobre nosotros | Casino Rock Bar | Restaurante en Esquivias (Toledo)',
      description:
        'Descubre el proyecto Casino Rock Bar: restaurante y rock bar en Esquivias (Toledo) con música en directo y eventos cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/sobre-nosotros',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

}
