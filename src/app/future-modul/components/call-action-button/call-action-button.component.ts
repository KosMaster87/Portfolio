import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-call-action-button',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  // templateUrl: './call-action-button.component.html',
  template: `
    <div class="btnFlexBox">
      <button
        buttonType="button"
        class="btnSelf fontOverpass disableTextSelection"
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
    './call-action-button.component.scss', // Basic style and responsive.
    './../../../shared/styles/buttons.scss', // Change color and else.
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

  onClick() {
    const element = document.querySelector(this.link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFragment(): void {
    if (this.fragment) {
      const element = document.querySelector(`#${this.fragment}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
