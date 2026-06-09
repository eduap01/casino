import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-tostas',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './tostas.html',
  styleUrl: './tostas.scss'
})
export class Tostas {

}
