import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslationService, type Language } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;
  let httpMock: HttpTestingController;

  const mockTranslationsDe = {
    MENU: {
      home: 'Startseite',
      about: 'Über mich',
      projects: 'Projekte',
    },
    FOOTER: {
      copyright: 'Alle Rechte vorbehalten',
    },
  };

  const mockTranslationsEn = {
    MENU: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
    },
    FOOTER: {
      copyright: 'All rights reserved',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TranslationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const req = httpMock.expectOne('/i18n/de.json');
    req.flush(mockTranslationsDe);

    expect(service).toBeTruthy();
  });

  describe('Constructor initialization', () => {
    it('should load German translations by default', () => {
      const req = httpMock.expectOne('/i18n/de.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTranslationsDe);

      expect(service.currentLang()).toBe('de');
      expect(service.isLoaded()).toBe(true);
    });

    it('should set isLoaded to false initially', () => {
      const req = httpMock.expectOne('/i18n/de.json');

      expect(service.isLoaded()).toBe(false);

      req.flush(mockTranslationsDe);
    });

    it('should set isLoaded to true after successful load', () => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);

      expect(service.isLoaded()).toBe(true);
    });

    it('should set isLoaded to true even on error', () => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.error(new ProgressEvent('error'));

      expect(service.isLoaded()).toBe(true);
    });
  });

  describe('use()', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);
    });

    it('should update currentLang signal', () => {
      service.use('en');

      expect(service.currentLang()).toBe('en');

      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);
    });

    it('should set isLoaded to false before loading', () => {
      service.use('en');

      expect(service.isLoaded()).toBe(false);

      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);
    });

    it('should load new language file', () => {
      service.use('en');

      const req = httpMock.expectOne('/i18n/en.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockTranslationsEn);
    });

    it('should update translations after successful load', () => {
      service.use('en');

      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);

      expect(service.instant('MENU.home')).toBe('Home');
    });

    it('should set isLoaded to true after language switch', () => {
      service.use('en');

      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);

      expect(service.isLoaded()).toBe(true);
    });
  });

  describe('instant()', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);
    });

    it('should return translation for simple key', () => {
      const result = service.instant('FOOTER.copyright');

      expect(result).toBe('Alle Rechte vorbehalten');
    });

    it('should return translation for nested key', () => {
      const result = service.instant('MENU.home');

      expect(result).toBe('Startseite');
    });

    it('should return key if translation not found', () => {
      const result = service.instant('NONEXISTENT.key');

      expect(result).toBe('NONEXISTENT.key');
    });

    it('should return key if path is incomplete', () => {
      const result = service.instant('MENU');

      expect(result).toBe('MENU');
    });

    it('should handle deep nesting', () => {
      const deepMock = {
        LEVEL1: {
          LEVEL2: {
            LEVEL3: {
              text: 'Deep nested text',
            },
          },
        },
      };

      service.use('en');
      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(deepMock);

      const result = service.instant('LEVEL1.LEVEL2.LEVEL3.text');
      expect(result).toBe('Deep nested text');
    });
  });

  describe('Language switching', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);
    });

    it('should switch from German to English', () => {
      expect(service.instant('MENU.home')).toBe('Startseite');

      service.use('en');
      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);

      expect(service.instant('MENU.home')).toBe('Home');
    });

    it('should switch back to German', () => {
      service.use('en');
      let req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockTranslationsEn);

      service.use('de');
      req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);

      expect(service.instant('MENU.home')).toBe('Startseite');
    });

    it('should handle multiple language switches', () => {
      service.use('en');
      httpMock.expectOne('/i18n/en.json').flush(mockTranslationsEn);

      service.use('de');
      httpMock.expectOne('/i18n/de.json').flush(mockTranslationsDe);

      service.use('en');
      httpMock.expectOne('/i18n/en.json').flush(mockTranslationsEn);

      expect(service.instant('MENU.home')).toBe('Home');
    });
  });

  describe('Error handling', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);
    });

    it('should handle HTTP errors gracefully', () => {
      service.use('en');

      const req = httpMock.expectOne('/i18n/en.json');
      req.error(new ProgressEvent('Network error'));

      expect(service.isLoaded()).toBe(true);
      expect(service.currentLang()).toBe('en');
    });

    it('should keep old translations on error', () => {
      const oldTranslation = service.instant('MENU.home');

      service.use('en');
      const req = httpMock.expectOne('/i18n/en.json');
      req.error(new ProgressEvent('error'));

      expect(service.instant('MENU.home')).toBe(oldTranslation);
    });

    it('should handle 404 errors', () => {
      service.use('en');

      const req = httpMock.expectOne('/i18n/en.json');
      req.flush('Not found', { status: 404, statusText: 'Not Found' });

      expect(service.isLoaded()).toBe(true);
    });
  });

  describe('Edge cases', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/i18n/de.json');
      req.flush(mockTranslationsDe);
    });

    it('should handle empty translation key', () => {
      const result = service.instant('');

      expect(result).toBe('');
    });

    it('should handle null in translations', () => {
      const mockWithNull = {
        TEST: {
          value: null,
        },
      };

      service.use('en');
      const req = httpMock.expectOne('/i18n/en.json');
      req.flush(mockWithNull as any);

      const result = service.instant('TEST.value');
      expect(result).toBe('TEST.value');
    });

    it('should handle empty object response', () => {
      service.use('en');
      const req = httpMock.expectOne('/i18n/en.json');
      req.flush({});

      const result = service.instant('ANY.key');
      expect(result).toBe('ANY.key');
    });
  });
});
