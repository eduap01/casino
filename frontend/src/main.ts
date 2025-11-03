import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

//Para pner el idioma en español globalmente
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {importProvidersFrom, LOCALE_ID} from '@angular/core';
import {icons, LucideAngularModule} from 'lucide-angular';

registerLocaleData(localeEs);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
     importProvidersFrom(LucideAngularModule.pick(icons)),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
})
.catch((err) => console.error(err));
