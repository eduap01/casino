import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnConstruccion } from '../../../../shared/pages/en-construccion/en-construccion';

@Component({
  selector: 'app-nuestra-historia-page',
  imports: [ CommonModule, EnConstruccion],
  templateUrl: './nuestra-historia-page.html',
  styleUrl: './nuestra-historia-page.scss'
})
export class NuestraHistoriaPage {

}
