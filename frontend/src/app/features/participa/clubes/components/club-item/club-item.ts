import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubItem } from '../../data/clubes.data';

@Component({
  selector: 'app-club-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-item.html',
  styleUrl: './club-item.scss'
})
export class ClubItemComponent {
  @Input() club!: ClubItem;
}
