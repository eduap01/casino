import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './pizzas.html',
  styleUrl: './pizzas.scss'
})
export class Pizzas {

}
