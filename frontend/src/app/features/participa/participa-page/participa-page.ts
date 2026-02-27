import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../shared/seo.service';

@Component({
  selector: 'app-participa-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './participa-page.html',
  styleUrls: ['./participa-page.scss']
})
export class ParticipaPage implements OnInit {
  email = '';
  selectedOption = '';

  opciones = ['Encuestas', 'Votaciones', 'Sorteos'];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Participa | Sorteos y votaciones | Casino Rock Bar | Esquivias',
      description:
        'Participa en encuestas, votaciones y sorteos de Casino Rock Bar en Esquivias (Toledo). Forma parte de nuestra comunidad y no te pierdas ningún evento.',
      canonical: 'https://casinorockbar.com/participa',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }

  enviarParticipacion() {
    if (!this.email || !this.selectedOption) {
      alert('Por favor, introduce tu email y selecciona una opción.');
      return;
    }
    console.log(`Email: ${this.email}, opción: ${this.selectedOption}`);
    alert('¡Gracias por participar! Pronto recibirás más información por correo.');
  }
}
