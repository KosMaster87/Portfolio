import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './shared/services/translationLoader/translation-loader.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Application-wide configuration for Angular. 
 * Sets up the providers required for routing, animations, HTTP, and translation functionalities.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
