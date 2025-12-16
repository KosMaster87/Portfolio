import { TestBed } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { NavigationService } from './navigation.service';
import { ScrollService } from './scroll.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;
  let routerEventsSubject: Subject<any>;

  beforeEach(() => {
    routerEventsSubject = new Subject();
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
      events: routerEventsSubject.asObservable(),
      url: '/',
    });
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToFragment', 'scrollToTop']);
    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        { provide: Router, useValue: routerSpy },
        { provide: ScrollService, useValue: scrollServiceSpy },
      ],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('menuItems', () => {
    it('should have 4 menu items', () => {
      expect(service.menuItems.length).toBe(4);
    });
  });

  describe('isOnHomePage', () => {
    it('should return true when on root path', () => {
      expect(service.isOnHomePage()).toBe(true);
    });

    it('should update when navigation occurs', () => {
      routerEventsSubject.next(new NavigationEnd(1, '/imprint', '/imprint'));
      expect(service.isOnHomePage()).toBe(false);
    });
  });

  describe('navigateToHome()', () => {
    it('should navigate to root route', () => {
      service.navigateToHome();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('navigateToSection()', () => {
    it('should navigate to default route', () => {
      service.navigateToSection('contact');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('scrollToSection()', () => {
    it('should scroll without navigation', () => {
      service.scrollToSection('projects');
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('projects');
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('navigateToRoute()', () => {
    it('should navigate to string route', () => {
      service.navigateToRoute('/imprint');
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/imprint']);
    });
  });
});
