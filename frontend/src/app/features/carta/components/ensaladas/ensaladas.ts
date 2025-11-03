import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-ensaladas',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './ensaladas.html',
  styleUrl: './ensaladas.scss'
})
export class Ensaladas {

}
