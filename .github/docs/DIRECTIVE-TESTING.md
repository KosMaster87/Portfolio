# Directive Testing Guide

Comprehensive documentation of test concepts for Angular directives.

## 📊 Overview

**22 of 22 tests passing** ✅

| Directive          | Tests | Description                                       |
| ------------------ | ----- | ------------------------------------------------- |
| IconHoverDirective | 10    | HostListener (mouseenter/mouseleave), CSS classes |
| NoScrollDirective  | 12    | HostListener (change), document.body manipulation |

---

## 🎯 What Are Directives?

Directives are Angular classes that add additional behavior to HTML elements:

**Types:**

- **Attribute Directives** - Change appearance/behavior (e.g., appIconHover)
- **Structural Directives** - Change DOM structure (e.g., *ngIf, *ngFor)

**Our Directives:**

```typescript
// Attribute Directive - adds hover effect
<div appIconHover>Icon</div>

// Attribute Directive - blocks scrolling
<input type="checkbox" appNoScroll />
```

---

## 🔧 Directive Testing Setup

### Test Component Pattern

```typescript
@Component({
  standalone: true,
  imports: [DirectiveName],
  template: `<div appDirective>Test</div>`,
})
class TestComponent {}
```

**Why standalone?**

- Angular 21: Standalone components are the standard
- Simpler imports
- No NgModule needed

### beforeEach Configuration

```typescript
let fixture: ComponentFixture<TestComponent>;
let element: DebugElement;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [TestComponent], // ← imports, not declarations!
  });

  fixture = TestBed.createComponent(TestComponent);
  element = fixture.debugElement.query(By.directive(DirectiveName));
  fixture.detectChanges();
});
```

**Important concepts:**

#### 1. By.directive() instead of By.css()

```typescript
// ✅ Correct - finds element with directive
element = fixture.debugElement.query(By.directive(IconHoverDirective));

// ❌ Wrong - only finds CSS selector
element = fixture.debugElement.query(By.css('[appIconHover]'));
```

**Why By.directive()?**

- Finds element with the directive
- Independent of selector
- Access to directive instance

#### 2. DebugElement vs. nativeElement

```typescript
const element: DebugElement = fixture.debugElement.query(...);
const nativeElement: HTMLElement = element.nativeElement;

// DebugElement - Angular wrapper (for events)
element.triggerEventHandler('click', null);

// nativeElement - Real DOM element (for checks)
expect(nativeElement.classList.contains('active')).toBe(true);
```

---

## 🎨 IconHoverDirective Tests

### Test Strategy

1. Component creation
2. Directive initialization
3. HostListener events
4. CSS class manipulation
5. Edge cases

### Example Tests

```typescript
describe('IconHoverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    element = fixture.debugElement.query(By.directive(IconHoverDirective));
    fixture.detectChanges();
  });

  it('should create directive', () => {
    expect(element).toBeTruthy();
  });

  it('should add hover class on mouseenter', () => {
    element.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('icon-hover')).toBe(true);
  });

  it('should remove hover class on mouseleave', () => {
    element.triggerEventHandler('mouseenter', null);
    element.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(element.nativeElement.classList.contains('icon-hover')).toBe(false);
  });
});
```

---

## 📜 NoScrollDirective Tests

### Special Case: document.body Manipulation

The NoScrollDirective manipulates `document.body`, which requires special testing:

```typescript
describe('NoScrollDirective', () => {
  let originalOverflow: string;

  beforeEach(() => {
    originalOverflow = document.body.style.overflow;
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow; // ← Important!
  });

  it('should block scroll when checkbox is checked', () => {
    const checkbox = element.nativeElement as HTMLInputElement;
    checkbox.checked = true;
    element.triggerEventHandler('change', { target: checkbox });
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should allow scroll when checkbox is unchecked', () => {
    const checkbox = element.nativeElement as HTMLInputElement;
    checkbox.checked = false;
    element.triggerEventHandler('change', { target: checkbox });
    expect(document.body.style.overflow).toBe('');
  });
});
```

**Why afterEach restoration?**

- Prevents conflicts between tests
- Keeps test environment clean
- Avoids side effects

---

## 🧪 Best Practices

### 1. Test Isolation

Each test should be independent:

```typescript
afterEach(() => {
  // Reset state
  document.body.style.overflow = '';
});
```

### 2. Use DebugElement for Events

```typescript
// ✅ Correct
element.triggerEventHandler('mouseenter', null);

// ❌ Wrong (doesn't trigger Angular change detection)
element.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
```

### 3. Test Edge Cases

```typescript
it('should handle multiple rapid hover events', fakeAsync(() => {
  element.triggerEventHandler('mouseenter', null);
  element.triggerEventHandler('mouseleave', null);
  element.triggerEventHandler('mouseenter', null);
  tick();
  expect(element.nativeElement.classList.contains('icon-hover')).toBe(true);
}));
```

### 4. Clear Test Descriptions

```typescript
// ✅ Good
it('should add hover class on mouseenter', () => {});

// ❌ Bad
it('should work', () => {});
```

---

## 📊 Test Results

**Overall:**

| Directive          | Tests  | Coverage     |
| ------------------ | ------ | ------------ |
| IconHoverDirective | 10/10  | 100% ✅      |
| NoScrollDirective  | 12/12  | 100% ✅      |
| **Total**          | **22** | **22/22 ✅** |

**Tests:** 22/22 ✅

**Part of:** 823 total tests in project

---

## 🚀 Running Tests

```bash
# All tests
npm test

# Only directive tests
npm test -- --include='**/directives/**/*.spec.ts'

# With coverage
npm test -- --no-watch --code-coverage
```

---

## 📚 Further Reading

- [Angular Testing Guide](https://angular.io/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Testing Directives (Angular.io)](https://angular.io/guide/testing-attribute-directives)

---

**Last Update**: December 15, 2025
