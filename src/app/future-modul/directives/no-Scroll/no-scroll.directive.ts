import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

/**
 * Directive to prevent scrolling on the body element when a specific condition is met.
 *
 * This directive listens for a change event and toggles
 * the `no-scroll` class on the `body` element to prevent scrolling.
 *
 * @remarks
 * This directive is often used to prevent scrolling when certain elements like modals
 * or menus are open.
 */
@Directive({
  selector: '[appNoScroll]',
})
export class NoScrollDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  /**
   * Toggles the `no-scroll` class on the body element when a change event occurs.
   *
   * @param {Event} event The change event triggered by the checkbox or other UI element.
   */
  @HostListener('change', ['$event'])
  onMenuToggle(event: Event): void {
    const body = document.body;
    if ((event.target as HTMLInputElement).checked) {
      this.renderer.addClass(body, 'no-scroll');
    } else {
      this.renderer.removeClass(body, 'no-scroll');
    }
  }
}
