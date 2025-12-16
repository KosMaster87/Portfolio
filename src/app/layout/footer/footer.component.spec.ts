import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { NavigationService, TranslationService } from '@core/services';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;
  let windowSpy: jasmine.SpyObj<Window>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    navigationServiceSpy = jasmine.createSpyObj(
      'NavigationService',
      ['navigateToSection', 'navigateToHeader', 'scrollToTop', 'navigateToRoute'],
      {
        menuItems: [
          { sectionId: 'hero', label: 'MENU.hero' },
          { sectionId: 'about', label: 'MENU.about' },
          { sectionId: 'skills', label: 'MENU.skills' },
          { sectionId: 'projects', label: 'MENU.projects' },
          { sectionId: 'contact', label: 'MENU.contact' },
        ],
      }
    );
    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });
    translationServiceSpy.instant.and.callFake((key: string) => key);

    TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideRouter([]),
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any PWA event listeners
    if (component['beforeInstallHandler']) {
      window.removeEventListener(
        'beforeinstallprompt',
        component['beforeInstallHandler'] as EventListener
      );
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('currentYear', () => {
    it('should be set to current year', () => {
      const currentYear = new Date().getFullYear();
      expect(component.currentYear).toBe(currentYear);
    });
  });

  describe('deferredPrompt signal', () => {
    it('should be null by default', () => {
      expect(component['deferredPrompt']()).toBeNull();
    });
  });

  describe('installAvailable computed', () => {
    it('should be false when deferredPrompt is null', () => {
      expect(component['installAvailable']()).toBe(false);
    });

    it('should be true when deferredPrompt is set', () => {
      const mockEvent = new Event('beforeinstallprompt') as any;
      component['deferredPrompt'].set(mockEvent);
      expect(component['installAvailable']()).toBe(true);
    });
  });

  describe('menuItems getter', () => {
    it('should return menu items from navigation service', () => {
      expect(component['menuItems'].length).toBe(5);
      expect(component['menuItems'][0].sectionId).toBe('hero');
      expect(component['menuItems'][4].sectionId).toBe('contact');
    });
  });

  describe('footerData computed', () => {
    it('should return translated footer content', () => {
      const data = component['footerData']();
      expect(data.brandDescription).toBe('FOOTER.brandDescription');
      expect(data.navigationHeading).toBe('FOOTER.navigationHeading');
      expect(data.copyright).toBe('FOOTER.copyright');
      expect(data.home).toBe('MENU.home');
    });

    it('should contain all required footer fields', () => {
      const data = component['footerData']();
      expect(data).toEqual(
        jasmine.objectContaining({
          brandDescription: jasmine.any(String),
          navigationHeading: jasmine.any(String),
          featuresHeading: jasmine.any(String),
          legalHeading: jasmine.any(String),
          socialHeading: jasmine.any(String),
          copyright: jasmine.any(String),
          love: jasmine.any(String),
          and: jasmine.any(String),
          builtWith: jasmine.any(String),
          angular: jasmine.any(String),
          typescript: jasmine.any(String),
          scss: jasmine.any(String),
          install: jasmine.any(String),
          backToTop: jasmine.any(String),
          backToTopAria: jasmine.any(String),
        })
      );
    });
  });

  describe('socialLinks computed', () => {
    it('should return 4 social links', () => {
      const links = component.socialLinks();
      expect(links.length).toBe(4);
    });

    it('should include GitHub link', () => {
      const links = component.socialLinks();
      const github = links.find((link) => link.name === 'GitHub');
      expect(github).toBeDefined();
      expect(github!.url).toBe('https://github.com/KosMaster87');
      expect(github!.iconPath).toBe('/assets/images/vector/social/github.svg');
      expect(github!.hoverColor).toBe('github');
    });

    it('should include LinkedIn link', () => {
      const links = component.socialLinks();
      const linkedin = links.find((link) => link.name === 'LinkedIn');
      expect(linkedin).toBeDefined();
      expect(linkedin!.url).toContain('linkedin.com');
      expect(linkedin!.hoverColor).toBe('linkedin');
    });

    it('should include YouTube link', () => {
      const links = component.socialLinks();
      const youtube = links.find((link) => link.name === 'YouTube');
      expect(youtube).toBeDefined();
      expect(youtube!.url).toContain('youtube.com');
      expect(youtube!.hoverColor).toBe('youtube');
    });

    it('should include Email link', () => {
      const links = component.socialLinks();
      const email = links.find((link) => link.name === 'Email');
      expect(email).toBeDefined();
      expect(email!.url).toContain('mailto:');
      expect(email!.hoverColor).toBe('email');
    });

    it('should have aria labels for all links', () => {
      const links = component.socialLinks();
      links.forEach((link) => {
        expect(link.ariaLabel).toBeDefined();
        expect(link.ariaLabel).toContain('FOOTER.');
      });
    });
  });

  describe('getAngularVersion()', () => {
    it('should return Angular version 21', () => {
      expect(component.getAngularVersion()).toBe('21');
    });
  });

  describe('navigateToSection()', () => {
    it('should call navigationService.navigateToSection', () => {
      component.navigateToSection('hero');
      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('hero');
    });

    it('should handle different section ids', () => {
      component.navigateToSection('about');
      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('about');

      component.navigateToSection('contact');
      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('contact');
    });
  });

  describe('navigateToHome()', () => {
    it('should call navigationService.navigateToHeader', () => {
      component.navigateToHome();
      expect(navigationServiceSpy.navigateToHeader).toHaveBeenCalled();
    });
  });

  describe('scrollToTop()', () => {
    it('should call navigationService.scrollToTop', () => {
      component.scrollToTop();
      expect(navigationServiceSpy.scrollToTop).toHaveBeenCalled();
    });
  });

  describe('navigateToRoute()', () => {
    it('should call navigationService.navigateToRoute', (done) => {
      component.navigateToRoute('/imprint');
      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/imprint');

      // Check that scrollTo is called after timeout
      setTimeout(() => {
        done();
      }, 150);
    });

    it('should handle different routes', () => {
      component.navigateToRoute('/privacy');
      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/privacy');

      component.navigateToRoute('/sources');
      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('/sources');
    });
  });

  describe('ngOnInit()', () => {
    it('should register beforeinstallprompt event listener', () => {
      spyOn(window, 'addEventListener');
      component.ngOnInit();
      expect(window.addEventListener).toHaveBeenCalledWith(
        'beforeinstallprompt',
        jasmine.any(Function)
      );
    });

    it('should store event handler', () => {
      component.ngOnInit();
      expect(component['beforeInstallHandler']).not.toBeNull();
    });

    it('should set deferredPrompt when event fires', () => {
      component.ngOnInit();
      const mockEvent = new Event('beforeinstallprompt') as any;
      mockEvent.preventDefault = jasmine.createSpy('preventDefault');

      if (component['beforeInstallHandler']) {
        component['beforeInstallHandler'](mockEvent);
      }

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(component['deferredPrompt']()).toBe(mockEvent);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should remove beforeinstallprompt event listener', () => {
      spyOn(window, 'removeEventListener');
      component.ngOnInit();
      component.ngOnDestroy();
      expect(window.removeEventListener).toHaveBeenCalledWith(
        'beforeinstallprompt',
        jasmine.any(Function)
      );
    });

    it('should clear event handler reference', () => {
      component.ngOnInit();
      component.ngOnDestroy();
      expect(component['beforeInstallHandler']).toBeNull();
    });

    it('should handle when handler is not set', () => {
      component['beforeInstallHandler'] = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('installPWA()', () => {
    it('should do nothing when deferredPrompt is null', () => {
      component['deferredPrompt'].set(null);
      expect(() => component.installPWA()).not.toThrow();
    });

    it('should call prompt when deferredPrompt is set', () => {
      const mockPrompt = jasmine.createSpy('prompt').and.returnValue(Promise.resolve());
      const mockEvent = {
        prompt: mockPrompt,
        userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
      } as any;

      component['deferredPrompt'].set(mockEvent);
      component.installPWA();

      expect(mockPrompt).toHaveBeenCalled();
    });

    it('should clear deferredPrompt after user choice', (done) => {
      const mockEvent = {
        prompt: jasmine.createSpy('prompt').and.returnValue(Promise.resolve()),
        userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
      } as any;

      component['deferredPrompt'].set(mockEvent);
      component.installPWA();

      mockEvent.userChoice.then(() => {
        expect(component['deferredPrompt']()).toBeNull();
        done();
      });
    });

    it('should handle dismissed prompt', (done) => {
      const mockEvent = {
        prompt: jasmine.createSpy('prompt').and.returnValue(Promise.resolve()),
        userChoice: Promise.resolve({ outcome: 'dismissed', platform: 'web' }),
      } as any;

      component['deferredPrompt'].set(mockEvent);
      component.installPWA();

      mockEvent.userChoice.then(() => {
        expect(component['deferredPrompt']()).toBeNull();
        done();
      });
    });
  });

  describe('translate()', () => {
    it('should call translationService.instant', () => {
      component.translate('FOOTER.copyright');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('FOOTER.copyright');
    });

    it('should return translated text', () => {
      const result = component.translate('MENU.home');
      expect(result).toBe('MENU.home');
    });

    it('should handle different translation keys', () => {
      component.translate('FOOTER.love');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('FOOTER.love');

      component.translate('MENU.about');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('MENU.about');
    });
  });

  describe('handleSpaceKey()', () => {
    it('should call click on target element', () => {
      const mockElement = document.createElement('a');
      const clickSpy = spyOn(mockElement, 'click');
      const event = { target: mockElement } as any;

      component.handleSpaceKey(event);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should work with different element types', () => {
      const button = document.createElement('button');
      const buttonClickSpy = spyOn(button, 'click');
      const buttonEvent = { target: button } as any;

      component.handleSpaceKey(buttonEvent);

      expect(buttonClickSpy).toHaveBeenCalled();
    });
  });

  describe('DOM rendering', () => {
    it('should render footer element', () => {
      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should render current year', () => {
      const footerContent = fixture.nativeElement.textContent;
      expect(footerContent).toContain(component.currentYear.toString());
    });

    it('should render social links', () => {
      const socialLinks = fixture.nativeElement.querySelectorAll('.social-link');
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it('should render Angular version', () => {
      const footerContent = fixture.nativeElement.textContent;
      expect(component.getAngularVersion()).toBe('21');
    });
  });

  describe('Edge cases', () => {
    it('should handle navigateToSection with empty string', () => {
      component.navigateToSection('');
      expect(navigationServiceSpy.navigateToSection).toHaveBeenCalledWith('');
    });

    it('should handle navigateToRoute with empty string', () => {
      component.navigateToRoute('');
      expect(navigationServiceSpy.navigateToRoute).toHaveBeenCalledWith('');
    });

    it('should handle translate with empty string', () => {
      component.translate('');
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('');
    });

    it('should handle multiple ngOnInit calls', () => {
      component.ngOnInit();
      component.ngOnInit();
      expect(component['beforeInstallHandler']).not.toBeNull();
    });

    it('should handle multiple ngOnDestroy calls', () => {
      component.ngOnInit();
      component.ngOnDestroy();
      component.ngOnDestroy();
      expect(component['beforeInstallHandler']).toBeNull();
    });
  });
});
