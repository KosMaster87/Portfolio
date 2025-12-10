/**
 * @fileoverview Language Switcher component.
 * @description Dropdown menu for switching between available languages.
 * @module shared/components/language-switcher
 */

import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslationService } from '../../../core/services';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private translationService = inject(TranslationService);
  isDropdownOpen = signal(false);

  currentLanguage = () => this.translationService.currentLang();

  languages = [
    { code: 'en' as const, label: 'English', flag: 'assets/images/language-en.png' },
    { code: 'de' as const, label: 'Deutsch', flag: 'assets/images/language-de.png' },
  ];

  /**
   * Get data object for the currently selected language
   * @returns Language object containing code, label, and flag path, or undefined if not found
   */
  getCurrentLanguageData() {
    return this.languages.find((lang) => lang.code === this.currentLanguage());
  }

  /**
   * Toggle dropdown visibility state
   * @returns void
   */
  toggleDropdown(): void {
    this.isDropdownOpen.update((state) => !state);
  }

  /**
   * Close the language dropdown
   * @returns void
   */
  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  /**
   * Switch to a different language and close the dropdown
   * @param lang - The language code to switch to ('de' or 'en')
   * @returns void
   */
  switchLanguage(lang: 'de' | 'en'): void {
    this.translationService.use(lang);
    this.closeDropdown();
  }

  /**
   * Handle clicks outside the dropdown to close it
   * Listens to document click events and closes dropdown if click occurred outside component
   * @param event - The mouse click event
   * @returns void
   */
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.language-switcher');

    if (!dropdown && this.isDropdownOpen()) {
      this.closeDropdown();
    }
  }

  /**
   * Handle focus leaving the component
   * Closes dropdown when focus moves outside the component
   * @param event - The focus event
   * @returns void
   */
  onFocusOut(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      this.closeDropdown();
    }
  }
}
