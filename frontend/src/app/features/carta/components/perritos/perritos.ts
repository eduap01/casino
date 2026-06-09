import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-perritos',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './perritos.html',
  styleUrl: './perritos.scss'
})
export class Perritos {

}
