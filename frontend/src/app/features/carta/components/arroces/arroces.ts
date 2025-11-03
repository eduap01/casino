import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-arroces',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './arroces.html',
  styleUrl: './arroces.scss'
})
export class Arroces {

}
