/**
 * @fileoverview Smooth Scroll service.
 * @description Provides smooth scrolling functionality with custom easing and animation cancellation.
 * @module core/services/smooth-scroll
 */

import { Injectable } from '@angular/core';

/**
 * Service for smooth scrolling with custom animations.
 * Handles scrolling with easing functions and animation frame management.
 */
@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  private animationFrameId: number | null = null;

  /**
   * Scroll to a specific Y position with smooth animation
   * @param {number} targetY - The target Y position to scroll to
   * @param {number} duration - Animation duration in milliseconds (default: 1000)
   */
  scrollTo(targetY: number, duration: number = 1000): void {
    this.cancelAnimation();

    const startScroll = window.scrollY;
    const distance = targetY - startScroll;
    const startTime = performance.now();

    this.animationFrameId = requestAnimationFrame((currentTime) =>
      this.animateScroll(currentTime, startTime, startScroll, distance, duration)
    );
  }

  /**
   * Animates the scroll using requestAnimationFrame
   * @private
   */
  private animateScroll(
    currentTime: number,
    startTime: number,
    startScroll: number,
    distance: number,
    duration: number
  ): void {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = this.easeInOutQuad(progress);

    window.scrollTo(0, startScroll + distance * ease);

    if (progress < 1) {
      this.animationFrameId = requestAnimationFrame((time) =>
        this.animateScroll(time, startTime, startScroll, distance, duration)
      );
    } else {
      this.animationFrameId = null;
    }
  }

  /**
   * Easing function for smooth acceleration/deceleration
   * @private
   */
  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  /**
   * Scroll an element to the center of the viewport
   * @param {HTMLElement} element - The element to scroll into view
   * @param {number} duration - Animation duration in milliseconds (default: 1000)
   */
  scrollElementToCenter(element: HTMLElement, duration: number = 1000): void {
    requestAnimationFrame(() => {
      const startScroll = window.scrollY;
      const elementTop = element.getBoundingClientRect().top;
      const targetScroll =
        startScroll + elementTop - window.innerHeight / 2 + element.offsetHeight / 2;

      this.scrollTo(targetScroll, duration);
    });
  }

  /**
   * Scroll an element to the top of the viewport
   * @param {HTMLElement} element - The element to scroll into view
   * @param {number} duration - Animation duration in milliseconds (default: 1000)
   */
  scrollElementToTop(element: HTMLElement, duration: number = 1000): void {
    requestAnimationFrame(() => {
      const startScroll = window.scrollY;
      const elementTop = element.getBoundingClientRect().top;
      const targetScroll = startScroll + elementTop;

      this.scrollTo(targetScroll, duration);
    });
  }

  /**
   * Cancel any ongoing scroll animation
   */
  cancelAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
