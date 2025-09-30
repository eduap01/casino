import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';

@Component({
  selector: 'app-compartir',
  standalone: true,
  imports: [PlatoItem],
  templateUrl: './compartir.html',
  styleUrl: './compartir.scss'
})
export class Compartir {}
