import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoScrollDirective } from './no-scroll.directive';

@Component({
  imports: [NoScrollDirective],
  template: `<input type="checkbox" appNoScroll />`,
})
class TestComponent {}

describe('NoScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(NoScrollDirective));
    inputElement = element.nativeElement as HTMLInputElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('no-scroll');
  });

  it('should create directive', () => {
    const directive = element.injector.get(NoScrollDirective);
    expect(directive).toBeTruthy();
  });

  describe('Change event handling', () => {
    it('should add no-scroll class when checkbox is checked', () => {
      expect(document.body.classList.contains('no-scroll')).toBe(false);

      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('should remove no-scroll class when checkbox is unchecked', () => {
      document.body.classList.add('no-scroll');

      inputElement.checked = false;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('should toggle no-scroll class on multiple changes', () => {
      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      inputElement.checked = false;
      element.triggerEventHandler('change', { target: inputElement });
      expect(document.body.classList.contains('no-scroll')).toBe(false);

      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });
      expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('should handle rapid toggling', () => {
      for (let i = 0; i < 5; i++) {
        inputElement.checked = true;
        element.triggerEventHandler('change', { target: inputElement });
        expect(document.body.classList.contains('no-scroll')).toBe(true);

        inputElement.checked = false;
        element.triggerEventHandler('change', { target: inputElement });
        expect(document.body.classList.contains('no-scroll')).toBe(false);
      }
    });
  });

  describe('Initial state', () => {
    it('should not add class initially', () => {
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('should not modify body classes on creation', () => {
      const initialClasses = Array.from(document.body.classList);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TestComponent],
      });

      const newFixture = TestBed.createComponent(TestComponent);
      newFixture.detectChanges();

      const finalClasses = Array.from(document.body.classList).filter((c) => c !== 'no-scroll');

      expect(finalClasses).toEqual(initialClasses);
    });
  });

  describe('Multiple checkboxes', () => {
    it('should work with multiple checkboxes independently', () => {
      @Component({
        standalone: true,
        imports: [NoScrollDirective],
        template: `
          <input type="checkbox" appNoScroll id="first" />
          <input type="checkbox" appNoScroll id="second" />
        `,
      })
      class MultiCheckboxComponent {}

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [MultiCheckboxComponent],
      });

      const multiFixture = TestBed.createComponent(MultiCheckboxComponent);
      const checkboxes = multiFixture.debugElement.queryAll(By.directive(NoScrollDirective));

      const firstCheckbox = checkboxes[0].nativeElement as HTMLInputElement;
      const secondCheckbox = checkboxes[1].nativeElement as HTMLInputElement;

      firstCheckbox.checked = true;
      checkboxes[0].triggerEventHandler('change', { target: firstCheckbox });
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      secondCheckbox.checked = true;
      checkboxes[1].triggerEventHandler('change', { target: secondCheckbox });
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      firstCheckbox.checked = false;
      checkboxes[0].triggerEventHandler('change', { target: firstCheckbox });
      expect(document.body.classList.contains('no-scroll')).toBe(false);

      secondCheckbox.checked = false;
      checkboxes[1].triggerEventHandler('change', { target: secondCheckbox });
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle checked state true explicitly', () => {
      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('should handle checked state false explicitly', () => {
      document.body.classList.add('no-scroll');

      inputElement.checked = false;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('should work after fixture.detectChanges', () => {
      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });
      fixture.detectChanges();

      expect(document.body.classList.contains('no-scroll')).toBe(true);

      inputElement.checked = false;
      element.triggerEventHandler('change', { target: inputElement });
      fixture.detectChanges();

      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    it('should not affect other body classes', () => {
      document.body.classList.add('existing-class');

      inputElement.checked = true;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('existing-class')).toBe(true);
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      inputElement.checked = false;
      element.triggerEventHandler('change', { target: inputElement });

      expect(document.body.classList.contains('existing-class')).toBe(true);
      expect(document.body.classList.contains('no-scroll')).toBe(false);

      document.body.classList.remove('existing-class');
    });
  });
});
