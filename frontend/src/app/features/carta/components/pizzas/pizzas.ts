import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './pizzas.html',
  styleUrl: './pizzas.scss'
})
export class Pizzas {

}
