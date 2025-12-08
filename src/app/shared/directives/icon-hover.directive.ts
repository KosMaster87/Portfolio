/**
 * @fileoverview Icon Hover Directive.
 * @description This directive adds a hover effect to an element when the mouse enters or leaves it.
 * @module app/shared/directives/icon-hover
 */

import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIconHover]',
})
export class IconHoverDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  /**
   * Adds the `hover-effect` class to the element when the mouse enters.
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'hover-effect');
  }

  /**
   * Removes the `hover-effect` class from the element when the mouse leaves.
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'hover-effect');
  }
}
