import { Component } from '@angular/core';
import { PlatoItem } from '../plato-item/plato-item';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-especiales',
  standalone: true,
  imports: [PlatoItem, LucideAngularModule],
  templateUrl: './especiales.html',
  styleUrl: './especiales.scss'
})
export class Especiales {}
