import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  inject,
} from '@angular/core';

/**
 * Directive to apply a highlighting effect when the mouse enters or leaves an element.
 *
 * This directive listens for `mouseenter` and `mouseleave` events to add and remove
 * the `highlightFont` class to the element, creating a visual highlighting effect.
 *
 * @remarks
 * Typically used to highlight text or other elements when hovered, creating a visual cue for user interaction.
 */
@Directive({
  selector: '[appHighlighting]',
})
export class HighlightingDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  /**
   * Adds the `highlightFont` class to the element when the mouse enters.
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'highlightFont');
  }

  /**
   * Removes the `highlightFont` class from the element when the mouse leaves.
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'highlightFont');
  }
}
