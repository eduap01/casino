import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-molletes',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './molletes.html',
  styleUrl: './molletes.scss'
})
export class Molletes {

}
