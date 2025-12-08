/**
 * @fileoverview Translation service.
 * @description Provides i18n functionality for the application.
 * @module core/services/translation
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export type Language = 'de' | 'en';

interface Translations {
  [key: string]: any;
}

/**
 * Service for handling translations.
 * Manages language switching and provides translation strings.
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations = signal<Translations>({});
  currentLang = signal<Language>('de');

  /**
   * Signal indicating whether translations are loaded.
   * Used to prevent showing translation keys before data is ready.
   */
  isLoaded = signal<boolean>(false);

  constructor(private http: HttpClient) {
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
   * Gets a translation by key path.
   * @param key - Dot-notation path to translation key
   * @returns Translated string or key if not found
   */
  instant(key: string): string {
    return this.getNestedValue(this.translations(), key);
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
      error: (err) => {
        console.error('Failed to load translations:', err);
        this.isLoaded.set(true); // Set to true to prevent infinite loading
      },
    });
  }

  /**
   * Gets nested value from object by dot notation.
   * @param obj - Object to traverse
   * @param path - Dot-notation path to value
   * @returns Found value or original path if not found
   */
  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc?.[part], obj) || path;
  }
}
