import { Component, OnInit } from '@angular/core';
import { CLUBES, ClubItem } from '../../data/clubes.data';
import { ClubItemComponent } from '../../components/club-item/club-item';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../../../shared/seo.service';

@Component({
  selector: 'app-clubes-page',
  standalone: true,
  imports: [ClubItemComponent, CommonModule, RouterLink],
  templateUrl: './clubes-page.html',
  styleUrl: './clubes-page.scss'
})
export class ClubesPage implements OnInit {
  clubes: ClubItem[] = CLUBES;

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setSeo({
      title: 'Clubes y comunidad | Casino Rock Bar | Esquivias (Toledo)',
      description:
        'Descubre los clubes y la comunidad de Casino Rock Bar en Esquivias (Toledo): actividades, eventos y participación. Cerca de Illescas y Madrid Sur.',
      canonical: 'https://casinorockbar.com/clubes',
      ogImage: 'https://casinorockbar.com/media/logoCasino.png',
      robots: 'index, follow'
    });
  }
}
