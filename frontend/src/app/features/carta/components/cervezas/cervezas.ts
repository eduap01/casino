import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-cervezas',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './cervezas.html',
  styleUrl: './cervezas.scss'
})
export class Cervezas {

}
