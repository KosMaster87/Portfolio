import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutSectionComponent } from './about-section.component';
import { ScrollService, ThemeService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('AboutSectionComponent', () => {
  let component: AboutSectionComponent;
  let fixture: ComponentFixture<AboutSectionComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const activeThemeSignal = signal<'light' | 'dark' | 'auto'>('light');
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToFragment']);
    themeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
      activeTheme: activeThemeSignal,
    });
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });
    translationServiceSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      imports: [AboutSectionComponent],
      providers: [
        provideRouter([]),
        { provide: ScrollService, useValue: scrollServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(AboutSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('aboutData computed', () => {
    it('should return translated about content', () => {
      const data = component['aboutData']();
      expect(data.heading).toBe('ABOUT.heading');
      expect(data.paragraph1).toBe('ABOUT.paragraph1');
      expect(data.paragraph2).toBe('ABOUT.paragraph2');
      expect(data.ctaText).toBe('ABOUT.ctaButton');
    });

    it('should contain all required fields', () => {
      const data = component['aboutData']();
      expect(data).toEqual(
        jasmine.objectContaining({
          heading: jasmine.any(String),
          paragraph1: jasmine.any(String),
          paragraph2: jasmine.any(String),
          ctaText: jasmine.any(String),
        })
      );
    });

    it('should call instant for each translation key', () => {
      component['aboutData']();
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('ABOUT.heading');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('ABOUT.paragraph1');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('ABOUT.paragraph2');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('ABOUT.ctaButton');
    });
  });

  describe('borderColor computed', () => {
    it('should return black for light theme', () => {
      expect(component['borderColor']()).toBe('#000000');
    });

    it('should return primary color for dark theme', () => {
      TestBed.resetTestingModule();
      const darkThemeSignal = signal<'light' | 'dark' | 'auto'>('dark');
      const darkThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: darkThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [AboutSectionComponent],
        providers: [
          provideRouter([]),
          { provide: ScrollService, useValue: scrollServiceSpy },
          { provide: ThemeService, useValue: darkThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(AboutSectionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component['borderColor']()).toBe('var(--color-primary)');
    });

    it('should return black for auto theme', () => {
      TestBed.resetTestingModule();
      const autoThemeSignal = signal<'light' | 'dark' | 'auto'>('auto');
      const autoThemeServiceSpy = jasmine.createSpyObj('ThemeService', [], {
        activeTheme: autoThemeSignal,
      });

      TestBed.configureTestingModule({
        imports: [AboutSectionComponent],
        providers: [
          provideRouter([]),
          { provide: ScrollService, useValue: scrollServiceSpy },
          { provide: ThemeService, useValue: autoThemeServiceSpy },
          { provide: TranslationService, useValue: translationServiceSpy },
        ],
      });

      fixture = TestBed.createComponent(AboutSectionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component['borderColor']()).toBe('#000000');
    });
  });

  describe('scrollToSection()', () => {
    it('should call scrollService.scrollToFragment', () => {
      component.scrollToSection('contact');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('contact');
    });

    it('should handle different section ids', () => {
      component.scrollToSection('projects');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('projects');

      component.scrollToSection('skills');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('skills');
    });

    it('should handle empty string', () => {
      component.scrollToSection('');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('');
    });
  });

  describe('DOM rendering', () => {
    it('should render about section', () => {
      const section = fixture.nativeElement.querySelector('.about-section');
      expect(section).toBeTruthy();
    });

    it('should render about content', () => {
      const content = fixture.nativeElement.textContent;
      expect(content).toContain('ABOUT.');
    });

    it('should render decorative border', () => {
      const border = fixture.nativeElement.querySelector('app-decorative-border');
      expect(border).toBeTruthy();
    });

    it('should render CTA button', () => {
      const button = fixture.nativeElement.querySelector('app-cta-button');
      expect(button).toBeTruthy();
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
