import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CtaButtonComponent } from './cta-button';
import { SmoothScrollService } from '../../../../core/services';

describe('CtaButtonComponent', () => {
  let component: CtaButtonComponent;
  let fixture: ComponentFixture<CtaButtonComponent>;
  let smoothScrollServiceSpy: jasmine.SpyObj<SmoothScrollService>;

  beforeEach(() => {
    smoothScrollServiceSpy = jasmine.createSpyObj('SmoothScrollService', ['scrollElementToTop']);

    TestBed.configureTestingModule({
      imports: [CtaButtonComponent],
      providers: [{ provide: SmoothScrollService, useValue: smoothScrollServiceSpy }],
    });

    fixture = TestBed.createComponent(CtaButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('btnContentText', 'Click Me');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('btnContentText input', () => {
    it('should accept button text', () => {
      expect(component.btnContentText()).toBe('Click Me');
    });

    it('should update button text', () => {
      fixture.componentRef.setInput('btnContentText', 'New Text');
      fixture.detectChanges();
      expect(component.btnContentText()).toBe('New Text');
    });

    it('should render button text in template', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('Click Me');
    });
  });

  describe('onClick', () => {
    it('should emit clicked event', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      component.onClick();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit when button is clicked', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('should scroll section to top when button is focused', () => {
      const section = document.createElement('section');
      const button = document.createElement('button');
      section.appendChild(button);

      const event = new FocusEvent('focus', { relatedTarget: button });
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component.onFocus(event);

      expect(smoothScrollServiceSpy.scrollElementToTop).toHaveBeenCalledWith(section, 1000);
    });

    it('should not scroll if no section found', () => {
      const button = document.createElement('button');
      const event = new FocusEvent('focus', { relatedTarget: button });
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component.onFocus(event);

      expect(smoothScrollServiceSpy.scrollElementToTop).not.toHaveBeenCalled();
    });

    it('should handle focus on nested elements', () => {
      const section = document.createElement('section');
      const div = document.createElement('div');
      const button = document.createElement('button');
      section.appendChild(div);
      div.appendChild(button);

      const event = new FocusEvent('focus', { relatedTarget: button });
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component.onFocus(event);

      expect(smoothScrollServiceSpy.scrollElementToTop).toHaveBeenCalledWith(section, 1000);
    });
  });

  describe('DOM rendering', () => {
    it('should render button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should have correct button class', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('cta-button')).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle click events', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

      button.click();
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});
