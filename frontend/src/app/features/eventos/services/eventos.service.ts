import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private eventosValidos = [1, 2, 3, 4, 5];

  async getEventoById(id: string | number): Promise<any> {
    const existe = this.eventosValidos.includes(Number(id));

    await new Promise(r => setTimeout(r, 150));
    return existe ? { id, nombre: 'Evento simulado ' + id } : null;
  }
}
