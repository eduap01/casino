import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchandising-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merchandising-item.html',
  styleUrls: ['./merchandising-item.scss']
})
export class MerchandisingItem {
  @Input() imagen!: string;
  @Input() titulo!: string;
  @Input() precio!: string;
}
