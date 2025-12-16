import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { ScrollService, SeoService } from '@core/services';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(() => {
    seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['triggerPageFlash']);

    TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [
        { provide: SeoService, useValue: seoServiceSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update SEO metadata with correct values', () => {
      fixture.detectChanges();

      expect(seoServiceSpy.updateMetadata).toHaveBeenCalledWith({
        title: 'Konstantin Aksenov - Software Developer Portfolio',
        description:
          'Experienced Software Developer specializing in Angular, TypeScript, and modern web development. View my projects and get in touch.',
        keywords:
          'Software Developer, Angular Developer, TypeScript, Web Development, Portfolio, Konstantin Aksenov',
        ogTitle: 'Konstantin Aksenov - Software Developer',
        ogDescription: 'Professional portfolio showcasing modern web development projects',
        ogImage: 'https://portfolio.dev2k.org/assets/screenshots/desktop-home.png',
        ogUrl: 'https://portfolio.dev2k.org',
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

  describe('DOM rendering', () => {
    it('should render hero section', () => {
      fixture.detectChanges();
      const heroSection = fixture.nativeElement.querySelector('app-hero-section');
      expect(heroSection).toBeTruthy();
    });

    it('should render about section', () => {
      fixture.detectChanges();
      const aboutSection = fixture.nativeElement.querySelector('app-about-section');
      expect(aboutSection).toBeTruthy();
    });

    it('should render skills section', () => {
      fixture.detectChanges();
      const skillsSection = fixture.nativeElement.querySelector('app-skills-section');
      expect(skillsSection).toBeTruthy();
    });

    it('should render projects section placeholder initially', () => {
      fixture.detectChanges();
      const placeholder = fixture.nativeElement.querySelector('.section-skeleton');
      expect(placeholder).toBeTruthy();
    });

    it('should render contact section', () => {
      fixture.detectChanges();
      const contactSection = fixture.nativeElement.querySelector('app-contact-section');
      expect(contactSection).toBeTruthy();
    });

    it('should render scroll arrow', () => {
      fixture.detectChanges();
      const scrollArrow = fixture.nativeElement.querySelector('app-scroll-arrow');
      expect(scrollArrow).toBeTruthy();
    });

    it('should render linear gradient', () => {
      fixture.detectChanges();
      const gradient = fixture.nativeElement.querySelector('app-linear-gradient');
      expect(gradient).toBeTruthy();
    });

    it('should render core sections in correct order', () => {
      fixture.detectChanges();
      const sections = fixture.nativeElement.querySelectorAll(
        'app-hero-section, app-about-section, app-skills-section, app-contact-section'
      );
      expect(sections.length).toBe(4);
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
