import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-participa-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participa-page.html',
  styleUrls: ['./participa-page.scss']
})
export class ParticipaPage {
  email = '';
  selectedOption = '';

  opciones = ['Encuestas', 'Votaciones', 'Sorteos'];

  enviarParticipacion() {
    if (!this.email || !this.selectedOption) {
      alert('Por favor, introduce tu email y selecciona una opción.');
      return;
    }
    console.log(`Email: ${this.email}, opción: ${this.selectedOption}`);
    alert('¡Gracias por participar! Pronto recibirás más información por correo.');
  }
}
