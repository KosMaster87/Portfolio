/**
 * @fileoverview Translation service.
 * @description Provides i18n functionality for the application.
 * @module core/services/translation
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export type Language = 'de' | 'en';

type TranslationValue = string | TranslationObject;
interface TranslationObject {
  [key: string]: TranslationValue;
}

type Translations = TranslationObject;

/**
 * Service for handling translations.
 * Manages language switching and provides translation strings.
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private http = inject(HttpClient);
  private translations = signal<Translations>({});
  currentLang = signal<Language>('de');

  /**
   * Signal indicating whether translations are loaded.
   * Used to prevent showing translation keys before data is ready.
   */
  isLoaded = signal<boolean>(false);

  /**
   * Constructor loads default language translations.
   */
  constructor() {
    this.loadTranslations('de');
  }

  /**
   * Switches to a different language.
   * @param lang - Language to switch to (de or en)
   */
  use(lang: Language): void {
    this.currentLang.set(lang);
    this.isLoaded.set(false);
    this.loadTranslations(lang);
  }

  /**
   * Loads translation file for a language.
   * @param lang - Language code for JSON file to load
   */
  private loadTranslations(lang: Language): void {
    this.http.get<Translations>(`/i18n/${lang}.json`).subscribe({
      next: (data) => {
        this.translations.set(data);
        this.isLoaded.set(true);
      },
      error: () => {
        this.isLoaded.set(true);
      },
    });
  }

  /**
   * Gets a translation by key path.
   * @param key - Dot-notation path to translation key
   * @returns Translated string or key if not found
   */
  instant(key: string): string {
    return this.getNestedValue(this.translations(), key);
  }

  /**
   * Gets nested value from object by dot notation.
   * @param obj - Object to traverse
   * @param path - Dot-notation path to value
   * @returns Found value or original path if not found
   */
  private getNestedValue(obj: TranslationValue, path: string): string {
    const keys = path.split('.');
    let current: TranslationValue = obj;

    for (const key of keys) {
      if (typeof current === 'object' && current !== null && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }

    return typeof current === 'string' ? current : path;
  }
}
