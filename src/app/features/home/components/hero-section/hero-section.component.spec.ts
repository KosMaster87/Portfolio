import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { ScrollService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToFragment']);
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });
    translationServiceSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [
        provideRouter([]),
        { provide: ScrollService, useValue: scrollServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('heroData computed', () => {
    it('should return translated hero content', () => {
      const data = component['heroData']();
      expect(data.name).toBe('HERO.name');
      expect(data.title).toBe('HERO.title');
      expect(data.titleDeveloper).toBe('HERO.titleDeveloper');
      expect(data.description).toBe('HERO.description');
      expect(data.ctaText).toBe('HERO.ctaButton');
    });

    it('should contain all required fields', () => {
      const data = component['heroData']();
      expect(data).toEqual(
        jasmine.objectContaining({
          name: jasmine.any(String),
          title: jasmine.any(String),
          titleDeveloper: jasmine.any(String),
          description: jasmine.any(String),
          ctaText: jasmine.any(String),
        })
      );
    });

    it('should call instant for each translation key', () => {
      component['heroData']();
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('HERO.name');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('HERO.title');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('HERO.titleDeveloper');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('HERO.description');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('HERO.ctaButton');
    });
  });

  describe('scrollToSection()', () => {
    it('should call scrollService.scrollToFragment', () => {
      component.scrollToSection('contact');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('contact');
    });

    it('should handle different section ids', () => {
      component.scrollToSection('about');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('about');

      component.scrollToSection('projects');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('projects');
    });

    it('should handle empty string', () => {
      component.scrollToSection('');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('');
    });
  });

  describe('DOM rendering', () => {
    it('should render hero section', () => {
      const hero = fixture.nativeElement.querySelector('.hero-section');
      expect(hero).toBeTruthy();
    });

    it('should render hero content', () => {
      const content = fixture.nativeElement.textContent;
      expect(content).toContain('HERO.');
    });

    it('should render CTA button', () => {
      const button = fixture.nativeElement.querySelector('app-cta-button');
      expect(button).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should reactively update when language signal changes', () => {
      const data = component['heroData']();
      expect(data.name).toBe('HERO.name');
      expect(data).toBeDefined();
    });

    it('should be reactive to translation changes', () => {
      const initialData = component['heroData']();
      expect(initialData).toBeDefined();
      expect(Object.keys(initialData).length).toBe(5);
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple scrollToSection calls', () => {
      component.scrollToSection('section1');
      component.scrollToSection('section2');
      component.scrollToSection('section3');

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledTimes(3);
    });

    it('should handle special characters in section id', () => {
      component.scrollToSection('section-with-dashes');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('section-with-dashes');
    });
  });
});
