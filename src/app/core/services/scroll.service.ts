/**
 * @fileoverview Scroll service.
 * @description Provides smooth scrolling functionality for navigation between page sections.
 * @module core/services/scroll
 */

import { Injectable } from '@angular/core';

/**
 * Service for smooth scrolling navigation.
 * Handles scrolling to specific fragments/sections on the page.
 * Uses native scrollIntoView API for smooth animations.
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  /**
   * Scrolls smoothly to a specific fragment on the page.
   * @param {string} fragment - The ID of the element to scroll to
   * @example
   * scrollService.scrollToFragment('contact');
   */
  scrollToFragment(fragment: string): void {
    const element = this.getElement(fragment);
    if (element) {
      this.performScroll(element);
    }
  }

  /**
   * Scrolls smoothly to the top of the page.
   * Scrolls to the body element (top-most element in HTML document).
   */
  scrollToTop(): void {
    const bodyElement = document.body;
    if (bodyElement) {
      this.performScroll(bodyElement);
    }
  }

  /**
   * Gets the element by ID or selector.
   * @param {string} fragment - The element ID to search for
   * @returns {HTMLElement | null} The found element or null
   * @private
   */
  private getElement(fragment: string): HTMLElement | null {
    return document.getElementById(fragment);
  }

  /**
   * Performs the smooth scroll to the element.
   * Uses scrollIntoView with smooth behavior and start alignment.
   * @param {HTMLElement} element - The target element to scroll to
   * @private
   */
  private performScroll(element: HTMLElement): void {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
