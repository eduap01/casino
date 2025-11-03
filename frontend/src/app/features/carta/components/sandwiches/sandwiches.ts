import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-sandwiches',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './sandwiches.html',
  styleUrl: './sandwiches.scss'
})
export class Sandwiches {

}
