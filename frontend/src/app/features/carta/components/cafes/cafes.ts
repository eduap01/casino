import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-cafes',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './cafes.html',
  styleUrl: './cafes.scss'
})
export class Cafes {

}
