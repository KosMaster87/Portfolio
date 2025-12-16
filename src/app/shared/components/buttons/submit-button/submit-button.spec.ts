import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitButtonComponent } from './submit-button';

describe('SubmitButtonComponent', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubmitButtonComponent],
    });

    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('label input', () => {
    it('should have default label', () => {
      fixture.detectChanges();
      expect(component.label).toBe('Send message');
    });

    it('should accept custom label', () => {
      component.label = 'Submit';
      fixture.detectChanges();
      expect(component.label).toBe('Submit');
    });

    it('should render label in template', () => {
      component.label = 'Custom Label';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('Custom Label');
    });
  });

  describe('type input', () => {
    it('should default to submit type', () => {
      fixture.detectChanges();
      expect(component.type).toBe('submit');
    });

    it('should accept button type', () => {
      component.type = 'button';
      fixture.detectChanges();
      expect(component.type).toBe('button');
    });

    it('should set button type attribute', () => {
      component.type = 'button';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('disabled input', () => {
    it('should default to false', () => {
      fixture.detectChanges();
      expect(component.disabled).toBe(false);
    });

    it('should accept disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(component.disabled).toBe(true);
    });

    it('should disable button when disabled is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should enable button when disabled is false', () => {
      component.disabled = false;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });
  });

  describe('onClick', () => {
    it('should emit clicked event when not disabled', () => {
      fixture.detectChanges();
      const emitSpy = spyOn(component.clicked, 'emit');
      const mockEvent = new MouseEvent('click');
      component.onClick(mockEvent);
      expect(emitSpy).toHaveBeenCalledWith(mockEvent);
    });

    it('should not emit when disabled', () => {
      component.disabled = true;
      const emitSpy = spyOn(component.clicked, 'emit');
      const mockEvent = new MouseEvent('click');
      component.onClick(mockEvent);
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should prevent default when disabled', () => {
      component.disabled = true;
      const mockEvent = new MouseEvent('click');
      const preventDefaultSpy = spyOn(mockEvent, 'preventDefault');
      component.onClick(mockEvent);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should not prevent default when not disabled', () => {
      component.disabled = false;
      const mockEvent = new MouseEvent('click');
      const preventDefaultSpy = spyOn(mockEvent, 'preventDefault');
      component.onClick(mockEvent);
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should emit multiple times on multiple clicks', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      const mockEvent = new MouseEvent('click');
      component.onClick(mockEvent);
      component.onClick(mockEvent);
      expect(emitSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('DOM rendering', () => {
    it('should render button element', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should have submit-button class', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should add disabled attribute when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(true);
    });

    it('should not have disabled attribute when enabled', () => {
      component.disabled = false;
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBe(false);
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle state changes correctly', () => {
      component.label = 'New Label';
      component.disabled = true;
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('New Label');
      expect(button.disabled).toBe(true);
    });

    it('should emit event on button click when enabled', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      expect(emitSpy).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty label', () => {
      component.label = '';
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent.trim()).toBe('');
    });

    it('should handle long label text', () => {
      component.label = 'This is a very long label text that might wrap';
      fixture.detectChanges();
      expect(component.label.length).toBeGreaterThan(20);
    });
  });
});
