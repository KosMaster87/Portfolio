/**
 * @fileoverview Application configuration for the Angular app.
 * @description Sets up providers for routing, HTTP client, error handling, and PWA support.
 * @module app/config
 */

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { provideServiceWorker } from '@angular/service-worker';
import { SW_UPDATE_CHECK_INTERVAL_MS, SwUpdateTranslator } from '@ui/public-api';
import { httpErrorInterceptor } from './core/interceptors';
import { TranslationService } from './core/services/translation.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    { provide: SwUpdateTranslator, useExisting: TranslationService },
    { provide: SW_UPDATE_CHECK_INTERVAL_MS, useValue: 10 * 60 * 1000 },
  ],
};
