import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";

// Translate service
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { createTranslateLoader } from "./shared/services/translationLoader/translation-loader.service";

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          // useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        // defaultLanguage: "",
      })
    ),
  ],
};
