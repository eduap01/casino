import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-hamburguesas',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './hamburguesas.html',
  styleUrl: './hamburguesas.scss'
})
export class Hamburguesas {

}
