import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-ensaladas',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './ensaladas.html',
  styleUrl: './ensaladas.scss'
})
export class Ensaladas {

}
