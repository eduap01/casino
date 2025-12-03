import { Component } from '@angular/core';
import { CLUBES, ClubItem } from '../../data/clubes.data';
import { ClubItemComponent } from '../../components/club-item/club-item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clubes-page',
  standalone: true,
  imports: [ClubItemComponent, CommonModule, RouterLink],
  templateUrl: './clubes-page.html',
  styleUrl: './clubes-page.scss'
})
export class ClubesPage {
  clubes: ClubItem[] = CLUBES;
}
