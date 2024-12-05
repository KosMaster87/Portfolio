import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Creates and configures a custom translation loader for the TranslateModule.
 *
 * This loader fetches translation files from a specified directory on the server.
 *
 * @param {HttpClient} http - The HTTP client used to fetch the translation files.
 * @returns {TranslateLoader} A configured `TranslateHttpLoader` instance.
 *
 * **Translation File Path:**
 * The loader will look for translation files in the directory `./assets/i18n/`
 * and expects files named like `<language>.json` (e.g., `en.json`, `de.json`).
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
