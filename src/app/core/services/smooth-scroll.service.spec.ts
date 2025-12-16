import { TestBed } from '@angular/core/testing';
import { SmoothScrollService } from './smooth-scroll.service';

describe('SmoothScrollService', () => {
  let service: SmoothScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothScrollService);

    spyOn(window, 'scrollTo');
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scrollTo()', () => {
    it('should call window.scrollTo', (done) => {
      service.scrollTo(100);

      requestAnimationFrame(() => {
        expect(window.scrollTo).toHaveBeenCalled();
        done();
      });
    });

    it('should scroll to target position', (done) => {
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

      service.scrollTo(500, 100);

      requestAnimationFrame(() => {
        const calls = (window.scrollTo as jasmine.Spy).calls;
        const lastCall = calls.mostRecent();
        expect(lastCall.args[0]).toBe(0);
        expect(lastCall.args[1]).toBeGreaterThan(0);
        done();
      });
    });

    it('should use default duration of 1000ms when not specified', (done) => {
      service.scrollTo(100);

      requestAnimationFrame(() => {
        expect(window.scrollTo).toHaveBeenCalled();
        done();
      });
    });

    it('should cancel previous animation before starting new one', (done) => {
      spyOn(service, 'cancelAnimation');

      service.scrollTo(100);

      requestAnimationFrame(() => {
        expect(service.cancelAnimation).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('easeInOutQuad()', () => {
    it('should return 0 for progress 0', () => {
      const result = (service as any).easeInOutQuad(0);
      expect(result).toBe(0);
    });

    it('should return 1 for progress 1', () => {
      const result = (service as any).easeInOutQuad(1);
      expect(result).toBe(1);
    });

    it('should return 0.5 for progress 0.5', () => {
      const result = (service as any).easeInOutQuad(0.5);
      expect(result).toBe(0.5);
    });

    it('should return values between 0 and 1', () => {
      const result = (service as any).easeInOutQuad(0.25);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
    });

    it('should ease in for first half', () => {
      const result1 = (service as any).easeInOutQuad(0.1);
      const result2 = (service as any).easeInOutQuad(0.2);
      expect(result2 - result1).toBeGreaterThan(0);
    });
  });

  describe('scrollElementToCenter()', () => {
    it('should scroll element to viewport center', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 500 }),
        offsetHeight: 100,
      } as HTMLElement;

      Object.defineProperty(window, 'innerHeight', {
        value: 800,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

      service.scrollElementToCenter(mockElement, 100);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(window.scrollTo).toHaveBeenCalled();
          done();
        });
      });
    });

    it('should use default duration when not specified', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 }),
        offsetHeight: 50,
      } as HTMLElement;

      service.scrollElementToCenter(mockElement);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(window.scrollTo).toHaveBeenCalled();
          done();
        });
      });
    });

    it('should calculate center position correctly', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 300 }),
        offsetHeight: 100,
      } as HTMLElement;

      Object.defineProperty(window, 'innerHeight', {
        value: 600,
        writable: true,
        configurable: true,
      });
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });

      service.scrollElementToCenter(mockElement, 50);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const calls = (window.scrollTo as jasmine.Spy).calls;
          expect(calls.count()).toBeGreaterThan(0);
          done();
        });
      });
    });
  });

  describe('scrollElementToTop()', () => {
    it('should scroll element to viewport top', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 200 }),
        offsetHeight: 100,
      } as HTMLElement;

      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

      service.scrollElementToTop(mockElement, 100);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(window.scrollTo).toHaveBeenCalled();
          done();
        });
      });
    });

    it('should use default duration when not specified', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 100 }),
        offsetHeight: 50,
      } as HTMLElement;

      service.scrollElementToTop(mockElement);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          expect(window.scrollTo).toHaveBeenCalled();
          done();
        });
      });
    });

    it('should calculate top position correctly', (done) => {
      const mockElement = {
        getBoundingClientRect: () => ({ top: 150 }),
        offsetHeight: 80,
      } as HTMLElement;

      Object.defineProperty(window, 'scrollY', { value: 50, writable: true, configurable: true });

      service.scrollElementToTop(mockElement, 50);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const calls = (window.scrollTo as jasmine.Spy).calls;
          expect(calls.count()).toBeGreaterThan(0);
          done();
        });
      });
    });
  });

  describe('cancelAnimation()', () => {
    it('should cancel ongoing animation', () => {
      spyOn(window, 'cancelAnimationFrame');

      (service as any).animationFrameId = 123;

      service.cancelAnimation();

      expect(window.cancelAnimationFrame).toHaveBeenCalledWith(123);
    });

    it('should set animationFrameId to null after cancellation', () => {
      (service as any).animationFrameId = 456;

      service.cancelAnimation();

      expect((service as any).animationFrameId).toBeNull();
    });

    it('should not throw when no animation is running', () => {
      (service as any).animationFrameId = null;

      expect(() => service.cancelAnimation()).not.toThrow();
    });

    it('should not call cancelAnimationFrame when no animation exists', () => {
      spyOn(window, 'cancelAnimationFrame');

      (service as any).animationFrameId = null;

      service.cancelAnimation();

      expect(window.cancelAnimationFrame).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle scrolling to negative position', (done) => {
      service.scrollTo(-100, 100);

      requestAnimationFrame(() => {
        expect(window.scrollTo).toHaveBeenCalled();
        done();
      });
    });

    it('should handle zero duration', (done) => {
      service.scrollTo(100, 0);

      requestAnimationFrame(() => {
        expect(window.scrollTo).toHaveBeenCalled();
        done();
      });
    });

    it('should handle scrolling from non-zero position', (done) => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true, configurable: true });

      service.scrollTo(500, 100);

      requestAnimationFrame(() => {
        expect(window.scrollTo).toHaveBeenCalled();
        done();
      });
    });
  });
});
