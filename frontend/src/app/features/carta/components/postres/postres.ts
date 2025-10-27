import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './postres.html',
  styleUrl: './postres.scss'
})
export class Postres {

}
