import { ViewportScroller } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Service to handle scrolling to specific fragments (anchors) within a page.
 * 
 * This service combines Angular's `ViewportScroller` and `Router` to manage navigation
 * and scrolling behavior efficiently, particularly for single-page applications (SPA).
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

    /**
   * Scrolls to a specified fragment (anchor) on the page.
   * 
   * This method updates the URL to include the fragment and ensures smooth scrolling
   * to the corresponding element on the page.
   * 
   * @param {string} fragment - The ID of the target HTML element to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.router.navigate([], {
      fragment,
      queryParamsHandling: 'preserve',
    });

    this.viewportScroller.scrollToAnchor(fragment);
  }
}
