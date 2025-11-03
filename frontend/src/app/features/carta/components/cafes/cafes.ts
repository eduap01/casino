import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-cafes',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './cafes.html',
  styleUrl: './cafes.scss'
})
export class Cafes {

}
