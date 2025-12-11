/**
 * @fileoverview Contact section component.
 * @description Contact form with validation and submission to backend API.
 * @module features/home/components/contact-section
 */

import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SmoothScrollService, ThemeService, TranslationService } from '@core/services';
import { NotificationComponent, SubmitButtonComponent } from '@shared/components';

/**
 * Contact section component.
 * Provides contact form with validation and submission to backend API.
 * Includes real-time validation, notification system, and theme-aware checkbox.
 */
@Component({
  selector: 'app-contact-section',
  imports: [FormsModule, RouterModule, NotificationComponent, SubmitButtonComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  private http = inject(HttpClient);
  protected translationService = inject(TranslationService);
  private themeService = inject(ThemeService);
  private smoothScrollService = inject(SmoothScrollService);

  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' = 'success';
  isChecked = signal(false);
  isSubmitting = false;

  protected isDark = computed(() => this.themeService.activeTheme() === 'dark');
  protected checkboxImage = computed(() => {
    const base = 'assets/images/vector/checkbox';
    return this.isChecked() ? `${base}/checkbox-check.svg` : `${base}/checkbox-unchecked.svg`;
  });

  /**
   * Computed contact content data with translations.
   * Reactively updates when language changes.
   */
  protected contactData = computed(() => {
    const t = this.translationService;
    return {
      heading: t.instant('CONTACT.heading'),
      title: t.instant('CONTACT.title'),
      description: t.instant('CONTACT.description'),
      yourName: t.instant('CONTACT.yourName'),
      yourNameRequired: t.instant('CONTACT.yourNameRequired'),
      yourNameInvalid: t.instant('CONTACT.yourNameInvalid'),
      yourEmail: t.instant('CONTACT.yourEmail'),
      yourEmailRequired: t.instant('CONTACT.yourEmailRequired'),
      yourEmailInvalid: t.instant('CONTACT.yourEmailInvalid'),
      yourMessage: t.instant('CONTACT.yourMessage'),
      yourMessageRequired: t.instant('CONTACT.yourMessageRequired'),
      checkboxText1: t.instant('CONTACT.checkboxText1'),
      checkboxText2: t.instant('CONTACT.checkboxText2'),
      checkboxText3: t.instant('CONTACT.checkboxText3'),
      checkboxRequired: t.instant('CONTACT.checkboxRequired'),
      submitButton: t.instant('CONTACT.submitButton'),
      submitting: t.instant('CONTACT.submitting'),
      successMessage: t.instant('CONTACT.successMessage'),
      errorMessage: t.instant('CONTACT.errorMessage'),
    };
  });

  formData = {
    name: '',
    email: '',
    message: '',
  };

  post = {
    endPoint: 'https://portfolio.dev2k.org/api/contact/contact.php',
    body: (payload: any) => JSON.stringify(payload),
  };

  /**
   * Handles focus on email link - scrolls contact section into view
   * @param {FocusEvent} event - Focus event
   */
  onEmailLinkFocus(event: FocusEvent): void {
    const link = event.target as HTMLElement;
    const section = link.closest('section') as HTMLElement;

    if (section) {
      this.smoothScrollService.scrollElementToTop(section, 1000);
    }
  }

  /**
   * Handles form submission.
   * Validates form, sends data to backend, and displays result notification.
   * @param {NgForm} ngForm - Angular form instance
   */
  onSubmit(ngForm: NgForm): void {
    if (!this.isFormValid(ngForm)) {
      return;
    }

    this.isSubmitting = true;
    this.submitFormData(ngForm);
  }

  /**
   * Checks if form is valid and ready for submission.
   * @param {NgForm} ngForm - Angular form instance
   * @returns {boolean} True if form can be submitted
   * @private
   */
  private isFormValid(ngForm: NgForm): boolean {
    return ngForm.submitted && ngForm.form.valid && this.isChecked();
  }

  /**
   * Submits form data to backend API.
   * @param {NgForm} ngForm - Angular form instance
   * @private
   */
  private submitFormData(ngForm: NgForm): void {
    this.http
      .post(this.post.endPoint, this.post.body(this.formData), {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
      })
      .subscribe({
        next: (response) => this.handleSubmitSuccess(response, ngForm),
        error: (error) => this.handleSubmitError(error),
      });
  }

  /**
   * Handles successful form submission.
   * @param {string} response - Server response
   * @param {NgForm} ngForm - Angular form instance
   * @private
   */
  private handleSubmitSuccess(response: string, ngForm: NgForm): void {
    this.isSubmitting = false;
    ngForm.resetForm();
    this.isChecked.set(false);
    this.showMessage(this.contactData().successMessage, 'success');
  }

  /**
   * Handles form submission error.
   * @param {any} error - Error object from HTTP request
   * @private
   */
  private handleSubmitError(error: unknown): void {
    this.isSubmitting = false;
    this.showMessage(this.contactData().errorMessage, 'error');
  }

  /**
   * Displays notification message.
   * Auto-dismiss is handled by the notification component.
   * @param {string} message - Message to display
   * @param {'success' | 'error'} [type='success'] - Notification type
   */
  showMessage(message: string, type: 'success' | 'error' = 'success'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
  }

  /**
   * Hides notification message.
   */
  hideNotification(): void {
    this.showNotification = false;
  }

  /**
   * Trims whitespace from input fields.
   * @param {'name' | 'email'} field - Field name to trim
   * @param {NgModel} control - Angular form control
   */
  trimWhitespace(field: 'name' | 'email', control: NgModel): void {
    if (field === 'name' && this.formData.name) {
      this.formData.name = this.formData.name.trim();
    } else if (field === 'email' && this.formData.email) {
      this.formData.email = this.formData.email.trim();
    }
    control.control.updateValueAndValidity();
  }

  /**
   * Toggles the checkbox state.
   */
  toggleCheckbox(): void {
    this.isChecked.update((v) => !v);
  }
}
