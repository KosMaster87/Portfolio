/**
 * @fileoverview Scroll Arrow component.
 * @description Animated SVG arrow for navigation between page sections.
 * Supports direction (down/up) and rotation (left/right) variants.
 * @module shared/components/scroll-arrow
 */

import { Component, inject, input } from '@angular/core';
import { ScrollService } from '@core/services';

@Component({
  selector: 'app-scroll-arrow',
  imports: [],
  templateUrl: './scroll-arrow.component.html',
  styleUrl: './scroll-arrow.component.scss',
})
export class ScrollArrowComponent {
  private scrollService = inject(ScrollService);
  rotate = input<'left' | 'right'>('right');
  direction = input<'down' | 'up'>('down');
  targetFragment = input.required<string>();

  /**
   * Scrolls to the target fragment
   */
  scrollTo(): void {
    this.scrollService.scrollToFragment(this.targetFragment());
  }
}
