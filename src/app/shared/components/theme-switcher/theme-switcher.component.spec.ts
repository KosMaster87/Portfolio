import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { ThemeService } from '../../../core/services';

describe('ThemeSwitcherComponent', () => {
  let component: ThemeSwitcherComponent;
  let fixture: ComponentFixture<ThemeSwitcherComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setTheme'], {
      currentTheme: jasmine.createSpy('currentTheme').and.returnValue('light'),
    });

    TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
      providers: [{ provide: ThemeService, useValue: themeServiceSpy }],
    });

    fixture = TestBed.createComponent(ThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signals', () => {
    it('should have isDropdownOpen signal initially false', () => {
      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should return current theme from theme service', () => {
      expect(component.currentTheme()).toBe('light');
    });
  });

  describe('toggleDropdown()', () => {
    it('should open dropdown when closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should close dropdown when open', () => {
      component.isDropdownOpen.set(true);

      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should toggle dropdown multiple times', () => {
      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(true);

      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(false);

      component.toggleDropdown();
      expect(component.isDropdownOpen()).toBe(true);
    });
  });

  describe('closeDropdown()', () => {
    it('should close dropdown', () => {
      component.isDropdownOpen.set(true);

      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should keep dropdown closed when already closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('switchTheme()', () => {
    it('should call theme service with light theme', () => {
      component.switchTheme('light');

      expect(themeServiceSpy.setTheme).toHaveBeenCalledWith('light');
    });

    it('should call theme service with dark theme', () => {
      component.switchTheme('dark');

      expect(themeServiceSpy.setTheme).toHaveBeenCalledWith('dark');
    });

    it('should call theme service with auto theme', () => {
      component.switchTheme('auto');

      expect(themeServiceSpy.setTheme).toHaveBeenCalledWith('auto');
    });

    it('should close dropdown after switching theme', () => {
      component.isDropdownOpen.set(true);

      component.switchTheme('dark');

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should switch theme and close dropdown in one action', () => {
      component.isDropdownOpen.set(true);

      component.switchTheme('light');

      expect(themeServiceSpy.setTheme).toHaveBeenCalledWith('light');
      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('handleClickOutside()', () => {
    it('should close dropdown when clicking outside', () => {
      component.isDropdownOpen.set(true);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: document.body, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should not close dropdown when clicking inside', () => {
      component.isDropdownOpen.set(true);

      const themeSwitcher = document.createElement('div');
      themeSwitcher.classList.add('theme-switcher');
      document.body.appendChild(themeSwitcher);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: themeSwitcher, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(true);

      document.body.removeChild(themeSwitcher);
    });

    it('should not close dropdown when dropdown is already closed', () => {
      expect(component.isDropdownOpen()).toBe(false);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: document.body, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(false);
    });

    it('should handle clicks on child elements inside theme-switcher', () => {
      component.isDropdownOpen.set(true);

      const themeSwitcher = document.createElement('div');
      themeSwitcher.classList.add('theme-switcher');
      const childButton = document.createElement('button');
      themeSwitcher.appendChild(childButton);
      document.body.appendChild(themeSwitcher);

      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: childButton, writable: false });

      component.handleClickOutside(event);

      expect(component.isDropdownOpen()).toBe(true);

      document.body.removeChild(themeSwitcher);
    });
  });

  describe('onFocusOut()', () => {
    it('should close dropdown when focus leaves component', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const event = new FocusEvent('focusout', {
        relatedTarget: outsideElement,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(false);

      document.body.removeChild(outsideElement);
    });

    it('should not close dropdown when focus stays within component', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');
      const childElement = document.createElement('button');
      container.appendChild(childElement);

      const event = new FocusEvent('focusout', {
        relatedTarget: childElement,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should handle focus out with null relatedTarget', () => {
      component.isDropdownOpen.set(true);

      const container = document.createElement('div');

      const event = new FocusEvent('focusout', {
        relatedTarget: null,
      });
      Object.defineProperty(event, 'currentTarget', { value: container, writable: false });

      component.onFocusOut(event);

      expect(component.isDropdownOpen()).toBe(false);
    });
  });

  describe('DOM rendering', () => {
    it('should render toggle button', () => {
      const button = fixture.nativeElement.querySelector('.theme-switcher__toggle');

      expect(button).toBeTruthy();
    });

    it('should not render dropdown initially', () => {
      const dropdown = fixture.nativeElement.querySelector('.theme-switcher__dropdown');

      expect(dropdown).toBeNull();
    });

    it('should render dropdown when open', () => {
      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      const dropdown = fixture.nativeElement.querySelector('.theme-switcher__dropdown');

      expect(dropdown).toBeTruthy();
    });

    it('should render three theme options when dropdown is open', () => {
      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.theme-switcher__option');

      expect(options.length).toBe(3);
    });

    it('should update aria-expanded attribute', () => {
      const button = fixture.nativeElement.querySelector('.theme-switcher__toggle');

      expect(button.getAttribute('aria-expanded')).toBe('false');

      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      expect(button.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('Theme-specific rendering', () => {
    it('should show light mode icon when theme is light', () => {
      (themeServiceSpy.currentTheme as jasmine.Spy).and.returnValue('light');
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector('.theme-switcher__toggle img');

      expect(img.alt).toBe('Light mode');
      expect(img.src).toContain('light-mode.svg');
    });

    it('should show dark mode icon when theme is dark', () => {
      const darkThemeService = jasmine.createSpyObj('ThemeService', ['setTheme'], {
        currentTheme: jasmine.createSpy('currentTheme').and.returnValue('dark'),
      });

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ThemeSwitcherComponent],
        providers: [{ provide: ThemeService, useValue: darkThemeService }],
      });

      const darkFixture = TestBed.createComponent(ThemeSwitcherComponent);
      darkFixture.detectChanges();

      const img = darkFixture.nativeElement.querySelector('.theme-switcher__toggle img');

      expect(img.alt).toBe('Dark mode');
      expect(img.src).toContain('dark-mode.svg');
    });

    it('should show auto mode icon when theme is auto', () => {
      const autoThemeService = jasmine.createSpyObj('ThemeService', ['setTheme'], {
        currentTheme: jasmine.createSpy('currentTheme').and.returnValue('auto'),
      });

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ThemeSwitcherComponent],
        providers: [{ provide: ThemeService, useValue: autoThemeService }],
      });

      const autoFixture = TestBed.createComponent(ThemeSwitcherComponent);
      autoFixture.detectChanges();

      const img = autoFixture.nativeElement.querySelector('.theme-switcher__toggle img');

      expect(img.alt).toBe('Auto mode');
      expect(img.src).toContain('computer.svg');
    });

    it('should mark active option in dropdown', () => {
      (themeServiceSpy.currentTheme as jasmine.Spy).and.returnValue('dark');
      component.isDropdownOpen.set(true);
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.theme-switcher__option');
      const darkOption = options[1];

      expect(darkOption.classList.contains('theme-switcher__option--active')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid toggle clicks', () => {
      component.toggleDropdown();
      component.toggleDropdown();
      component.toggleDropdown();

      expect(component.isDropdownOpen()).toBe(true);
    });

    it('should handle multiple theme switches', () => {
      component.switchTheme('light');
      component.switchTheme('dark');
      component.switchTheme('auto');

      expect(themeServiceSpy.setTheme).toHaveBeenCalledTimes(3);
      expect(themeServiceSpy.setTheme).toHaveBeenCalledWith('auto');
    });

    it('should maintain closed state after multiple close calls', () => {
      component.closeDropdown();
      component.closeDropdown();
      component.closeDropdown();

      expect(component.isDropdownOpen()).toBe(false);
    });
  });
});
