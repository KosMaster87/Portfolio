import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NavigationService, ThemeService, TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const currentThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const isOnHomePageSignal = signal(true);
    const isLoadedSignal = signal(true);
    const currentLangSignal = signal('en');

    navigationServiceSpy = jasmine.createSpyObj(
      'NavigationService',
      ['scrollToSection', 'navigateToHome', 'navigateToTop', 'navigateToRoute'],
      {
        isOnHomePage: isOnHomePageSignal,
        menuItems: [
          { sectionId: 'hero', label: 'MENU.hero' },
          { sectionId: 'about', label: 'MENU.about' },
          { sectionId: 'skills', label: 'MENU.skills' },
          { sectionId: 'projects', label: 'MENU.projects' },
          { sectionId: 'contact', label: 'MENU.contact' },
        ],
      }
    );
    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
      currentTheme: currentThemeSignal,
    });
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant', 'use'], {
      isLoaded: isLoadedSignal,
      currentLang: currentLangSignal,
    });
    translationServiceSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('no-scroll');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isMenuOpen signal', () => {
    it('should be false by default', () => {
      expect(component.isMenuOpen()).toBe(false);
    });
  });

  describe('logoPath computed', () => {
    it('should return dark logo when theme is light', () => {
      expect(component['logoPath']()).toBe('/theme-dark/icon-96.png');
    });

    it('should return light logo when theme is dark', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const currentThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
        currentTheme: currentThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [HeaderComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: darkThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component['logoPath']()).toBe('/theme-light/icon-96.png');
    });

    it('should return dark logo when theme is auto', () => {
      TestBed.resetTestingModule();
      const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('auto');
      const currentThemeSignal = signal<'light' | 'dark' | 'auto'>('auto');
      const autoThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: activeThemeSignal,
        currentTheme: currentThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [HeaderComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: autoThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component['logoPath']()).toBe('/theme-dark/icon-96.png');
    });
  });

  describe('menuItems getter', () => {
    it('should return menu items from navigation service', () => {
      expect(component['menuItems'].length).toBe(5);
      expect(component['menuItems'][0].sectionId).toBe('hero');
    });
  });

  describe('scrollToSection()', () => {
    it('should call navigationService.scrollToSection when menu is closed', () => {
      component.scrollToSection('about');

      expect(navigationServiceSpy.scrollToSection).toHaveBeenCalledWith('about');
    });

    it('should close menu and scroll when menu is open', (done) => {
      component.isMenuOpen.set(true);

      component.scrollToSection('projects');

      setTimeout(() => {
        expect(component.isMenuOpen()).toBe(false);
        expect(navigationServiceSpy.scrollToSection).toHaveBeenCalledWith('projects');
        done();
      }, 850);
    });

    it('should handle different section ids', () => {
      component.scrollToSection('contact');

      expect(navigationServiceSpy.scrollToSection).toHaveBeenCalledWith('contact');
    });
  });

  describe('navigateToHome()', () => {
    it('should call navigateToTop when on home page', () => {
      component.navigateToHome();

      expect(navigationServiceSpy.navigateToTop).toHaveBeenCalled();
      expect(navigationServiceSpy.navigateToHome).not.toHaveBeenCalled();
    });

    it('should call navigateToHome when not on home page', () => {
      TestBed.resetTestingModule();
      const isOnHomePageSignal = signal(false);
      const navServiceSpy = jasmine.createSpyObj(
        'NavigationService',
        ['navigateToHome', 'navigateToTop'],
        {
          isOnHomePage: isOnHomePageSignal,
          menuItems: [],
        }
      );

      TestBed.configureTestingModule({
        imports: [HeaderComponent],
        providers: [
          { provide: NavigationService, useValue: navServiceSpy },
          { provide: ThemeService, useValue: themeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.navigateToHome();

      expect(navServiceSpy.navigateToHome).toHaveBeenCalled();
      expect(navServiceSpy.navigateToTop).not.toHaveBeenCalled();
    });
  });

  describe('toggleMenu()', () => {
    it('should toggle menu from false to true', () => {
      expect(component.isMenuOpen()).toBe(false);

      component.toggleMenu();

      expect(component.isMenuOpen()).toBe(true);
    });

    it('should toggle menu from true to false', () => {
      component.isMenuOpen.set(true);

      component.toggleMenu();

      expect(component.isMenuOpen()).toBe(false);
    });

    it('should toggle menu multiple times', () => {
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);

      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(false);

      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
    });
  });

  describe('closeMenu()', () => {
    it('should set menu to closed', () => {
      component.isMenuOpen.set(true);

      component.closeMenu();

      expect(component.isMenuOpen()).toBe(false);
    });

    it('should remove no-scroll class from body', () => {
      document.body.classList.add('no-scroll');

      component.closeMenu();

      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('should handle closing already closed menu', () => {
      expect(component.isMenuOpen()).toBe(false);

      component.closeMenu();

      expect(component.isMenuOpen()).toBe(false);
    });
  });

  describe('navigateToRoute()', () => {
    it('should close menu', () => {
      component.isMenuOpen.set(true);

      component.navigateToRoute('/imprint');

      expect(component.isMenuOpen()).toBe(false);
    });

    it('should call navigationService.navigateToRoute', () => {
      component.navigateToRoute('/imprint');

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/imprint');
    });

    it('should handle different routes', () => {
      component.navigateToRoute('/privacy-policy');

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/privacy-policy');
    });
  });

  describe('translate()', () => {
    it('should call translationService.instant', () => {
      const result = component.translate('MENU.home');

      expect(translationServiceSpy.instant).toHaveBeenCalledWith('MENU.home');
      expect(result).toBe('MENU.home');
    });

    it('should handle different translation keys', () => {
      const result = component.translate('MENU.about');

      expect(translationServiceSpy.instant).toHaveBeenCalledWith('MENU.about');
      expect(result).toBe('MENU.about');
    });
  });

  describe('DOM rendering', () => {
    it('should render header element', () => {
      const header = fixture.nativeElement.querySelector('header.header');

      expect(header).toBeTruthy();
    });

    it('should render logo with correct src', () => {
      const logo = fixture.nativeElement.querySelector('.header__logo-icon');

      expect(logo).toBeTruthy();
      expect(logo.getAttribute('src')).toBe('/theme-dark/icon-96.png');
    });

    it('should render logo text', () => {
      const logoText = fixture.nativeElement.querySelector('.header__logo-text');

      expect(logoText).toBeTruthy();
      expect(logoText.textContent.trim()).toBe('dev2k');
    });

    it('should render language switcher', () => {
      const languageSwitcher = fixture.nativeElement.querySelector('app-language-switcher');

      expect(languageSwitcher).toBeTruthy();
    });

    it('should render theme switcher', () => {
      const themeSwitcher = fixture.nativeElement.querySelector('app-theme-switcher');

      expect(themeSwitcher).toBeTruthy();
    });

    it('should render navigation when on home page', () => {
      const nav = fixture.nativeElement.querySelector('.header__nav');

      expect(nav).toBeTruthy();
    });

    it('should render menu items when on home page', () => {
      const navItems = fixture.nativeElement.querySelectorAll('.header__nav-item');

      expect(navItems.length).toBe(5);
    });

    it('should not render when translations not loaded', () => {
      TestBed.resetTestingModule();
      const isLoadedSignal = signal(false);
      const notLoadedTranslationSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
        isLoaded: isLoadedSignal,
      });

      TestBed.configureTestingModule({
        imports: [HeaderComponent],
        providers: [
          { provide: NavigationService, useValue: navigationServiceSpy },
          { provide: ThemeService, useValue: themeServiceSpy },
          { provide: TranslationService, useValue: notLoadedTranslationSpy },
        ],
      });

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.header__container');

      expect(container).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should handle rapid menu toggles', () => {
      component.toggleMenu();
      component.toggleMenu();
      component.toggleMenu();

      expect(component.isMenuOpen()).toBe(true);
    });

    it('should handle scrollToSection with empty string', () => {
      component.scrollToSection('');

      expect(navigationServiceSpy.scrollToSection).toHaveBeenCalledWith('');
    });

    it('should handle multiple close menu calls', () => {
      component.closeMenu();
      component.closeMenu();
      component.closeMenu();

      expect(component.isMenuOpen()).toBe(false);
    });

    it('should handle navigateToRoute with empty string', () => {
      component.navigateToRoute('');

      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('');
    });

    it('should clean up no-scroll class on component destroy', () => {
      document.body.classList.add('no-scroll');
      component.isMenuOpen.set(true);

      component.closeMenu();

      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });
  });
});
