import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlighting]',
  standalone: true
})
export class HighlightingDirective {
  @Input() set appHighlighting(condition: boolean) {
    if (condition) {
      this.renderer.addClass(this.el.nativeElement, 'highlight-class');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'highlight-class');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}