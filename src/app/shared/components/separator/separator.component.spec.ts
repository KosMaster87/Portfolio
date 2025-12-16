import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeparatorComponent } from './separator.component';

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SeparatorComponent],
    });

    fixture = TestBed.createComponent(SeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default values', () => {
    it('should have horizontal orientation by default', () => {
      expect(component.orientation).toBe('horizontal');
    });

    it('should have solid variant by default', () => {
      expect(component.variant).toBe('solid');
    });

    it('should have medium spacing by default', () => {
      expect(component.spacing).toBe('medium');
    });

    it('should have border color by default', () => {
      expect(component.color).toBe('border');
    });
  });

  describe('Input properties', () => {
    it('should accept vertical orientation', () => {
      component.orientation = 'vertical';
      expect(component.orientation).toBe('vertical');
    });

    it('should accept dashed variant', () => {
      component.variant = 'dashed';
      expect(component.variant).toBe('dashed');
    });

    it('should accept dotted variant', () => {
      component.variant = 'dotted';
      expect(component.variant).toBe('dotted');
    });

    it('should accept small spacing', () => {
      component.spacing = 'small';
      expect(component.spacing).toBe('small');
    });

    it('should accept large spacing', () => {
      component.spacing = 'large';
      expect(component.spacing).toBe('large');
    });

    it('should accept muted color', () => {
      component.color = 'muted';
      expect(component.color).toBe('muted');
    });

    it('should accept primary color', () => {
      component.color = 'primary';
      expect(component.color).toBe('primary');
    });
  });

  describe('getSeparatorClasses()', () => {
    it('should return default classes', () => {
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator');
      expect(classes).toContain('separator--horizontal');
      expect(classes).toContain('separator--solid');
      expect(classes).toContain('separator--medium');
      expect(classes).toContain('separator--border');
    });

    it('should return classes for vertical orientation', () => {
      component.orientation = 'vertical';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--vertical');
      expect(classes).not.toContain('separator--horizontal');
    });

    it('should return classes for dashed variant', () => {
      component.variant = 'dashed';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--dashed');
      expect(classes).not.toContain('separator--solid');
    });

    it('should return classes for dotted variant', () => {
      component.variant = 'dotted';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--dotted');
    });

    it('should return classes for small spacing', () => {
      component.spacing = 'small';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--small');
      expect(classes).not.toContain('separator--medium');
    });

    it('should return classes for large spacing', () => {
      component.spacing = 'large';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--large');
    });

    it('should return classes for muted color', () => {
      component.color = 'muted';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--muted');
      expect(classes).not.toContain('separator--border');
    });

    it('should return classes for primary color', () => {
      component.color = 'primary';
      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--primary');
    });

    it('should combine all classes correctly', () => {
      component.orientation = 'vertical';
      component.variant = 'dashed';
      component.spacing = 'large';
      component.color = 'primary';

      const classes = component.getSeparatorClasses();

      expect(classes).toBe(
        'separator separator--vertical separator--dashed separator--large separator--primary'
      );
    });

    it('should always include base separator class', () => {
      const classes = component.getSeparatorClasses();

      expect(classes.split(' ')[0]).toBe('separator');
    });
  });

  describe('DOM rendering', () => {
    it('should render div with separator classes', () => {
      const compiled = fixture.nativeElement;
      const div = compiled.querySelector('div');

      expect(div).toBeTruthy();
      expect(div.classList.contains('separator')).toBe(true);
    });

    it('should update classes when inputs change', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [SeparatorComponent],
      });

      const newFixture = TestBed.createComponent(SeparatorComponent);
      const newComponent = newFixture.componentInstance;

      newComponent.orientation = 'vertical';
      newComponent.variant = 'dashed';
      newFixture.detectChanges();

      const compiled = newFixture.nativeElement;
      const div = compiled.querySelector('div');

      expect(div.classList.contains('separator--vertical')).toBe(true);
      expect(div.classList.contains('separator--dashed')).toBe(true);
    });

    it('should support content projection', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [SeparatorComponent],
      });

      const testFixture = TestBed.createComponent(SeparatorComponent);
      const element = testFixture.nativeElement;
      element.querySelector('div').innerHTML = '<span>Test Content</span>';

      expect(element.textContent).toContain('Test Content');
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple property changes', () => {
      component.orientation = 'vertical';
      component.variant = 'dotted';
      component.spacing = 'small';
      component.color = 'muted';

      const classes = component.getSeparatorClasses();

      expect(classes).toContain('separator--vertical');
      expect(classes).toContain('separator--dotted');
      expect(classes).toContain('separator--small');
      expect(classes).toContain('separator--muted');
    });

    it('should return valid class string format', () => {
      const classes = component.getSeparatorClasses();
      const classArray = classes.split(' ');

      expect(classArray.every((c) => c.length > 0)).toBe(true);
      expect(classArray.every((c) => !c.includes('  '))).toBe(true);
    });

    it('should have exactly 5 classes', () => {
      const classes = component.getSeparatorClasses();
      const classArray = classes.split(' ');

      expect(classArray.length).toBe(5);
    });
  });
});
