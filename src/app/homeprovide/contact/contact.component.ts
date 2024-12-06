import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../future-modul/shared.module';
import { ScrollService } from './../../shared/services/scroll/scroll.service';
import { ScrollToTopComponent } from './../../future-modul/components/scroll-to-fragment-top/scroll-to-top.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/**
 * ContactComponent handles the contact form functionality.
 * It allows users to submit their contact information and sends it to a backend service.
 *
 * **Features:**
 * - User input for name, email, and message.
 * - Form validation and submission.
 * - Displays success or error messages via snack bar.
 * - Provides checkbox toggle and hover state functionality.
 */
@Component({
  selector: 'app-contact',
  imports: [
    TranslateModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
    ScrollToTopComponent,
    MatSnackBarModule,
  ],
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.scss',
    './../../shared/styles/highlighting.scss',
  ],
})
export class ContactComponent {
  private translate: TranslateService = inject(TranslateService);
  private scrollService = inject(ScrollService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  buttonType: string = 'submit';
  isFocusedName = false;
  isFocusedEmail = false;
  isFocusedMessage = false;

  http = inject(HttpClient);
  isChecked = false;
  checkboxHovered = false;

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  post = {
    endPoint: 'https://portfolio.dev2k.org/contact/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  /**
   * Toggles the checked state of the checkbox.
   */
  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }

  /**
   * Tracks the hover state of the checkbox.
   * @param {boolean} isHovered - The hover state of the checkbox.
   */
  onHover(isHovered: boolean) {
    this.checkboxHovered = isHovered;
  }

  /**
   * Handles the form submission.
   * If the form is valid, sends a POST request with the contact data.
   * @param {NgForm} ngForm - The form to be submitted.
   */
  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.translate
              .get('CONTACT.success-message')
              .subscribe((message: string) => {
                this.showMessage(message);
              });
          },
          error: (error) => {
            this.translate
              .get('CONTACT.error-message')
              .subscribe((message: string) => {
                this.showMessage(message);
              });
          },
        });
    }
  }

  /**
   * Displays a message using a snack bar.
   * @param {string} message - The message to display.
   */
  showMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * Handles the focus event for input fields.
   * @param {string} field - The name of the field that received focus.
   * @param {boolean} isFocused - Whether the field is focused.
   */
  onFocus(field: string, isFocused: boolean) {
    if (field === 'name') {
      this.isFocusedName = isFocused;
    } else if (field === 'email') {
      this.isFocusedEmail = isFocused;
    } else if (field === 'message') {
      this.isFocusedMessage = isFocused;
    }
  }

  /**
   * Trims the leading and trailing whitespace from the specified field (name or email).
   * This method is intended to be called when the input field loses focus.
   *
   * @param {string} field - The name of the field to trim. It can either be 'name' or 'email'.
   * @returns {void} - This method does not return anything.
   */
  trimWhitespace(field: string, control: NgModel): void {
    if (field === 'name') {
      this.contactData.name = this.contactData.name.trim();
    } else if (field === 'email') {
      this.contactData.email = this.contactData.email.trim();
    }
    control.control.updateValueAndValidity();
  }

  /**
   * Scrolls to the specified fragment on the page.
   * @param {string} fragment - The ID of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
