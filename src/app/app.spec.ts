import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SwUpdateService } from '@ui/public-api';
import { App } from './app';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let swUpdateServiceSpy: jasmine.SpyObj<SwUpdateService>;

  beforeEach(() => {
    swUpdateServiceSpy = jasmine.createSpyObj(
      'SwUpdateService',
      ['initialize', 'onAction', 'dismiss'],
      {
        notification: signal({
          show: false,
          message: '',
          actionText: '',
          type: 'success' as const,
          persist: false,
        }),
      },
    );

    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: SwUpdateService, useValue: swUpdateServiceSpy }],
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
      const notification = fixture.nativeElement.querySelector('dev2k-notification');
      expect(notification).toBeTruthy();
    });

    it('should have correct component structure', () => {
      const components = fixture.nativeElement.querySelectorAll(
        'router-outlet, app-header, app-footer, dev2k-notification',
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
  });
});
