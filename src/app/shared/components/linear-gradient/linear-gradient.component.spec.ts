import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinearGradientComponent } from './linear-gradient.component';

describe('LinearGradientComponent', () => {
  let component: LinearGradientComponent;
  let fixture: ComponentFixture<LinearGradientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LinearGradientComponent],
    });

    fixture = TestBed.createComponent(LinearGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM rendering', () => {
    it('should render linear-gradient element', () => {
      const element = fixture.nativeElement.querySelector('.linear-gradient');

      expect(element).toBeTruthy();
    });

    it('should render as a div element', () => {
      const element = fixture.nativeElement.querySelector('.linear-gradient');

      expect(element.tagName).toBe('DIV');
    });

    it('should have linear-gradient class', () => {
      const element = fixture.nativeElement.querySelector('.linear-gradient');

      expect(element.classList.contains('linear-gradient')).toBe(true);
    });

    it('should render only one linear-gradient element', () => {
      const elements = fixture.nativeElement.querySelectorAll('.linear-gradient');

      expect(elements.length).toBe(1);
    });

    it('should be empty element with no children', () => {
      const element = fixture.nativeElement.querySelector('.linear-gradient');

      expect(element.children.length).toBe(0);
    });

    it('should be empty element with no text content', () => {
      const element = fixture.nativeElement.querySelector('.linear-gradient');

      expect(element.textContent.trim()).toBe('');
    });
  });

  describe('Component structure', () => {
    it('should be a simple presentational component', () => {
      expect(component).toBeDefined();
      expect(typeof component).toBe('object');
    });
  });
});
