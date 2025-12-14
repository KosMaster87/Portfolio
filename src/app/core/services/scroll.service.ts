/**
 * @fileoverview Scroll service.
 * @description Provides smooth scrolling functionality for navigation between page sections.
 * @module core/services/scroll
 */

import { Injectable, inject } from '@angular/core';
import { SmoothScrollService } from './smooth-scroll.service';

/**
 * Service for smooth scrolling navigation.
 * Handles scrolling to specific fragments/sections on the page.
 * Uses custom smooth scroll service for consistent animations.
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private smoothScrollService = inject(SmoothScrollService);

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
   * Triggers viewport flash animation for page transitions.
   * Waits for initial page load and render before triggering animation.
   * Uses similar timing logic as scroll navigation for consistency.
   */
  triggerPageFlash(): void {
    const pageLoadDuration = 800;

    setTimeout(() => {
      const animationDuration = Math.min(pageLoadDuration * 0.9, 1800);
      this.triggerFlashAnimation(animationDuration);
    }, pageLoadDuration);
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
   * @param {HTMLElement} element - The target element to scroll to
   * @private
   */
  private performScroll(element: HTMLElement): void {
    const scrollDuration = this.calculateScrollDuration(element);
    this.smoothScrollService.scrollElementToTop(element, scrollDuration);

    setTimeout(() => {
      this.setFocusAndTriggerFlash(element, scrollDuration);
    }, scrollDuration);
  }

  /**
   * Calculates scroll duration based on distance (min 800ms, max 2000ms)
   * @private
   */
  private calculateScrollDuration(element: HTMLElement): number {
    const elementTop = element.getBoundingClientRect().top;
    const distance = Math.abs(elementTop);
    return Math.min(Math.max(distance, 800), 2000);
  }

  /**
   * Sets focus on element and triggers viewport flash animation
   * @private
   */
  private setFocusAndTriggerFlash(element: HTMLElement, scrollDuration: number): void {
    element.focus({ preventScroll: true });

    const animationDuration = Math.min(scrollDuration * 0.9, 1800);
    this.triggerFlashAnimation(animationDuration);
  }

  /**
   * Triggers and manages viewport flash animation
   * @private
   */
  private triggerFlashAnimation(duration: number): void {
    document.body.style.setProperty('--flash-duration', `${duration}ms`);
    document.body.classList.add('viewport-flash');

    setTimeout(() => {
      document.body.classList.remove('viewport-flash');
    }, duration);
  }
}
