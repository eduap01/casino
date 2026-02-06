import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoItem } from '../../components/evento-item/evento-item';
import { RouterModule } from '@angular/router';

import { EVENTOS, Evento } from '../../data/eventos.data';


@Component({
  selector: 'app-eventos-page',
  standalone: true,
  imports: [CommonModule, EventoItem, RouterModule],
  templateUrl: './eventos-page.html',
  styleUrls: ['./eventos-page.scss']
})

export class EventosPage {
  eventos: Evento[] = [...EVENTOS]
    .filter((e) => e.activo !== false && e.visibleEn.includes('web'))
    .sort((a, b) => b.id - a.id);
}
