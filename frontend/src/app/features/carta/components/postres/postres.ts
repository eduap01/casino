import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-postres',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './postres.html',
  styleUrl: './postres.scss'
})
export class Postres {

}
