import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() descripcion!: string;

  @Output() clickItem = new EventEmitter<string>();

  onClick() {
    this.clickItem.emit(this.imagen);
  }
}
