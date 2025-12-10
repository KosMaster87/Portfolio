/**
 * @fileoverview Header component.
 * @description Main header with smart navigation, language switcher, and responsive hamburger menu.
 * @module layout/header
 */

import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavigationService, ThemeService, TranslationService } from '../../core/services';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { ThemeSwitcherComponent } from '../../shared/components/theme-switcher/theme-switcher.component';
import { NoScrollDirective } from '../../shared/directives';

/**
 * Header component.
 * Main navigation header with smart routing, language switcher, theme switcher,
 * and responsive hamburger menu for mobile devices.
 * Uses NavigationService for centralized navigation logic.
 * NoScrollDirective prevents body scroll when mobile menu is open.
 */
@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    FormsModule,
    NoScrollDirective,
    ThemeSwitcherComponent,
    LanguageSwitcherComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  protected navigationService = inject(NavigationService);

  isMenuOpen = signal(false);
  isOnHomePage = this.navigationService.isOnHomePage;

  /**
   * Computed logo path based on active theme.
   * Inverts theme for logo to ensure visibility.
   * @returns Path to logo image
   */
  protected logoPath = computed(() => {
    const theme = this.themeService.activeTheme();
    const invertedTheme = theme === 'dark' ? 'light' : 'dark';
    return `/theme-${invertedTheme}/icon-96.png`;
  });

  protected get menuItems() {
    return this.navigationService.menuItems;
  }

  /**
   * Scrolls to a specific section on the page.
   * Includes animation delays for smooth mobile menu closing.
   * @param {string} sectionId - The section ID to scroll to
   */
  scrollToSection(sectionId: string): void {
    if (this.isMenuOpen()) {

      setTimeout(() => {
        this.closeMenu();

        setTimeout(() => {
          this.navigationService.scrollToSection(sectionId);
        }, 300);
      }, 500);
    } else {
      this.navigationService.scrollToSection(sectionId);
    }
  }

  /**
   * Navigates to home page with optional scroll to top.
   * Scrolls to top if already on home page, otherwise just navigates.
   */
  navigateToHome(): void {
    if (this.isOnHomePage()) {
      this.navigationService.navigateToTop();
    } else {
      this.navigationService.navigateToHome();
    }
  }

  /**
   * Toggles mobile menu open/closed state.
   */
  toggleMenu(): void {
    this.isMenuOpen.update((state) => !state);
  }

  /**
   * Closes mobile menu and re-enables body scroll.
   */
  closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.classList.remove('no-scroll');
  }

  /**
   * Navigates to a specific route and closes menu.
   * @param {string} route - The route path to navigate to
   */
  navigateToRoute(route: string): void {
    this.closeMenu();
    this.navigationService.navigateToRoute(route);
  }

  /**
   * Gets translated text for a translation key.
   * @param {string} key - Translation key (e.g., 'MENU.home')
   * @returns {string} Translated text in current language
   */
  translate(key: string): string {
    return this.translationService.instant(key);
  }
}
