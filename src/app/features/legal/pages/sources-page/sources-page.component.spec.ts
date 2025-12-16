import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourcesPageComponent } from './sources-page.component';
import { ScrollService, SeoService, TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('SourcesPageComponent', () => {
  let component: SourcesPageComponent;
  let fixture: ComponentFixture<SourcesPageComponent>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    translationServiceSpy.instant.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'SOURCES.pageTitle': 'Sources & Attributions',
        'SOURCES.lead': 'Credits and attributions',
        'SOURCES.iconsTitle': 'Icons',
        'SOURCES.iconsText': 'Icons information',
        'SOURCES.flaticon': 'Flaticon',
        'SOURCES.svgRepo': 'SVG Repo',
        'SOURCES.iconPacks': 'Icon Packs',
        'SOURCES.licenseTitle': 'License Information',
        'SOURCES.licenseText': 'License text',
      };
      return translations[key] || key;
    });

    seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['triggerPageFlash']);

    TestBed.configureTestingModule({
      imports: [SourcesPageComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(SourcesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update SEO metadata with sources page info', () => {
      fixture.detectChanges();

      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledWith({
        title: 'Sources & Attributions - Konstantin Aksenov',
        description:
          'Attribution and credits for icons, graphics, and resources used in this portfolio website.',
        keywords: 'sources, attributions, credits, icons, graphics, licenses',
        ogTitle: 'Sources & Attributions',
        ogDescription: 'Credits for visual resources used on this website',
        ogUrl: 'https://portfolio.dev2k.org/sources',
      });
    });

    it('should trigger page flash effect', () => {
      fixture.detectChanges();

      expect(scrollServiceSpy.triggerPageFlash).toHaveBeenCalled();
    });
  });

  describe('sourcesData computed', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return page title and lead', () => {
      const data = component['sourcesData']();
      expect(data.pageTitle).toBe('Sources & Attributions');
      expect(data.lead).toBe('Credits and attributions');
    });

    it('should return icons information', () => {
      const data = component['sourcesData']();
      expect(data.iconsTitle).toBe('Icons');
      expect(data.iconsText).toBe('Icons information');
    });

    it('should return icon sources', () => {
      const data = component['sourcesData']();
      expect(data.flaticon).toBe('Flaticon');
      expect(data.svgRepo).toBe('SVG Repo');
      expect(data.iconPacks).toBe('Icon Packs');
    });

    it('should return license information', () => {
      const data = component['sourcesData']();
      expect(data.licenseTitle).toBe('License Information');
      expect(data.licenseText).toBe('License text');
    });
  });

  describe('handleSpaceKey', () => {
    it('should trigger click on target element', () => {
      const mockElement = document.createElement('a');
      const clickSpy = spyOn(mockElement, 'click');
      const mockEvent = { target: mockElement } as unknown as Event;

      component['handleSpaceKey'](mockEvent);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should handle keyboard event properly', () => {
      const mockElement = document.createElement('button');
      spyOn(mockElement, 'click');
      const mockEvent = new KeyboardEvent('keypress', { key: ' ' });
      Object.defineProperty(mockEvent, 'target', { value: mockElement, writable: false });

      component['handleSpaceKey'](mockEvent);

      expect(mockElement.click).toHaveBeenCalled();
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
