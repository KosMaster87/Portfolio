import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-contact',
  imports: [CommonModule, TranslateModule, RouterModule],
  // templateUrl: './button-contact.component.html',
  template: `
    <div class="btnFlexBox">
      <button
        class="btnSelf contact.btn-valid fontOverpass disableTextSelection"
        [ngClass]="buttonClass"
        [disabled]="disabled"
        [routerLink]="routerLink"
      >
        {{ buttonTextRowOne | translate }} <br />
        {{ buttonTextRowTWO | translate }}
      </button>
    </div>
  `,
  styleUrls: [
    './button-contact.component.scss', // Basic style and responsive.
    './../../../shared/styles/button-contact.scss', // Change color and else.
  ],
})
export class ButtonContactComponent {
  /**
   * buttenClass means to be import the current  [ngClass] sounds:  buttonClass.
   */
  @Input() buttonClass: string = '';
  @Input() buttonTextRowOne: string = '';
  @Input() buttonTextRowTWO: string = '';
  @Input() disabled: boolean = false;
  @Input() routerLink: string | any[] = '';
}
