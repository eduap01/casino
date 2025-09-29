import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-sandwiches',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './sandwiches.html',
  styleUrl: './sandwiches.scss'
})
export class Sandwiches {

}
