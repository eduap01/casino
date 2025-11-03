import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './back-to-top.html',
  styleUrls: ['./back-to-top.scss'],
})
export class BackToTop {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    // Mostrar botón cuando el usuario baja más de 300px
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
