import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

/**
 * Directive to apply a hover effect to an element when the mouse enters or leaves.
 *
 * This directive listens for `mouseenter` and `mouseleave` events to add and remove
 * the `hover-effect` class to the element, creating a visual hover effect.
 *
 * @remarks
 * Typically used to add visual feedback such as color changes or transformations when hovering over icons or other elements.
 */
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
