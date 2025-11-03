import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-zipotes',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './zipotes.html',
  styleUrl: './zipotes.scss'
})
export class Zipotes {

}
