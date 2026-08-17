/**
 * @fileoverview Theme Switcher component.
 * @description Dropdown menu for switching between light, dark, and auto themes.
 * @module shared/components/theme-switcher
 */

import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { ThemeService, TranslationService } from '../../../core/services';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);
  private translationService = inject(TranslationService);
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');
  isDropdownOpen = signal(false);
  currentTheme = () => this.themeService.currentTheme();

  /**
   * Returns the translated string for the given dot-notation key.
   * @param key - Dot-notation translation key (e.g. 'THEME.light')
   */
  translate(key: string): string {
    return this.translationService.instant(key);
  }

  /**
   * Toggle dropdown visibility
   */
  toggleDropdown(): void {
    this.isDropdownOpen.update((state) => !state);
  }

  /**
   * Close dropdown
   */
  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  /**
   * Closes the dropdown on Escape and returns focus to the toggle button - without this,
   * focus would be left on a now-hidden (and therefore untabbable) option, silently dropping
   * the user's keyboard focus back to the very start of the page.
   */
  closeDropdownAndRefocusToggle(): void {
    this.closeDropdown();
    this.toggleBtn().nativeElement.focus();
  }

  /**
   * Switch theme and close dropdown
   */
  switchTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.setTheme(theme);
    this.closeDropdown();
  }

  /**
   * Handle clicks outside the dropdown
   */
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.theme-switcher');

    if (!dropdown && this.isDropdownOpen()) {
      this.closeDropdown();
    }
  }

  /**
   * Handle focus leaving the component
   */
  onFocusOut(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      this.closeDropdown();
    }
  }
}
