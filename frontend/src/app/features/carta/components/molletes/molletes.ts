import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-molletes',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './molletes.html',
  styleUrl: './molletes.scss'
})
export class Molletes {

}
