import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * ButtonContactComponent is a button component used for rendering a contact button.
 * It includes two rows of button text, which can be translated using the ngx-translate library.
 * The button's styling and behavior can be customized through input properties.
 */
@Component({
  selector: 'app-button-contact',
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <div class="btnFlexBox">
      <button
        class="btnSelf contact.btn-valid primeFont disableTextSelection"
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
    './button-contact.component.scss',
    './../../../shared/styles/button-contact.scss',
  ],
})
export class ButtonContactComponent {
  @Input() buttonClass: string = '';
  @Input() buttonTextRowOne: string = '';
  @Input() buttonTextRowTWO: string = '';
  @Input() disabled: boolean = false;
  @Input() routerLink: string | any[] = '';
}
