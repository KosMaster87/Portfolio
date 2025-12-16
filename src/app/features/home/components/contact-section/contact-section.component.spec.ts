import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ContactSectionComponent } from './contact-section.component';
import { SmoothScrollService, ThemeService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { environment } from '../../../../../environments/environment';

describe('ContactSectionComponent', () => {
  let component: ContactSectionComponent;
  let fixture: ComponentFixture<ContactSectionComponent>;
  let httpMock: HttpTestingController;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let smoothScrollServiceSpy: jasmine.SpyObj<SmoothScrollService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const currentThemeSignal = signal<'light' | 'dark'>('light');

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    translationServiceSpy.instant.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'CONTACT.heading': 'Contact',
        'CONTACT.title': 'Get in touch',
        'CONTACT.description': 'Contact me',
        'CONTACT.yourName': 'Your name',
        'CONTACT.yourNameRequired': 'Name is required',
        'CONTACT.yourNameInvalid': 'Invalid name',
        'CONTACT.yourEmail': 'Your email',
        'CONTACT.yourEmailRequired': 'Email is required',
        'CONTACT.yourEmailInvalid': 'Invalid email',
        'CONTACT.yourMessage': 'Your message',
        'CONTACT.yourMessageRequired': 'Message is required',
        'CONTACT.checkboxText1': 'I agree to the',
        'CONTACT.checkboxText2': 'privacy policy',
        'CONTACT.checkboxText3': 'and give consent to process my data.',
        'CONTACT.checkboxRequired': 'Checkbox is required',
        'CONTACT.submitButton': 'Send',
        'CONTACT.submitting': 'Sending...',
        'CONTACT.successMessage': 'Message sent successfully',
        'CONTACT.errorMessage': 'Failed to send message',
      };
      return translations[key] || key;
    });

    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
      currentTheme: currentThemeSignal,
    });

    smoothScrollServiceSpy = jasmine.createSpyObj('SmoothScrollService', ['scrollElementToTop']);

    TestBed.configureTestingModule({
      imports: [ContactSectionComponent, HttpClientTestingModule, FormsModule],
      providers: [
        provideRouter([]),
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: SmoothScrollService, useValue: smoothScrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ContactSectionComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isDark computed', () => {
    it('should return false when theme is light', () => {
      expect(component['isDark']()).toBe(false);
    });

    it('should return true when theme is dark', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const currentThemeSignal = signal<'light' | 'dark'>('dark');

      themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
        currentTheme: currentThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [ContactSectionComponent, HttpClientTestingModule],
        providers: [
          provideRouter([]),
          { provide: TranslationService, useValue: translationServiceSpy },
          { provide: ThemeService, useValue: themeServiceSpy },
          { provide: SmoothScrollService, useValue: smoothScrollServiceSpy },
        ],
      });

      const newFixture = TestBed.createComponent(ContactSectionComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.detectChanges();

      expect(newComponent['isDark']()).toBe(true);
    });
  });

  describe('checkboxImage computed', () => {
    it('should return unchecked image when not checked', () => {
      component.isChecked.set(false);
      const image = component['checkboxImage']();
      expect(image).toBe('assets/images/vector/checkbox/checkbox-unchecked.svg');
    });

    it('should return checked image when checked', () => {
      component.isChecked.set(true);
      const image = component['checkboxImage']();
      expect(image).toBe('assets/images/vector/checkbox/checkbox-check.svg');
    });
  });

  describe('contactData computed', () => {
    it('should return all contact form labels', () => {
      const data = component['contactData']();
      expect(data.heading).toBe('Contact');
      expect(data.title).toBe('Get in touch');
      expect(data.description).toBe('Contact me');
    });

    it('should return all form field labels', () => {
      const data = component['contactData']();
      expect(data.yourName).toBe('Your name');
      expect(data.yourEmail).toBe('Your email');
      expect(data.yourMessage).toBe('Your message');
    });

    it('should return all validation messages', () => {
      const data = component['contactData']();
      expect(data.yourNameRequired).toBe('Name is required');
      expect(data.yourEmailRequired).toBe('Email is required');
      expect(data.yourMessageRequired).toBe('Message is required');
    });

    it('should return submit button labels', () => {
      const data = component['contactData']();
      expect(data.submitButton).toBe('Send');
      expect(data.submitting).toBe('Sending...');
    });

    it('should return notification messages', () => {
      const data = component['contactData']();
      expect(data.successMessage).toBe('Message sent successfully');
      expect(data.errorMessage).toBe('Failed to send message');
    });
  });

  describe('toggleCheckbox', () => {
    it('should toggle checkbox from false to true', () => {
      component.isChecked.set(false);
      component.toggleCheckbox();
      expect(component.isChecked()).toBe(true);
    });

    it('should toggle checkbox from true to false', () => {
      component.isChecked.set(true);
      component.toggleCheckbox();
      expect(component.isChecked()).toBe(false);
    });

    it('should toggle multiple times', () => {
      component.isChecked.set(false);
      component.toggleCheckbox();
      expect(component.isChecked()).toBe(true);
      component.toggleCheckbox();
      expect(component.isChecked()).toBe(false);
      component.toggleCheckbox();
      expect(component.isChecked()).toBe(true);
    });
  });

  describe('trimWhitespace', () => {
    it('should trim name field', () => {
      component.formData.name = '  John Doe  ';
      const control = {
        control: { updateValueAndValidity: jasmine.createSpy() },
      } as unknown as NgModel;
      component.trimWhitespace('name', control);
      expect(component.formData.name).toBe('John Doe');
      expect(control.control.updateValueAndValidity).toHaveBeenCalled();
    });

    it('should trim email field', () => {
      component.formData.email = '  test@example.com  ';
      const control = {
        control: { updateValueAndValidity: jasmine.createSpy() },
      } as unknown as NgModel;
      component.trimWhitespace('email', control);
      expect(component.formData.email).toBe('test@example.com');
      expect(control.control.updateValueAndValidity).toHaveBeenCalled();
    });

    it('should handle empty name field', () => {
      component.formData.name = '';
      const control = {
        control: { updateValueAndValidity: jasmine.createSpy() },
      } as unknown as NgModel;
      component.trimWhitespace('name', control);
      expect(component.formData.name).toBe('');
    });

    it('should handle empty email field', () => {
      component.formData.email = '';
      const control = {
        control: { updateValueAndValidity: jasmine.createSpy() },
      } as unknown as NgModel;
      component.trimWhitespace('email', control);
      expect(component.formData.email).toBe('');
    });
  });

  describe('onEmailLinkFocus', () => {
    it('should scroll section to top when link is focused', () => {
      const section = document.createElement('section');
      const link = document.createElement('a');
      section.appendChild(link);

      const event = new FocusEvent('focus', { relatedTarget: link });
      Object.defineProperty(event, 'target', { value: link, writable: false });

      component.onEmailLinkFocus(event);

      expect(smoothScrollServiceSpy.scrollElementToTop).toHaveBeenCalledWith(section, 1000);
    });

    it('should not scroll if no section found', () => {
      const link = document.createElement('a');
      const event = new FocusEvent('focus', { relatedTarget: link });
      Object.defineProperty(event, 'target', { value: link, writable: false });

      component.onEmailLinkFocus(event);

      expect(smoothScrollServiceSpy.scrollElementToTop).not.toHaveBeenCalled();
    });
  });

  describe('showMessage', () => {
    it('should show success message', () => {
      component.showMessage('Test success', 'success');
      expect(component.showNotification).toBe(true);
      expect(component.notificationMessage).toBe('Test success');
      expect(component.notificationType).toBe('success');
    });

    it('should show error message', () => {
      component.showMessage('Test error', 'error');
      expect(component.showNotification).toBe(true);
      expect(component.notificationMessage).toBe('Test error');
      expect(component.notificationType).toBe('error');
    });

    it('should default to success type', () => {
      component.showMessage('Default message');
      expect(component.notificationType).toBe('success');
    });
  });

  describe('hideNotification', () => {
    it('should hide notification', () => {
      component.showNotification = true;
      component.hideNotification();
      expect(component.showNotification).toBe(false);
    });
  });

  describe('onSubmit', () => {
    let mockForm: jasmine.SpyObj<NgForm>;

    beforeEach(() => {
      mockForm = jasmine.createSpyObj('NgForm', ['resetForm'], {
        submitted: true,
        form: { valid: true },
      });
      component.isChecked.set(true);
      component.formData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      };
    });

    it('should submit form successfully', (done) => {
      component.onSubmit(mockForm);

      const req = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(JSON.parse(req.request.body)).toEqual(component.formData);

      req.flush('Success');

      setTimeout(() => {
        expect(component.isSubmitting).toBe(false);
        expect(mockForm.resetForm).toHaveBeenCalled();
        expect(component.isChecked()).toBe(false);
        expect(component.showNotification).toBe(true);
        expect(component.notificationType).toBe('success');
        done();
      }, 100);
    });

    it('should handle submission error', (done) => {
      component.onSubmit(mockForm);

      const req = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
      req.error(new ProgressEvent('error'));

      setTimeout(() => {
        expect(component.isSubmitting).toBe(false);
        expect(component.showNotification).toBe(true);
        expect(component.notificationType).toBe('error');
        done();
      }, 100);
    });

    it('should set isSubmitting to true during submission', () => {
      component.onSubmit(mockForm);
      expect(component.isSubmitting).toBe(true);

      const req = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
      req.flush('Success');
    });

    it('should not submit if form is invalid', () => {
      const invalidForm = jasmine.createSpyObj('NgForm', ['resetForm'], {
        submitted: true,
        form: { valid: false },
      });
      component.onSubmit(invalidForm);
      httpMock.expectNone(`${environment.apiUrl}/contact/contact.php`);
    });

    it('should not submit if checkbox is not checked', () => {
      component.isChecked.set(false);
      component.onSubmit(mockForm);
      httpMock.expectNone(`${environment.apiUrl}/contact/contact.php`);
    });

    it('should not submit if form is not submitted', () => {
      const unsubmittedForm = jasmine.createSpyObj('NgForm', ['resetForm'], {
        submitted: false,
        form: { valid: true },
      });
      component.onSubmit(unsubmittedForm);
      httpMock.expectNone(`${environment.apiUrl}/contact/contact.php`);
    });
  });

  describe('DOM rendering', () => {
    it('should render contact section', () => {
      const section = fixture.nativeElement.querySelector('.contact-section');
      expect(section).toBeTruthy();
    });

    it('should render submit button', () => {
      const button = fixture.nativeElement.querySelector('app-submit-button');
      expect(button).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle consecutive submissions', (done) => {
      const mockForm = jasmine.createSpyObj('NgForm', ['resetForm'], {
        submitted: true,
        form: { valid: true },
      });
      component.isChecked.set(true);
      component.formData = {
        name: 'John',
        email: 'john@test.com',
        message: 'Test',
      };

      component.onSubmit(mockForm);
      const req1 = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
      req1.flush('Success');

      setTimeout(() => {
        component.isChecked.set(true);
        component.onSubmit(mockForm);
        const req2 = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
        req2.flush('Success');
        done();
      }, 200);
    });

    it('should handle special characters in form data', () => {
      const mockForm = jasmine.createSpyObj('NgForm', ['resetForm'], {
        submitted: true,
        form: { valid: true },
      });
      component.isChecked.set(true);
      component.formData = {
        name: 'Jöhn Döe',
        email: 'test+tag@example.com',
        message: 'Special chars: äöü ß € @',
      };

      component.onSubmit(mockForm);

      const req = httpMock.expectOne(`${environment.apiUrl}/contact/contact.php`);
      const body = JSON.parse(req.request.body);
      expect(body.name).toBe('Jöhn Döe');
      expect(body.email).toBe('test+tag@example.com');
      expect(body.message).toContain('ß');
      req.flush('Success');
    });
  });
});
