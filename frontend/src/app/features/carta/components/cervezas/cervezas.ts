import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-cervezas',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './cervezas.html',
  styleUrl: './cervezas.scss'
})
export class Cervezas {

}
