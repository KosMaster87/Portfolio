import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavButtonComponent } from './nav-button.component';
import { NavigationService, ThemeService } from '@core/services';
import { signal } from '@angular/core';

describe('NavButtonComponent', () => {
  let component: NavButtonComponent;
  let fixture: ComponentFixture<NavButtonComponent>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');

    navigationServiceSpy = jasmine.createSpyObj('NavigationService', [
      'navigateToHome',
      'navigateToSection',
      'navigateToRoute',
    ]);
    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
    });

    TestBed.configureTestingModule({
      imports: [NavButtonComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(NavButtonComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create with all required inputs', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('label input', () => {
    it('should accept and reflect label value', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.label()).toBe('Home');
    });

    it('should accept different label values', () => {
      fixture.componentRef.setInput('label', 'Back to Home');
      fixture.componentRef.setInput('icon', 'back');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.label()).toBe('Back to Home');
    });
  });

  describe('icon input', () => {
    it('should accept home icon', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('home');
    });

    it('should accept hero icon', () => {
      fixture.componentRef.setInput('label', 'Hero');
      fixture.componentRef.setInput('icon', 'hero');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('hero');
    });

    it('should accept about icon', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('about');
    });

    it('should accept skills icon', () => {
      fixture.componentRef.setInput('label', 'Skills');
      fixture.componentRef.setInput('icon', 'skills');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('skills');
    });

    it('should accept projects icon', () => {
      fixture.componentRef.setInput('label', 'Projects');
      fixture.componentRef.setInput('icon', 'projects');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('projects');
    });

    it('should accept contact icon', () => {
      fixture.componentRef.setInput('label', 'Contact');
      fixture.componentRef.setInput('icon', 'contact');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('contact');
    });

    it('should accept back icon', () => {
      fixture.componentRef.setInput('label', 'Back');
      fixture.componentRef.setInput('icon', 'back');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.icon()).toBe('back');
    });
  });

  describe('routerLink input', () => {
    it('should accept string routerLink', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.routerLink()).toBe('/');
    });

    it('should accept array routerLink', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', ['/', 'about']);
      fixture.detectChanges();

      expect(component.routerLink()).toEqual(['/', 'about']);
    });
  });

  describe('fragment input', () => {
    it('should be undefined by default', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component.fragment()).toBeUndefined();
    });

    it('should accept fragment value', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.componentRef.setInput('fragment', 'about');
      fixture.detectChanges();

      expect(component.fragment()).toBe('about');
    });
  });

  describe('iconPath computed', () => {
    it('should return correct path for home icon', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['iconPath']()).toBe('/assets/images/vector/menu/home.svg');
    });

    it('should return correct path for about icon', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['iconPath']()).toBe('/assets/images/vector/menu/about.svg');
    });

    it('should return correct path for back icon', () => {
      fixture.componentRef.setInput('label', 'Back');
      fixture.componentRef.setInput('icon', 'back');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['iconPath']()).toBe('/assets/images/vector/menu/back.svg');
    });
  });

  describe('isDark computed', () => {
    it('should be false when theme is light', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['isDark']()).toBe(false);
    });

    it('should be true when theme is dark', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [NavButtonComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: darkThemeServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(NavButtonComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['isDark']()).toBe(true);
    });

    it('should be false when theme is auto', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('auto');
      const autoThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [NavButtonComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: autoThemeServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(NavButtonComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['isDark']()).toBe(false);
    });
  });

  describe('navigate()', () => {
    it('should call navigateToRoute when no fragment is provided', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/');
      expect(navigationServiceSpy.navigateToSection).not.toHaveBeenCalled();
    });

    it('should call navigateToSection when fragment is provided with string routerLink', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.componentRef.setInput('fragment', 'about');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('about', '/');
      expect(navigationServiceSpy.navigateToRoute).not.toHaveBeenCalled();
    });

    it('should call navigateToSection when fragment is provided with array routerLink', () => {
      fixture.componentRef.setInput('label', 'Projects');
      fixture.componentRef.setInput('icon', 'projects');
      fixture.componentRef.setInput('routerLink', ['/', 'projects']);
      fixture.componentRef.setInput('fragment', 'projects');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('projects', '/');
      expect(navigationServiceSpy.navigateToRoute).not.toHaveBeenCalled();
    });

    it('should use first element of array routerLink for section navigation', () => {
      fixture.componentRef.setInput('label', 'Contact');
      fixture.componentRef.setInput('icon', 'contact');
      fixture.componentRef.setInput('routerLink', ['/home', 'section']);
      fixture.componentRef.setInput('fragment', 'contact');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('contact', '/home');
    });
  });

  describe('DOM rendering', () => {
    it('should render button element', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');

      expect(button).toBeTruthy();
    });

    it('should have type button', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');

      expect(button.getAttribute('type')).toBe('button');
    });

    it('should have aria-label from label input', () => {
      fixture.componentRef.setInput('label', 'Back to Home');
      fixture.componentRef.setInput('icon', 'back');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');

      expect(button.getAttribute('aria-label')).toBe('Back to Home');
    });

    it('should not have dark class in light theme', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');

      expect(button.classList.contains('nav-btn--dark')).toBe(false);
    });

    it('should have dark class in dark theme', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [NavButtonComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: darkThemeServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(NavButtonComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');

      expect(button.classList.contains('nav-btn--dark')).toBe(true);
    });

    it('should render icon image', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.nav-btn__icon');

      expect(icon).toBeTruthy();
      expect(icon.tagName).toBe('IMG');
    });

    it('should have correct icon src', () => {
      fixture.componentRef.setInput('label', 'Projects');
      fixture.componentRef.setInput('icon', 'projects');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.nav-btn__icon');

      expect(icon.getAttribute('src')).toBe('/assets/images/vector/menu/projects.svg');
    });

    it('should have icon alt text with icon suffix', () => {
      fixture.componentRef.setInput('label', 'Contact');
      fixture.componentRef.setInput('icon', 'contact');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.nav-btn__icon');

      expect(icon.getAttribute('alt')).toBe('Contact icon');
    });

    it('should have draggable false on icon', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.nav-btn__icon');

      expect(icon.getAttribute('draggable')).toBe('false');
    });

    it('should render label span', () => {
      fixture.componentRef.setInput('label', 'Skills');
      fixture.componentRef.setInput('icon', 'skills');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.nav-btn__label');

      expect(label).toBeTruthy();
      expect(label.textContent.trim()).toBe('Skills');
    });
  });

  describe('Click interaction', () => {
    it('should call navigate when button is clicked', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      spyOn(component, 'navigate');

      const button = fixture.nativeElement.querySelector('button.nav-btn');
      button.click();

      expect(component.navigate).toHaveBeenCalled();
    });

    it('should call navigateToRoute when clicked without fragment', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');
      button.click();

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/');
    });

    it('should call navigateToSection when clicked with fragment', () => {
      fixture.componentRef.setInput('label', 'About');
      fixture.componentRef.setInput('icon', 'about');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.componentRef.setInput('fragment', 'about');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.nav-btn');
      button.click();

      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('about', '/');
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple clicks', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      component.navigate();
      component.navigate();
      component.navigate();

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledTimes(3);
    });

    it('should update icon path when icon changes', () => {
      fixture.componentRef.setInput('label', 'Home');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '/');
      fixture.detectChanges();

      expect(component['iconPath']()).toBe('/assets/images/vector/menu/home.svg');

      fixture.componentRef.setInput('icon', 'about');
      fixture.detectChanges();

      expect(component['iconPath']()).toBe('/assets/images/vector/menu/about.svg');
    });

    it('should handle empty string routerLink', () => {
      fixture.componentRef.setInput('label', 'Test');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', '');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('');
    });

    it('should handle empty array routerLink with fragment', () => {
      fixture.componentRef.setInput('label', 'Test');
      fixture.componentRef.setInput('icon', 'home');
      fixture.componentRef.setInput('routerLink', []);
      fixture.componentRef.setInput('fragment', 'test');
      fixture.detectChanges();

      component.navigate();

      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('test', undefined);
    });
  });
});
