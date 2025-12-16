import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecorativeBorderComponent } from './decorative-border.component';

describe('DecorativeBorderComponent', () => {
  let component: DecorativeBorderComponent;
  let fixture: ComponentFixture<DecorativeBorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DecorativeBorderComponent],
    });

    fixture = TestBed.createComponent(DecorativeBorderComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create with all required inputs', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('borderWidth input', () => {
    it('should accept and reflect borderWidth value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderWidth()).toBe(0.5);
    });

    it('should accept different borderWidth values', () => {
      fixture.componentRef.setInput('borderWidth', 1);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderWidth()).toBe(1);
    });

    it('should render borderWidth as rem in style', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.borderWidth).toBe('0.5rem');
    });
  });

  describe('borderRadius input', () => {
    it('should accept and reflect borderRadius value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderRadius()).toBe('50%');
    });

    it('should accept pixel values for borderRadius', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '10px');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderRadius()).toBe('10px');
    });

    it('should accept rem values for borderRadius', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '1rem');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderRadius()).toBe('1rem');
    });

    it('should render borderRadius in style', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.borderRadius).toBe('50%');
    });
  });

  describe('aspectRatio input', () => {
    it('should accept and reflect aspectRatio value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.aspectRatio()).toBe('1/1');
    });

    it('should accept different aspectRatio values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '16/9');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.aspectRatio()).toBe('16/9');
    });

    it('should render aspectRatio in style', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.aspectRatio).toContain('1');
    });
  });

  describe('borderColor input', () => {
    it('should accept and reflect borderColor value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderColor()).toBe('#00bc8f');
    });

    it('should accept different color formats', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', 'rgb(0, 188, 143)');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderColor()).toBe('rgb(0, 188, 143)');
    });

    it('should render borderColor as CSS variable', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.getPropertyValue('--border-color')).toBe('#00bc8f');
    });
  });

  describe('initialOffset input', () => {
    it('should accept and reflect initialOffset value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.initialOffset()).toEqual({ x: 0, y: 0 });
    });

    it('should accept positive offset values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 10, y: 20 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.initialOffset()).toEqual({ x: 10, y: 20 });
    });

    it('should accept negative offset values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: -5, y: -10 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.initialOffset()).toEqual({ x: -5, y: -10 });
    });

    it('should render initialOffset as CSS variables', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 5, y: 10 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.getPropertyValue('--initial-x')).toBe('5px');
      expect(element.style.getPropertyValue('--initial-y')).toBe('10px');
    });
  });

  describe('hoverOffset input', () => {
    it('should accept and reflect hoverOffset value', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.hoverOffset()).toEqual({ x: 10, y: 10 });
    });

    it('should accept different hoverOffset values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 15, y: 25 });
      fixture.detectChanges();

      expect(component.hoverOffset()).toEqual({ x: 15, y: 25 });
    });

    it('should accept zero hoverOffset', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 0, y: 0 });
      fixture.detectChanges();

      expect(component.hoverOffset()).toEqual({ x: 0, y: 0 });
    });

    it('should render hoverOffset as CSS variables', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 15, y: 20 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.getPropertyValue('--hover-x')).toBe('15px');
      expect(element.style.getPropertyValue('--hover-y')).toBe('20px');
    });
  });

  describe('DOM rendering', () => {
    it('should render decorative-border element', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element).toBeTruthy();
    });

    it('should apply all styles correctly', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 5, y: 10 });
      fixture.componentRef.setInput('hoverOffset', { x: 15, y: 20 });
      fixture.detectChanges();

      const element = fixture.nativeElement.querySelector('.decorative-border');

      expect(element.style.borderWidth).toBe('0.5rem');
      expect(element.style.borderRadius).toBe('50%');
      expect(element.style.aspectRatio).toContain('1');
      expect(element.style.getPropertyValue('--border-color')).toBe('#00bc8f');
      expect(element.style.getPropertyValue('--initial-x')).toBe('5px');
      expect(element.style.getPropertyValue('--initial-y')).toBe('10px');
      expect(element.style.getPropertyValue('--hover-x')).toBe('15px');
      expect(element.style.getPropertyValue('--hover-y')).toBe('20px');
    });
  });

  describe('Edge cases', () => {
    it('should handle zero borderWidth', () => {
      fixture.componentRef.setInput('borderWidth', 0);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderWidth()).toBe(0);
    });

    it('should handle large borderWidth values', () => {
      fixture.componentRef.setInput('borderWidth', 10);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderWidth()).toBe(10);
    });

    it('should handle complex borderRadius values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '10px 20px 30px 40px');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderRadius()).toBe('10px 20px 30px 40px');
    });

    it('should handle decimal aspectRatio', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1.5');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.aspectRatio()).toBe('1.5');
    });

    it('should handle same initialOffset and hoverOffset', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 10, y: 10 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.initialOffset()).toEqual(component.hoverOffset());
    });

    it('should handle large offset values', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 100, y: 200 });
      fixture.componentRef.setInput('hoverOffset', { x: 150, y: 250 });
      fixture.detectChanges();

      expect(component.initialOffset()).toEqual({ x: 100, y: 200 });
      expect(component.hoverOffset()).toEqual({ x: 150, y: 250 });
    });

    it('should handle named colors', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', 'red');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      expect(component.borderColor()).toBe('red');
    });

    it('should update styles when inputs change', () => {
      fixture.componentRef.setInput('borderWidth', 0.5);
      fixture.componentRef.setInput('borderRadius', '50%');
      fixture.componentRef.setInput('aspectRatio', '1/1');
      fixture.componentRef.setInput('borderColor', '#00bc8f');
      fixture.componentRef.setInput('initialOffset', { x: 0, y: 0 });
      fixture.componentRef.setInput('hoverOffset', { x: 10, y: 10 });
      fixture.detectChanges();

      let element = fixture.nativeElement.querySelector('.decorative-border');
      expect(element.style.borderWidth).toBe('0.5rem');

      fixture.componentRef.setInput('borderWidth', 1);
      fixture.detectChanges();

      element = fixture.nativeElement.querySelector('.decorative-border');
      expect(element.style.borderWidth).toBe('1rem');
    });
  });
});
