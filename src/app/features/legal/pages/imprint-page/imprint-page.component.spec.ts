import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprintPageComponent } from './imprint-page.component';
import { ScrollService, SeoService, TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('ImprintPageComponent', () => {
  let component: ImprintPageComponent;
  let fixture: ComponentFixture<ImprintPageComponent>;
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
        'IMPRINT.pageTitle': 'Impressum',
        'IMPRINT.lead': 'Legal information',
        'IMPRINT.contactInfoTitle': 'Contact Information',
        'IMPRINT.responsibleForContent': 'Responsible for content',
        'IMPRINT.contactTitle': 'Contact',
        'IMPRINT.email': 'Email',
        'IMPRINT.phone': 'Phone',
        'IMPRINT.website': 'Website',
        'IMPRINT.disclaimerTitle': 'Disclaimer',
        'IMPRINT.liabilityForContentTitle': 'Liability for Content',
        'IMPRINT.liabilityForContentText': 'Content liability text',
        'IMPRINT.liabilityForLinksTitle': 'Liability for Links',
        'IMPRINT.liabilityForLinksText': 'Links liability text',
        'IMPRINT.copyrightTitle': 'Copyright',
        'IMPRINT.copyrightText': 'Copyright text',
        'IMPRINT.technicalInfoTitle': 'Technical Information',
        'IMPRINT.technicalInfoText': 'Technical info text',
        'IMPRINT.name': 'Konstantin Aksenov',
        'IMPRINT.street': 'Street',
        'IMPRINT.city': 'City',
        'IMPRINT.country': 'Country',
      };
      return translations[key] || key;
    });

    seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['triggerPageFlash']);

    TestBed.configureTestingModule({
      imports: [ImprintPageComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(ImprintPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update SEO metadata with imprint page info', () => {
      fixture.detectChanges();

      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledWith({
        title: 'Impressum - Konstantin Aksenov',
        description:
          "Legal information and contact details for Konstantin Aksenov's portfolio website.",
        ogTitle: 'Impressum - Konstantin Aksenov',
        ogUrl: 'https://portfolio.dev2k.org/imprint',
      });
    });

    it('should trigger page flash effect', () => {
      fixture.detectChanges();

      expect(scrollServiceSpy.triggerPageFlash).toHaveBeenCalled();
    });
  });

  describe('imprintData computed', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return page title and lead', () => {
      const data = component['imprintData']();
      expect(data.pageTitle).toBe('Impressum');
      expect(data.lead).toBe('Legal information');
    });

    it('should return contact information fields', () => {
      const data = component['imprintData']();
      expect(data.contactInfoTitle).toBe('Contact Information');
      expect(data.responsibleForContent).toBe('Responsible for content');
      expect(data.contactTitle).toBe('Contact');
    });

    it('should return contact details', () => {
      const data = component['imprintData']();
      expect(data.email).toBe('Email');
      expect(data.phone).toBe('Phone');
      expect(data.website).toBe('Website');
    });

    it('should return disclaimer sections', () => {
      const data = component['imprintData']();
      expect(data.disclaimerTitle).toBe('Disclaimer');
      expect(data.liabilityForContentTitle).toBe('Liability for Content');
      expect(data.liabilityForLinksTitle).toBe('Liability for Links');
    });

    it('should return copyright information', () => {
      const data = component['imprintData']();
      expect(data.copyrightTitle).toBe('Copyright');
      expect(data.copyrightText).toBe('Copyright text');
    });

    it('should return technical information', () => {
      const data = component['imprintData']();
      expect(data.technicalInfoTitle).toBe('Technical Information');
      expect(data.technicalInfoText).toBe('Technical info text');
    });

    it('should return address data', () => {
      const data = component['imprintData']();
      expect(data.name).toBe('Konstantin Aksenov');
      expect(data.street).toBe('Street');
      expect(data.city).toBe('City');
      expect(data.country).toBe('Country');
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
