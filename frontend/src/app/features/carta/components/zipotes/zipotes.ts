import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-zipotes',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './zipotes.html',
  styleUrl: './zipotes.scss'
})
export class Zipotes {

}
