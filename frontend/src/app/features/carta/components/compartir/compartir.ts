import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-compartir',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './compartir.html',
  styleUrl: './compartir.scss'
})
export class Compartir {}
