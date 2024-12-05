import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component that represents a call-to-action button, which can trigger navigation or scroll to a section.
 *
 * This button can be styled with custom classes and can display text in two rows. It supports routing via the `routerLink`
 * and can also scroll to a specific fragment on the page when clicked.
 *
 */
@Component({
  selector: 'app-call-action-button',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <div class="btnFlexBox">
      <button
        buttonType="button"
        class="btnSelf primeFont disableTextSelection"
        [attr.type]="buttonType"
        [ngClass]="buttonClass"
        [disabled]="disabled"
        [routerLink]="routerLink"
        [fragment]="fragment"
        (click)="scrollToFragment()"
      >
        {{ buttonTextRowOne | translate }} <br />
        {{ buttonTextRowTWO | translate }}
      </button>
    </div>
  `,
  styleUrls: [
    './call-action-button.component.scss',
    './../../../shared/styles/buttons.scss',
  ],
})
export class CallActionButtonComponent {
  /**
   * buttenClass means to be import the current  [ngClass] sounds:  buttonClass.
   */
  @Input() buttonClass: string = '';
  @Input() buttonTextRowOne: string = '';
  @Input() buttonTextRowTWO: string = '';
  @Input() link: string = '';
  @Input() buttonType: string = 'button';
  @Input() disabled: boolean = false;
  @Input() routerLink: string | any[] = '';
  @Input() fragment: string = '';

  /**
   * Handles the click event on the button and scrolls the page to the specified section.
   *
   * This method is triggered when the button is clicked. It finds the DOM element specified by the
   * `link` input property (a CSS selector) and smooth-scrolls the page to that section.
   *
   * If the element is not found, the method does nothing.
   *
   * @memberof CallActionButtonComponent
   */
  onClick() {
    const element = document.querySelector(this.link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Handles the click event of the button and scrolls the page to the specified `fragment`.
   *
   * This method is triggered when the button is clicked. It smooth-scrolls the page to the section
   * identified by the `fragment` input property.
   *
   * @memberof CallActionButtonComponent
   */
  scrollToFragment(): void {
    if (this.fragment) {
      const element = document.querySelector(`#${this.fragment}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
