import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconHoverDirective } from './icon-hover.directive';

@Component({
  standalone: true,
  imports: [IconHoverDirective],
  template: `<div appIconHover>Test Element</div>`,
})
class TestComponent {}

describe('IconHoverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, IconHoverDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(IconHoverDirective));
    fixture.detectChanges();
  });

  it('should create directive', () => {
    const directive = element.injector.get(IconHoverDirective);
    expect(directive).toBeTruthy();
  });

  describe('Mouse events', () => {
    it('should add hover-effect class on mouseenter', () => {
      const nativeElement = element.nativeElement;

      expect(nativeElement.classList.contains('hover-effect')).toBe(false);

      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(true);
    });

    it('should remove hover-effect class on mouseleave', () => {
      const nativeElement = element.nativeElement;

      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();
      expect(nativeElement.classList.contains('hover-effect')).toBe(true);

      element.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(false);
    });

    it('should handle multiple mouseenter events', () => {
      const nativeElement = element.nativeElement;

      element.triggerEventHandler('mouseenter', null);
      element.triggerEventHandler('mouseenter', null);
      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(true);
    });

    it('should handle multiple mouseleave events', () => {
      const nativeElement = element.nativeElement;

      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      element.triggerEventHandler('mouseleave', null);
      element.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(false);
    });

    it('should handle rapid hover events', () => {
      const nativeElement = element.nativeElement;

      element.triggerEventHandler('mouseenter', null);
      element.triggerEventHandler('mouseleave', null);
      element.triggerEventHandler('mouseenter', null);
      element.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(false);
    });
  });

  describe('Multiple elements', () => {
    it('should work with multiple elements independently', () => {
      @Component({
        imports: [IconHoverDirective],
        template: `
          <div appIconHover id="first">First</div>
          <div appIconHover id="second">Second</div>
        `,
      })
      class MultiTestComponent {}

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [MultiTestComponent],
      });

      const multiFixture = TestBed.createComponent(MultiTestComponent);
      const elements = multiFixture.debugElement.queryAll(By.directive(IconHoverDirective));

      elements[0].triggerEventHandler('mouseenter', null);
      multiFixture.detectChanges();

      expect(elements[0].nativeElement.classList.contains('hover-effect')).toBe(true);
      expect(elements[1].nativeElement.classList.contains('hover-effect')).toBe(false);

      elements[1].triggerEventHandler('mouseenter', null);
      multiFixture.detectChanges();

      expect(elements[0].nativeElement.classList.contains('hover-effect')).toBe(true);
      expect(elements[1].nativeElement.classList.contains('hover-effect')).toBe(true);
    });
  });

  describe('Element state', () => {
    it('should not add class initially', () => {
      const nativeElement = element.nativeElement;

      expect(nativeElement.classList.contains('hover-effect')).toBe(false);
    });

    it('should maintain class between fixture.detectChanges calls', () => {
      const nativeElement = element.nativeElement;

      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(true);

      fixture.detectChanges();

      expect(nativeElement.classList.contains('hover-effect')).toBe(true);
    });

    it('should not affect other classes', () => {
      const nativeElement = element.nativeElement;
      nativeElement.classList.add('existing-class');

      element.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('existing-class')).toBe(true);
      expect(nativeElement.classList.contains('hover-effect')).toBe(true);

      element.triggerEventHandler('mouseleave', null);
      fixture.detectChanges();

      expect(nativeElement.classList.contains('existing-class')).toBe(true);
      expect(nativeElement.classList.contains('hover-effect')).toBe(false);
    });
  });
});
