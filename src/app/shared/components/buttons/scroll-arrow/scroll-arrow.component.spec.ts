import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollArrowComponent } from './scroll-arrow.component';
import { ScrollService } from '@core/services';

describe('ScrollArrowComponent', () => {
  let component: ScrollArrowComponent;
  let fixture: ComponentFixture<ScrollArrowComponent>;
  let scrollServiceSpy: jasmine.SpyObj<ScrollService>;

  beforeEach(() => {
    scrollServiceSpy = jasmine.createSpyObj('ScrollService', ['scrollToFragment']);

    TestBed.configureTestingModule({
      imports: [ScrollArrowComponent],
      providers: [{ provide: ScrollService, useValue: scrollServiceSpy }],
    });

    fixture = TestBed.createComponent(ScrollArrowComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create with required targetFragment', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('rotate input', () => {
    it('should have default value right', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      expect(component.rotate()).toBe('right');
    });

    it('should accept left value', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('rotate', 'left');
      fixture.detectChanges();

      expect(component.rotate()).toBe('left');
    });

    it('should accept right value', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('rotate', 'right');
      fixture.detectChanges();

      expect(component.rotate()).toBe('right');
    });
  });

  describe('direction input', () => {
    it('should have default value down', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      expect(component.direction()).toBe('down');
    });

    it('should accept down value', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('direction', 'down');
      fixture.detectChanges();

      expect(component.direction()).toBe('down');
    });

    it('should accept up value', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('direction', 'up');
      fixture.detectChanges();

      expect(component.direction()).toBe('up');
    });
  });

  describe('targetFragment input', () => {
    it('should accept and reflect targetFragment value', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      expect(component.targetFragment()).toBe('about');
    });

    it('should accept different fragment values', () => {
      fixture.componentRef.setInput('targetFragment', 'contact');
      fixture.detectChanges();

      expect(component.targetFragment()).toBe('contact');
    });
  });

  describe('scrollTo()', () => {
    it('should call scrollService.scrollToFragment with targetFragment', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      component.scrollTo();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('about');
    });

    it('should call scrollService with different fragments', () => {
      fixture.componentRef.setInput('targetFragment', 'projects');
      fixture.detectChanges();

      component.scrollTo();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('projects');
    });

    it('should call scrollService multiple times', () => {
      fixture.componentRef.setInput('targetFragment', 'skills');
      fixture.detectChanges();

      component.scrollTo();
      component.scrollTo();
      component.scrollTo();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledTimes(3);
      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('skills');
    });
  });

  describe('DOM rendering', () => {
    it('should render scroll-arrow anchor element', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');

      expect(anchor).toBeTruthy();
    });

    it('should have aria-label with target fragment', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');

      expect(anchor.getAttribute('aria-label')).toBe('Scroll to about');
    });

    it('should have tabindex -1', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');

      expect(anchor.getAttribute('tabindex')).toBe('-1');
    });

    it('should apply rotate-right class by default', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');

      expect(anchor.classList.contains('scroll-arrow--rotate-right')).toBe(true);
      expect(anchor.classList.contains('scroll-arrow--rotate-left')).toBe(false);
    });

    it('should apply rotate-left class when rotate is left', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('rotate', 'left');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');

      expect(anchor.classList.contains('scroll-arrow--rotate-left')).toBe(true);
      expect(anchor.classList.contains('scroll-arrow--rotate-right')).toBe(false);
    });

    it('should render scroll-arrow icon container', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('.scroll-arrow__icon');

      expect(icon).toBeTruthy();
    });

    it('should render three circle elements', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const circles = fixture.nativeElement.querySelectorAll('.scroll-arrow__circle');

      expect(circles.length).toBe(3);
    });

    it('should render SVG element', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('.scroll-arrow__svg');

      expect(svg).toBeTruthy();
      expect(svg.tagName).toBe('svg');
    });

    it('should have aria-hidden on SVG', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      const svg = fixture.nativeElement.querySelector('.scroll-arrow__svg');

      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Click interaction', () => {
    it('should call scrollTo when anchor is clicked', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      spyOn(component, 'scrollTo');

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      anchor.click();

      expect(component.scrollTo).toHaveBeenCalled();
    });

    it('should call scrollService when anchor is clicked', () => {
      fixture.componentRef.setInput('targetFragment', 'contact');
      fixture.detectChanges();

      const anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      anchor.click();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('contact');
    });
  });

  describe('Edge cases', () => {
    it('should handle fragment with special characters', () => {
      fixture.componentRef.setInput('targetFragment', 'about-me');
      fixture.detectChanges();

      component.scrollTo();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('about-me');
    });

    it('should update aria-label when targetFragment changes', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.detectChanges();

      let anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      expect(anchor.getAttribute('aria-label')).toBe('Scroll to about');

      fixture.componentRef.setInput('targetFragment', 'projects');
      fixture.detectChanges();

      anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      expect(anchor.getAttribute('aria-label')).toBe('Scroll to projects');
    });

    it('should update rotation class when rotate changes', () => {
      fixture.componentRef.setInput('targetFragment', 'about');
      fixture.componentRef.setInput('rotate', 'right');
      fixture.detectChanges();

      let anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      expect(anchor.classList.contains('scroll-arrow--rotate-right')).toBe(true);

      fixture.componentRef.setInput('rotate', 'left');
      fixture.detectChanges();

      anchor = fixture.nativeElement.querySelector('a.scroll-arrow');
      expect(anchor.classList.contains('scroll-arrow--rotate-left')).toBe(true);
      expect(anchor.classList.contains('scroll-arrow--rotate-right')).toBe(false);
    });

    it('should handle empty string as targetFragment', () => {
      fixture.componentRef.setInput('targetFragment', '');
      fixture.detectChanges();

      component.scrollTo();

      expect(scrollServiceSpy.scrollToFragment).toHaveBeenCalledWith('');
    });
  });
});
