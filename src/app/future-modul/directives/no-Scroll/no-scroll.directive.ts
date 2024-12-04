import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appNoScroll]',
})
export class NoScrollDirective {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

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
