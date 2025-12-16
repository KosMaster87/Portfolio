import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';
import { SmoothScrollService } from './smooth-scroll.service';

describe('ScrollService', () => {
  let service: ScrollService;
  let smoothScrollServiceSpy: jasmine.SpyObj<SmoothScrollService>;
  let mockElement: jasmine.SpyObj<HTMLElement>;
  let mockBody: any;
  let mockStyle: jasmine.SpyObj<CSSStyleDeclaration>;
  let mockClassList: jasmine.SpyObj<DOMTokenList>;
  let originalBody: HTMLElement;

  beforeEach(() => {
    originalBody = document.body;

    smoothScrollServiceSpy = jasmine.createSpyObj('SmoothScrollService', ['scrollElementToTop']);

    mockElement = jasmine.createSpyObj('HTMLElement', ['focus', 'getBoundingClientRect']);
    mockElement.getBoundingClientRect.and.returnValue({ top: 1000 } as DOMRect);

    mockStyle = jasmine.createSpyObj('CSSStyleDeclaration', ['setProperty']);
    mockClassList = jasmine.createSpyObj('DOMTokenList', ['add', 'remove']);

    mockBody = {
      focus: jasmine.createSpy('focus'),
      getBoundingClientRect: jasmine
        .createSpy('getBoundingClientRect')
        .and.returnValue({ top: 0 } as DOMRect),
      style: mockStyle,
      classList: mockClassList,
    };

    Object.defineProperty(document, 'body', {
      value: mockBody,
      writable: true,
      configurable: true,
    });

    spyOn(document, 'getElementById').and.returnValue(mockElement);

    TestBed.configureTestingModule({
      providers: [
        ScrollService,
        { provide: SmoothScrollService, useValue: smoothScrollServiceSpy },
      ],
    });

    service = TestBed.inject(ScrollService);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();

    Object.defineProperty(document, 'body', {
      value: originalBody,
      writable: true,
      configurable: true,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('scrollToFragment()', () => {
    it('should get element by ID', () => {
      service.scrollToFragment('test-section');

      expect(document.getElementById).toHaveBeenCalledWith('test-section');
    });

    it('should call smoothScrollService with element and duration', () => {
      service.scrollToFragment('test-section');

      expect(smoothScrollServiceSpy.scrollElementToTop).toHaveBeenCalledWith(
        mockElement,
        jasmine.any(Number)
      );
    });

    it('should calculate scroll duration between 800ms and 2000ms', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 500 } as DOMRect);

      service.scrollToFragment('test-section');

      const duration = (smoothScrollServiceSpy.scrollElementToTop as jasmine.Spy).calls.mostRecent()
        .args[1];
      expect(duration).toBeGreaterThanOrEqual(800);
      expect(duration).toBeLessThanOrEqual(2000);
    });

    it('should focus element after scroll duration', () => {
      service.scrollToFragment('test-section');

      expect(mockElement.focus).not.toHaveBeenCalled();

      jasmine.clock().tick(1000);

      expect(mockElement.focus).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should not scroll when element does not exist', () => {
      (document.getElementById as jasmine.Spy).and.returnValue(null);

      service.scrollToFragment('non-existent');

      expect(smoothScrollServiceSpy.scrollElementToTop).not.toHaveBeenCalled();
    });
  });

  describe('scrollToTop()', () => {
    it('should scroll to document body', () => {
      service.scrollToTop();

      expect(smoothScrollServiceSpy.scrollElementToTop).toHaveBeenCalledWith(
        mockBody,
        jasmine.any(Number)
      );
    });

    it('should use minimum duration of 800ms for top scroll', () => {
      service.scrollToTop();

      const duration = (smoothScrollServiceSpy.scrollElementToTop as jasmine.Spy).calls.mostRecent()
        .args[1];
      expect(duration).toBeGreaterThanOrEqual(800);
    });
  });

  describe('triggerPageFlash()', () => {
    it('should trigger flash animation after 800ms delay', () => {
      service.triggerPageFlash();

      expect(mockClassList.add).not.toHaveBeenCalled();

      jasmine.clock().tick(800);

      expect(mockStyle.setProperty).toHaveBeenCalled();
      expect(mockClassList.add).toHaveBeenCalledWith('viewport-flash');
    });

    it('should set CSS custom property with duration', () => {
      service.triggerPageFlash();
      jasmine.clock().tick(800);

      const duration = 720;
      expect(mockStyle.setProperty).toHaveBeenCalledWith('--flash-duration', `${duration}ms`);
    });

    it('should remove viewport-flash class after animation duration', () => {
      service.triggerPageFlash();
      jasmine.clock().tick(800);

      expect(mockClassList.remove).not.toHaveBeenCalled();

      jasmine.clock().tick(720);

      expect(mockClassList.remove).toHaveBeenCalledWith('viewport-flash');
    });

    it('should calculate animation duration as 90% of page load duration', () => {
      service.triggerPageFlash();
      jasmine.clock().tick(800);

      const expectedDuration = Math.min(800 * 0.9, 1800);
      expect(mockStyle.setProperty).toHaveBeenCalledWith(
        '--flash-duration',
        `${expectedDuration}ms`
      );
    });
  });

  describe('Duration calculations', () => {
    it('should use minimum duration of 800ms for short distances', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 100 } as DOMRect);

      service.scrollToFragment('close-element');

      const duration = (smoothScrollServiceSpy.scrollElementToTop as jasmine.Spy).calls.mostRecent()
        .args[1];
      expect(duration).toBe(800);
    });

    it('should use maximum duration of 2000ms for long distances', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 5000 } as DOMRect);

      service.scrollToFragment('far-element');

      const duration = (smoothScrollServiceSpy.scrollElementToTop as jasmine.Spy).calls.mostRecent()
        .args[1];
      expect(duration).toBe(2000);
    });

    it('should calculate duration based on distance for medium ranges', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 1200 } as DOMRect);

      service.scrollToFragment('medium-element');

      const duration = (smoothScrollServiceSpy.scrollElementToTop as jasmine.Spy).calls.mostRecent()
        .args[1];
      expect(duration).toBe(1200);
    });
  });

  describe('Flash animation after scroll', () => {
    it('should trigger flash animation after scrolling to element', () => {
      service.scrollToFragment('test-section');
      jasmine.clock().tick(1000);

      expect(mockClassList.add).toHaveBeenCalledWith('viewport-flash');
    });

    it('should calculate flash duration as 90% of scroll duration', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 1000 } as DOMRect);

      service.scrollToFragment('test-section');
      jasmine.clock().tick(1000);

      const expectedDuration = Math.min(1000 * 0.9, 1800);
      expect(mockStyle.setProperty).toHaveBeenCalledWith(
        '--flash-duration',
        `${expectedDuration}ms`
      );
    });

    it('should not exceed maximum flash duration of 1800ms', () => {
      mockElement.getBoundingClientRect.and.returnValue({ top: 5000 } as DOMRect);

      service.scrollToFragment('test-section');
      jasmine.clock().tick(2000);

      expect(mockStyle.setProperty).toHaveBeenCalledWith('--flash-duration', '1800ms');
    });
  });
});
