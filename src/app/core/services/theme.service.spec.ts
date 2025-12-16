import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let documentElementSpy: jasmine.SpyObj<HTMLElement>;
  let metaElementSpy: jasmine.SpyObj<Element>;
  let manifestLinkSpy: jasmine.SpyObj<HTMLLinkElement>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);
    documentElementSpy = jasmine.createSpyObj('documentElement', ['setAttribute']);
    metaElementSpy = jasmine.createSpyObj('metaElement', ['setAttribute']);
    manifestLinkSpy = jasmine.createSpyObj('manifestLink', ['setAttribute']);

    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener'),
    } as any);

    spyOn(document, 'querySelector').and.callFake((selector: string) => {
      if (selector === 'meta[name="theme-color"]') return metaElementSpy;
      if (selector === 'link[rel="manifest"]') return manifestLinkSpy;
      return null;
    });

    spyOn(document, 'querySelectorAll').and.returnValue([] as any);

    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true,
    });

    Object.defineProperty(document, 'documentElement', {
      value: documentElementSpy,
      writable: true,
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  describe('Initial theme', () => {
    it('should initialize with auto theme when localStorage is empty', () => {
      localStorageSpy.getItem.and.returnValue(null);

      service = TestBed.inject(ThemeService);

      expect(service.currentTheme()).toBe('auto');
    });

    it('should initialize with stored theme from localStorage', () => {
      localStorageSpy.getItem.and.returnValue('dark');

      service = TestBed.inject(ThemeService);

      expect(service.currentTheme()).toBe('dark');
    });

    it('should default to auto when localStorage contains invalid theme', () => {
      localStorageSpy.getItem.and.returnValue('invalid-theme');

      service = TestBed.inject(ThemeService);

      expect(service.currentTheme()).toBe('auto');
    });
  });

  describe('setTheme()', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
    });

    it('should update currentTheme signal', () => {
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();

      service.setTheme('dark');

      expect(service.currentTheme()).toBe('dark');
    });

    it('should save theme to localStorage', () => {
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();

      service.setTheme('light');
      TestBed.flushEffects();

      expect(localStorageSpy.setItem).toHaveBeenCalledWith('portfolio-theme', 'light');
    });

    it('should apply theme to DOM', () => {
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();

      service.setTheme('dark');
      TestBed.flushEffects();

      expect(documentElementSpy.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });

    it('should resolve auto theme to system preference', () => {
      (window.matchMedia as jasmine.Spy).and.returnValue({
        matches: true,
        addEventListener: jasmine.createSpy(),
        removeEventListener: jasmine.createSpy(),
      } as any);

      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
      service.setTheme('auto');
      TestBed.flushEffects();

      expect(service.activeTheme()).toBe('dark');
      expect(documentElementSpy.setAttribute).toHaveBeenCalledWith('data-theme', 'dark');
    });
  });

  describe('toggleTheme()', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue('light');
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
    });

    it('should toggle from light to dark', () => {
      service.toggleTheme();
      TestBed.flushEffects();

      expect(service.currentTheme()).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      service.setTheme('dark');
      TestBed.flushEffects();
      service.toggleTheme();
      TestBed.flushEffects();

      expect(service.currentTheme()).toBe('light');
    });
  });

  describe('Theme resolution', () => {
    it('should resolve light theme to light', () => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();

      service.setTheme('light');
      TestBed.flushEffects();

      expect(service.activeTheme()).toBe('light');
    });

    it('should resolve dark theme to dark', () => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();

      service.setTheme('dark');
      TestBed.flushEffects();

      expect(service.activeTheme()).toBe('dark');
    });

    it('should resolve auto to system preference (light)', () => {
      (window.matchMedia as jasmine.Spy).and.returnValue({
        matches: false,
        addEventListener: jasmine.createSpy(),
        removeEventListener: jasmine.createSpy(),
      } as any);

      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
      service.setTheme('auto');
      TestBed.flushEffects();

      expect(service.activeTheme()).toBe('light');
    });

    it('should resolve auto to system preference (dark)', () => {
      (window.matchMedia as jasmine.Spy).and.returnValue({
        matches: true,
        addEventListener: jasmine.createSpy(),
        removeEventListener: jasmine.createSpy(),
      } as any);

      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
      service.setTheme('auto');
      TestBed.flushEffects();

      expect(service.activeTheme()).toBe('dark');
    });
  });

  describe('Meta theme-color', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
    });

    it('should update meta theme-color for light theme', () => {
      service.setTheme('light');
      TestBed.flushEffects();

      expect(metaElementSpy.setAttribute).toHaveBeenCalledWith('content', '#fffcf3');
    });

    it('should update meta theme-color for dark theme', () => {
      service.setTheme('dark');
      TestBed.flushEffects();

      expect(metaElementSpy.setAttribute).toHaveBeenCalledWith('content', '#1a1a1a');
    });
  });

  describe('PWA Manifest', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      service = TestBed.inject(ThemeService);
      TestBed.flushEffects();
    });

    it('should update manifest for light theme', () => {
      service.setTheme('light');
      TestBed.flushEffects();

      expect(manifestLinkSpy.setAttribute).toHaveBeenCalledWith(
        'href',
        '/manifest-light.webmanifest'
      );
    });

    it('should update manifest for dark theme', () => {
      service.setTheme('dark');
      TestBed.flushEffects();

      expect(manifestLinkSpy.setAttribute).toHaveBeenCalledWith(
        'href',
        '/manifest-dark.webmanifest'
      );
    });
  });

  describe('System theme changes', () => {
    it('should listen to system theme changes', () => {
      const mediaQuery = {
        matches: false,
        addEventListener: jasmine.createSpy('addEventListener'),
        removeEventListener: jasmine.createSpy('removeEventListener'),
      } as any;

      (window.matchMedia as jasmine.Spy).and.returnValue(mediaQuery);

      service = TestBed.inject(ThemeService);

      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
      expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', jasmine.any(Function));
    });
  });
});
