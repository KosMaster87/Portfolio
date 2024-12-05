import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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
  private scrollService = inject(ScrollService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  buttonType: string = 'submit';
  isFocusedName = false;
  isFocusedEmail = false;
  isFocusedMessage = false;
  mailTest = false;
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
    console.log('Form submitted:', ngForm.valid);

    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();

            this.showMessage('Your message was sent successfully!');
          },
          error: (error) => {
            console.error(error);
            this.showMessage('An error occurred. Please try again.');
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  /**
   * Displays a message using a snack bar.
   * @param {string} message - The message to display.
   */
  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
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
   * Scrolls to the specified fragment on the page.
   * @param {string} fragment - The ID of the fragment to scroll to.
   */
  scrollToFragment(fragment: string): void {
    this.scrollService.scrollToFragment(fragment);
  }
}
