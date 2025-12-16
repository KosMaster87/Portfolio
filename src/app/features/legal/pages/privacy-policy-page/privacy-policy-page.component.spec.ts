import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicyPageComponent } from './privacy-policy-page.component';
import { ScrollService, SeoService, TranslationService } from '@core/services';
import { signal } from '@angular/core';

describe('PrivacyPolicyPageComponent', () => {
  let component: PrivacyPolicyPageComponent;
  let fixture: ComponentFixture<PrivacyPolicyPageComponent>;
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
        'PRIVACY.pageTitle': 'Privacy Policy',
        'PRIVACY.lead': 'Data protection information',
        'PRIVACY.lastUpdated': 'Last updated',
        'PRIVACY.overviewTitle': 'Overview',
        'PRIVACY.overviewText': 'Overview text',
        'PRIVACY.dataCollectionTitle': 'Data Collection',
        'PRIVACY.autoCollectedTitle': 'Automatically Collected',
        'PRIVACY.autoCollectedLogData': 'Log Data',
        'PRIVACY.autoCollectedLogDataText': 'Log data text',
        'PRIVACY.autoCollectedUsageData': 'Usage Data',
        'PRIVACY.autoCollectedUsageDataText': 'Usage data text',
        'PRIVACY.autoCollectedDeviceInfo': 'Device Information',
        'PRIVACY.autoCollectedDeviceInfoText': 'Device info text',
        'PRIVACY.youProvideTitle': 'Data You Provide',
      };
      return translations[key] || key;
    });

    seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['triggerPageFlash']);

    TestBed.configureTestingModule({
      imports: [PrivacyPolicyPageComponent],
      providers: [
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(PrivacyPolicyPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update SEO metadata with privacy policy info', () => {
      fixture.detectChanges();

      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledWith({
        title: 'Privacy Policy - Konstantin Aksenov',
        description:
          'Privacy policy and data protection information for portfolio website. Learn how we handle your data.',
        keywords: 'privacy policy, data protection, GDPR, cookies, data security',
        ogTitle: 'Privacy Policy - Konstantin Aksenov',
        ogDescription: 'Privacy policy and data protection information',
        ogUrl: 'https://portfolio.dev2k.org/privacy-policy',
      });
    });

    it('should trigger page flash effect', () => {
      fixture.detectChanges();

      expect(scrollServiceSpy.triggerPageFlash).toHaveBeenCalled();
    });
  });

  describe('lastUpdated property', () => {
    it('should have a last updated date', () => {
      expect(component['lastUpdated']).toBeDefined();
    });

    it('should be in correct date format', () => {
      const date = component['lastUpdated'];
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should have the correct date value', () => {
      expect(component['lastUpdated']).toBe('2025-01-14');
    });
  });

  describe('privacyData computed', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should return page title and lead', () => {
      const data = component['privacyData']();
      expect(data.pageTitle).toBe('Privacy Policy');
      expect(data.lead).toBe('Data protection information');
    });

    it('should return overview section', () => {
      const data = component['privacyData']();
      expect(data.overviewTitle).toBe('Overview');
      expect(data.overviewText).toBe('Overview text');
    });

    it('should return data collection sections', () => {
      const data = component['privacyData']();
      expect(data.dataCollectionTitle).toBe('Data Collection');
      expect(data.autoCollectedTitle).toBe('Automatically Collected');
    });

    it('should return automatically collected data types', () => {
      const data = component['privacyData']();
      expect(data.autoCollectedLogData).toBe('Log Data');
      expect(data.autoCollectedUsageData).toBe('Usage Data');
      expect(data.autoCollectedDeviceInfo).toBe('Device Information');
    });

    it('should return data descriptions', () => {
      const data = component['privacyData']();
      expect(data.autoCollectedLogDataText).toBe('Log data text');
      expect(data.autoCollectedUsageDataText).toBe('Usage data text');
      expect(data.autoCollectedDeviceInfoText).toBe('Device info text');
    });

    it('should return user provided data section', () => {
      const data = component['privacyData']();
      expect(data.youProvideTitle).toBe('Data You Provide');
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
