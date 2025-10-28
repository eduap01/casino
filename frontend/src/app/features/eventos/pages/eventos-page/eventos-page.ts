import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoItem } from '../../components/evento-item/evento-item';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-eventos-page',
  standalone: true,
  imports: [CommonModule, EventoItem, RouterModule],
  templateUrl: './eventos-page.html',
  styleUrls: ['./eventos-page.scss']
})
export class EventosPage {
  eventos = [
    {
      titulo: 'Hamburbeza',
      descripcion: 'Las 8 mejores hamburgesas del mundo.',
      fechas: ['2025-10-10', '2025-10-12'],
      imagen: 'assets/eventos/Burguer.jpeg',
      enlace: 'https://www.instagram.com/casinorockbar/?hl=es',
      activo: true
    },
    {
      titulo: 'Colegui Fest',
      fechas:[ '2025-10-25'],
      imagen: 'assets/eventos/Concierto.jpeg',
      enlace: 'https://www.instagram.com/casinorockbar/?hl=es',
      activo: false
    }
  ];
}


