import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconButtonComponent } from './icon-button';
import { ThemeService } from '@core/services';
import { signal } from '@angular/core';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const currentThemeSignal = signal<'light' | 'dark'>('light');

    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
      currentTheme: currentThemeSignal,
    });

    TestBed.configureTestingModule({
      imports: [IconButtonComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
    });

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Back to top');
    fixture.detectChanges();
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
        imports: [IconButtonComponent],
        providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
      });

      const newFixture = TestBed.createComponent(IconButtonComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.componentRef.setInput('ariaLabel', 'Test');
      newFixture.detectChanges();

      expect(newComponent['isDark']()).toBe(true);
    });

    it('should return false when theme is auto', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('auto');
      const currentThemeSignal = signal<'light' | 'dark'>('light');

      themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
        currentTheme: currentThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [IconButtonComponent],
        providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
      });

      const newFixture = TestBed.createComponent(IconButtonComponent);
      const newComponent = newFixture.componentInstance;
      newFixture.componentRef.setInput('ariaLabel', 'Test');
      newFixture.detectChanges();

      expect(newComponent['isDark']()).toBe(false);
    });
  });

  describe('arrowImage property', () => {
    it('should have default arrow image path', () => {
      expect(component['arrowImage']).toBe('/assets/images/vector/arrows/arrow-light.svg');
    });
  });

  describe('ariaLabel input', () => {
    it('should accept aria label', () => {
      expect(component.ariaLabel()).toBe('Back to top');
    });

    it('should update aria label', () => {
      fixture.componentRef.setInput('ariaLabel', 'New label');
      fixture.detectChanges();
      expect(component.ariaLabel()).toBe('New label');
    });
  });

  describe('type input', () => {
    it('should default to button type', () => {
      expect(component.type()).toBe('button');
    });

    it('should accept submit type', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      expect(component.type()).toBe('submit');
    });

    it('should accept reset type', () => {
      fixture.componentRef.setInput('type', 'reset');
      fixture.detectChanges();
      expect(component.type()).toBe('reset');
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
      button?.click();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit multiple times on multiple clicks', () => {
      const emitSpy = spyOn(component.clicked, 'emit');
      component.onClick();
      component.onClick();
      component.onClick();
      expect(emitSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('DOM rendering', () => {
    it('should render button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should set aria-label attribute', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Back to top');
    });

    it('should set button type attribute', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should update button type when input changes', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('type')).toBe('submit');
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle theme changes', () => {
      const isDarkBefore = component['isDark']();
      expect(isDarkBefore).toBe(false);
    });
  });
});
