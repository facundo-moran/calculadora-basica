import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    /*
      ZONELESS ACTIVATED 3/sep/24
    */
    provideExperimentalZonelessChangeDetection(),
  ]
};
