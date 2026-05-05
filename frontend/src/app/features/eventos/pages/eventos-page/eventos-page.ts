import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoItem } from '../../components/evento-item/evento-item';
import { RouterModule } from '@angular/router';

import { EVENTOS, Evento } from '../../data/eventos.data';
import { EventosService } from '../../services/eventos.service';
import { SeoService } from '../../../../shared/seo.service';

@Component({
  selector: 'app-eventos-page',
  standalone: true,
  imports: [CommonModule, EventoItem, RouterModule],
  templateUrl: './eventos-page.html',
  styleUrls: ['./eventos-page.scss']
})
export class EventosPage implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventosService: EventosService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Eventos y conciertos en Esquivias (Toledo) | Música en directo | Casino Rock Bar',
      description:
        'Descubre los próximos eventos y conciertos en Casino Rock Bar, en Esquivias (Toledo). Música en directo, sesiones y noches temáticas cerca de Illescas, Seseña y Madrid Sur.',
      canonical: 'https://casinorockbar.com/eventos',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });

    this.eventosService.getEventos().subscribe(apiEventos => {
      const apiIds = new Set(apiEventos.map(e => String(e.id)));
      const staticEventos = EVENTOS.filter(e => !apiIds.has(String(e.id)));
      this.eventos = [...apiEventos, ...staticEventos]
        .filter(e => e.activo !== false && e.visibleEn.includes('web'))
        .sort((a, b) => {
          const aIsUUID = typeof a.id === 'string' && isNaN(Number(a.id));
          const bIsUUID = typeof b.id === 'string' && isNaN(Number(b.id));
          if (aIsUUID && !bIsUUID) return -1;
          if (!aIsUUID && bIsUUID) return 1;
          if (!aIsUUID && !bIsUUID) return (b.id as number) - (a.id as number);
          return 0;
        });
    });
  }
}
