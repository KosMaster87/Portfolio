import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { SwUpdateService, TranslationService } from './core/services';
import { signal } from '@angular/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let swUpdateServiceSpy: jasmine.SpyObj<SwUpdateService>;
  let translationServiceSpy: jasmine.SpyObj<TranslationService>;

  beforeEach(() => {
    const currentLangSignal = signal('en');
    const isLoadedSignal = signal(true);

    swUpdateServiceSpy = jasmine.createSpyObj(
      'SwUpdateService',
      ['initialize', 'dismissUpdate', 'activateUpdate'],
      {
        showUpdateNotification: signal(false),
        updateMessage: signal(''),
      }
    );

    translationServiceSpy = jasmine.createSpyObj('TranslationService', ['instant'], {
      currentLang: currentLangSignal,
      isLoaded: isLoadedSignal,
    });

    translationServiceSpy.instant.and.returnValue('Update Now');

    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: SwUpdateService, useValue: swUpdateServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('title signal', () => {
    it('should have default title', () => {
      expect(component['title']()).toBe('portfolio-remaster');
    });

    it('should be a signal', () => {
      expect(typeof component['title']).toBe('function');
    });
  });

  describe('constructor', () => {
    it('should initialize SwUpdateService on creation', () => {
      expect(swUpdateServiceSpy.initialize).toHaveBeenCalled();
    });

    it('should initialize SwUpdateService only once', () => {
      expect(swUpdateServiceSpy.initialize).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateActionText computed', () => {
    it('should return translated update action text', () => {
      const actionText = component['updateActionText']();
      expect(actionText).toBe('Update Now');
    });

    it('should call translation service', () => {
      component['updateActionText']();
      expect(translationServiceSpy.instant).toHaveBeenCalledWith('UPDATE.action');
    });
  });

  describe('onUpdateDismissed', () => {
    it('should call dismissUpdate on SwUpdateService', () => {
      component['onUpdateDismissed']();
      expect(swUpdateServiceSpy.dismissUpdate).toHaveBeenCalled();
    });

    it('should dismiss update only once per call', () => {
      component['onUpdateDismissed']();
      expect(swUpdateServiceSpy.dismissUpdate).toHaveBeenCalledTimes(1);
    });

    it('should allow multiple dismissals', () => {
      component['onUpdateDismissed']();
      component['onUpdateDismissed']();
      expect(swUpdateServiceSpy.dismissUpdate).toHaveBeenCalledTimes(2);
    });
  });

  describe('onUpdateAccepted', () => {
    it('should call activateUpdate on SwUpdateService', () => {
      component['onUpdateAccepted']();
      expect(swUpdateServiceSpy.activateUpdate).toHaveBeenCalled();
    });

    it('should activate update only once per call', () => {
      component['onUpdateAccepted']();
      expect(swUpdateServiceSpy.activateUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('DOM rendering', () => {
    it('should render router outlet', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });

    it('should render header component', () => {
      const header = fixture.nativeElement.querySelector('app-header');
      expect(header).toBeTruthy();
    });

    it('should render footer component', () => {
      const footer = fixture.nativeElement.querySelector('app-footer');
      expect(footer).toBeTruthy();
    });

    it('should render notification component', () => {
      const notification = fixture.nativeElement.querySelector('app-notification');
      expect(notification).toBeTruthy();
    });

    it('should have correct component structure', () => {
      const components = fixture.nativeElement.querySelectorAll(
        'router-outlet, app-header, app-footer, app-notification'
      );
      expect(components.length).toBe(4);
    });
  });

  describe('Integration', () => {
    it('should initialize without errors', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should have SwUpdateService injected', () => {
      expect(component['swUpdateService']).toBeDefined();
    });

    it('should handle update workflow', () => {
      component['onUpdateAccepted']();
      expect(swUpdateServiceSpy.activateUpdate).toHaveBeenCalled();
    });

    it('should handle dismiss workflow', () => {
      component['onUpdateDismissed']();
      expect(swUpdateServiceSpy.dismissUpdate).toHaveBeenCalled();
    });
  });

  describe('Service interactions', () => {
    it('should use TranslationService for update action text', () => {
      const text = component['updateActionText']();
      expect(translationServiceSpy.instant).toHaveBeenCalled();
      expect(text).toBeTruthy();
    });

    it('should use SwUpdateService for updates', () => {
      component['onUpdateAccepted']();
      expect(swUpdateServiceSpy.activateUpdate).toHaveBeenCalled();
    });
  });
});
