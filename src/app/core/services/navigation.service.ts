/**
 * @fileoverview Navigation service.
 * @description Provides centralized navigation data and methods for the application.
 * @module core/services/navigation
 */

import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ScrollService } from './scroll.service';

/**
 * Navigation menu item interface.
 * @property {string} label - Translation key for the menu item label
 * @property {string} sectionId - ID of the target section element
 */
export interface MenuItem {
  label: string;
  sectionId: string;
}

/**
 * Service for centralized navigation.
 * Manages menu items and provides navigation methods for both anchor tags and buttons.
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);

  /**
   * Current URL as signal (without fragment/hash).
   * Automatically updates when navigation completes.
   */
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects.split('#')[0]),
      startWith(this.router.url.split('#')[0])
    ),
    { initialValue: '/' }
  );

  /**
   * Computed signal: Check if currently on home page.
   * Returns true if URL is '/' or '/home'.
   */
  readonly isOnHomePage = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url === '/home';
  });

  /**
   * Central navigation menu items.
   * Used across header, footer, and navigation components.
   * @readonly
   */
  readonly menuItems: MenuItem[] = [
    { label: 'MENU.about', sectionId: 'about' },
    { label: 'MENU.skills', sectionId: 'skills' },
    { label: 'MENU.projects', sectionId: 'projects' },
    { label: 'MENU.contact', sectionId: 'contact' },
  ];

  /**
   * Navigate to home page.
   * Does not scroll to top - page loads at natural scroll position.
   */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Navigate to home and scroll to top.
   * Use this for "Back to Top" functionality.
   */
  navigateToTop(): void {
    this.router.navigate(['/']).then(() => {
      this.scrollService.scrollToTop();
    });
  }

  /**
   * Navigate to a specific section.
   * Can be used from any component (buttons, anchors, etc.)
   * Handles cross-page navigation automatically.
   * @param {string} sectionId - The section ID to navigate to
   * @param {string} [route='/'] - The route to navigate to (default: '/')
   * @example
   * // Navigate to contact section on home page
   * navigationService.navigateToSection('contact');
   *
   * // Navigate to a section on a different page
   * navigationService.navigateToSection('details', '/projects');
   */
  navigateToSection(sectionId: string, route: string = '/'): void {
    this.router.navigate([route]).then(() => {
      setTimeout(() => {
        this.scrollService.scrollToFragment(sectionId);
      }, 100);
    });
  }

  /**
   * Scroll to a section without changing route.
   * Use this when already on the correct page.
   * @param {string} sectionId - The section ID to scroll to
   */
  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToFragment(sectionId);
  }

  /**
   * Scroll to top of page without navigation.
   * Use for "Back to Top" button that should work on any page.
   */
  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }

  /**
   * Navigate to a specific route.
   * @param {string | string[]} route - The route to navigate to (e.g., '/imprint', '/privacy-policy')
   * @example
   * // Navigate to single route
   * navigationService.navigateToRoute('/imprint');
   *
   * // Navigate with route parameters
   * navigationService.navigateToRoute(['/projects', projectId]);
   */
  navigateToRoute(route: string | string[]): void {
    this.router.navigate(Array.isArray(route) ? route : [route]);
  }
}
