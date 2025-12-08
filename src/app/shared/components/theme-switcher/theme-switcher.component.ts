/**
 * @fileoverview Theme Switcher component.
 * @description Dropdown menu for switching between light, dark, and auto themes.
 * @module shared/components/theme-switcher
 */

import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);
  isDropdownOpen = signal(false);
  currentTheme = () => this.themeService.currentTheme();

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
}
