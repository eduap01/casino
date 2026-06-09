import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './cocteles.html',
  styleUrl: './cocteles.scss'
})
export class Cocteles {

}
