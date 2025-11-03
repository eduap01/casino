import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-hamburguesas',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './hamburguesas.html',
  styleUrl: './hamburguesas.scss'
})
export class Hamburguesas {

}
