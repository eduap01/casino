import { Component } from '@angular/core';
import { HeaderMini } from '../../../../shared/components/header-mini/header-mini';
import { EnConstruccion } from '../../../../shared/pages/en-construccion/en-construccion';

@Component({
  selector: 'app-menus-page',
  imports: [HeaderMini, EnConstruccion],
  templateUrl: './menus-page.html',
  styleUrl: './menus-page.scss'
})
export class MenusPage {

}
