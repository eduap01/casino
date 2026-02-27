import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoItem } from '../../components/evento-item/evento-item';
import { RouterModule } from '@angular/router';

import { EVENTOS, Evento } from '../../data/eventos.data';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-eventos-page',
  standalone: true,
  imports: [CommonModule, EventoItem, RouterModule],
  templateUrl: './eventos-page.html',
  styleUrls: ['./eventos-page.scss']
})
export class EventosPage implements OnInit {

  eventos: Evento[] = [...EVENTOS]
    .filter((e) => e.activo !== false && e.visibleEn.includes('web'))
    .sort((a, b) => b.id - a.id);

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Eventos y conciertos en Esquivias (Toledo) | Música en directo | Casino Rock Bar',
      description:
        'Descubre los próximos eventos y conciertos en Casino Rock Bar, en Esquivias (Toledo). Música en directo, sesiones y noches temáticas cerca de Illescas, Seseña y Madrid Sur.',
      canonical: 'https://casinorockbar.com/eventos',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }
}
