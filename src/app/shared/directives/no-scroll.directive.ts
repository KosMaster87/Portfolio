/**
 * @fileoverview Directive to disable body scroll when a checkbox is checked.
 * @description This directive toggles the 'no-scroll' class on the body element based on the checkbox state.
 * @module app/shared/directives/no-scroll
 */

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoScroll]',
})
export class NoScrollDirective {
  @HostListener('change', ['$event'])
  onChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    document.body.classList.toggle('no-scroll', checked);
  }
}
