import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NotFoundPageComponent } from './not-found-page.component';
import { ScrollService, SeoService, TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;
  let locationSpy: jasmine.SpyObj<Location>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    locationSpy = jasmine.createSpyObj('Location', ['back']);

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    translationServiceSpy.instant.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'NOT_FOUND.title': 'Page Not Found',
        'NOT_FOUND.description': 'The page you are looking for does not exist.',
        'NOT_FOUND.backToHome': 'Back to Home',
        'NOT_FOUND.maybeYouLookingFor': 'Maybe you are looking for',
        'NOT_FOUND.heroLabel': 'Home',
        'NOT_FOUND.aboutLabel': 'About',
        'NOT_FOUND.skillsLabel': 'Skills',
        'NOT_FOUND.projectsLabel': 'Projects',
        'NOT_FOUND.contactLabel': 'Contact',
      };
      return translations[key] || key;
    });

    seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['triggerPageFlash']);

    TestBed.configureTestingModule({
      imports: [NotFoundPageComponent],
      providers: [
        { provide: Location, useValue: locationSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update SEO metadata with 404 page info', () => {
      fixture.detectChanges();

      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledWith({
        title: '404 - Page Not Found - Konstantin Aksenov',
        description:
          'The page you are looking for could not be found. Return to homepage or explore other sections.',
        ogTitle: '404 - Page Not Found',
        ogUrl: 'https://portfolio.dev2k.org/404',
        robots: 'noindex, nofollow',
      });
    });

    it('should trigger page flash effect', () => {
      fixture.detectChanges();

      expect(scrollServiceSpy.triggerPageFlash).toHaveBeenCalled();
    });

    it('should call SEO service before scroll service', () => {
      const callOrder: string[] = [];

      seoServiceSpy.updateMetadata.and.callFake(() => {
        callOrder.push('seo');
      });

      scrollServiceSpy.triggerPageFlash.and.callFake(() => {
        callOrder.push('scroll');
      });

      fixture.detectChanges();

      expect(callOrder).toEqual(['seo', 'scroll']);
    });
  });

  describe('pageData computed', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return error number', () => {
      const data = component['pageData']();
      expect(data.errorNumber).toBe('404');
    });

    it('should return translated title', () => {
      const data = component['pageData']();
      expect(data.title).toBe('Page Not Found');
    });

    it('should return translated description', () => {
      const data = component['pageData']();
      expect(data.description).toBe('The page you are looking for does not exist.');
    });

    it('should return translated navigation labels', () => {
      const data = component['pageData']();
      expect(data.backToHome).toBe('Back to Home');
      expect(data.maybeYouLookingFor).toBe('Maybe you are looking for');
    });

    it('should return all section labels', () => {
      const data = component['pageData']();
      expect(data.heroLabel).toBe('Home');
      expect(data.aboutLabel).toBe('About');
      expect(data.skillsLabel).toBe('Skills');
      expect(data.projectsLabel).toBe('Projects');
      expect(data.contactLabel).toBe('Contact');
    });

    it('should call instant for all translation keys', () => {
      component['pageData']();
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('NOT_FOUND.title');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('NOT_FOUND.description');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('NOT_FOUND.backToHome');
    });
  });

  describe('goBack', () => {
    it('should call location.back()', () => {
      component.goBack();
      expect(locationSpy.back).toHaveBeenCalled();
    });

    it('should navigate to previous page', () => {
      component.goBack();
      expect(locationSpy.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM rendering', () => {
    it('should render error number', () => {
      fixture.detectChanges();
      const errorNumber = fixture.nativeElement.textContent;
      expect(errorNumber).toContain('404');
    });

    it('should render navigation button', () => {
      fixture.detectChanges();
      const navButton = fixture.nativeElement.querySelector('app-nav-button');
      expect(navButton).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should have SEO metadata set on initialization', () => {
      fixture.detectChanges();
      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledTimes(1);
    });

    it('should have page flash triggered on initialization', () => {
      fixture.detectChanges();
      expect(scrollServiceSpy.triggerPageFlash).toHaveBeenCalledTimes(1);
    });
  });
});
