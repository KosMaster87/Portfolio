# Angular Testing Guide

Umfassende Dokumentation der Testing-Konzepte und Best Practices für dieses Projekt.

## 📊 Test-Übersicht

**135 von 135 Tests erfolgreich** ✅

| Service              | Tests | Konzepte                            |
| -------------------- | ----- | ----------------------------------- |
| SeoService           | 11    | Meta/Title Mocking, AAA Pattern     |
| ThemeService         | 30    | Signals, Effects, localStorage      |
| PortfolioDataService | 23    | Array Operations, Data Validation   |
| ScrollService        | 17    | jasmine.clock(), DOM Mocking        |
| TranslationService   | 42    | HTTP Testing, Observables           |
| NavigationService    | 6     | Router Mocking, Events              |
| SmoothScrollService  | 23    | requestAnimationFrame, Math Testing |
| SwUpdateService      | 9     | Service Worker, ApplicationRef      |

---

## 🎯 Grundlegende Konzepte

### AAA Pattern (Arrange-Act-Assert)

Jeder Test folgt diesem Pattern:

```typescript
it('should do something', () => {
  // Arrange - Setup
  const input = 'test';

  // Act - Ausführung
  const result = service.method(input);

  // Assert - Überprüfung
  expect(result).toBe('expected');
});
```

### Test-Struktur mit describe()

```typescript
describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(() => {
    // Setup vor jedem Test
  });

  afterEach(() => {
    // Cleanup nach jedem Test
  });

  describe('methodName()', () => {
    it('should handle normal case', () => {});
    it('should handle edge case', () => {});
    it('should handle error case', () => {});
  });
});
```

---

## 🔧 Dependency Mocking

### jasmine.createSpyObj

Mock für Services mit Methoden:

```typescript
const metaSpy = jasmine.createSpyObj('Meta', ['updateTag', 'removeTag']);
metaSpy.updateTag.and.returnValue(mockMetaElement);
```

Mock mit Properties (readonly):

```typescript
const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
  events: routerEventsSubject.asObservable(),
  url: '/',
});
```

### TestBed Configuration

```typescript
TestBed.configureTestingModule({
  providers: [ServiceName, { provide: Dependency, useValue: mockDependency }],
});

service = TestBed.inject(ServiceName);
```

---

## 📡 HTTP Testing

### Setup

```typescript
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [ServiceName, provideHttpClient(), provideHttpClientTesting()],
  });

  httpMock = TestBed.inject(HttpTestingController);
});

afterEach(() => {
  httpMock.verify(); // Prüft auf pending requests
});
```

### HTTP Request Testing

```typescript
it('should fetch data', () => {
  service.getData().subscribe((data) => {
    expect(data).toEqual(mockData);
  });

  const req = httpMock.expectOne('/api/data');
  expect(req.request.method).toBe('GET');
  req.flush(mockData);
});
```

### Error Handling

```typescript
it('should handle HTTP errors', () => {
  service.getData().subscribe({
    next: () => fail('should have failed'),
    error: (error) => {
      expect(error.status).toBe(404);
    },
  });

  const req = httpMock.expectOne('/api/data');
  req.error(new ProgressEvent('error'), { status: 404 });
});
```

---

## 🔔 Signal Testing

### TestBed.flushEffects()

Wichtig für Signal Effects:

```typescript
it('should update signal', () => {
  service.updateValue('new');

  TestBed.flushEffects(); // Führt pending effects aus

  expect(service.value()).toBe('new');
});
```

### Computed Signals

```typescript
it('should compute derived value', () => {
  service.input.set(5);

  expect(service.doubled()).toBe(10);
});
```

### Signal Effects

```typescript
it('should trigger effect on signal change', () => {
  const spy = jasmine.createSpy('effect');

  effect(() => {
    const val = service.signal();
    spy(val);
  });

  service.signal.set('test');
  TestBed.flushEffects();

  expect(spy).toHaveBeenCalledWith('test');
});
```

---

## ⏱️ Async Testing

### done() Callback

Für Promises und Callbacks:

```typescript
it('should complete async operation', (done) => {
  service.asyncMethod();

  setTimeout(() => {
    expect(service.isComplete).toBe(true);
    done();
  }, 0);
});
```

### jasmine.clock()

Für setTimeout/setInterval:

```typescript
beforeEach(() => {
  jasmine.clock().install();
});

afterEach(() => {
  jasmine.clock().uninstall();
});

it('should wait for timer', () => {
  service.delayedAction();

  expect(service.executed).toBe(false);

  jasmine.clock().tick(1000);

  expect(service.executed).toBe(true);
});
```

### requestAnimationFrame

Für Browser-Animationen:

```typescript
it('should animate smoothly', (done) => {
  service.animate();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      expect(window.scrollTo).toHaveBeenCalled();
      done();
    });
  });
});
```

---

## 🌐 DOM & Browser API Mocking

### window Properties

```typescript
beforeEach(() => {
  Object.defineProperty(window, 'innerHeight', {
    value: 800,
    writable: true,
    configurable: true,
  });
});
```

### localStorage

```typescript
let localStorageMock: { [key: string]: string } = {};

beforeEach(() => {
  spyOn(localStorage, 'getItem').and.callFake((key) => localStorageMock[key] || null);
  spyOn(localStorage, 'setItem').and.callFake((key, value) => {
    localStorageMock[key] = value;
  });
  spyOn(localStorage, 'removeItem').and.callFake((key) => {
    delete localStorageMock[key];
  });
});

afterEach(() => {
  localStorageMock = {};
});
```

### window.matchMedia

```typescript
beforeEach(() => {
  const mockMatchMedia = (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    addEventListener: jasmine.createSpy('addEventListener'),
    removeEventListener: jasmine.createSpy('removeEventListener'),
  });

  spyOn(window, 'matchMedia').and.callFake(mockMatchMedia as any);
});
```

### document.getElementById

```typescript
it('should find element', () => {
  const mockElement = document.createElement('div');
  spyOn(document, 'getElementById').and.returnValue(mockElement);

  const result = service.findElement('test-id');

  expect(result).toBe(mockElement);
});
```

### getBoundingClientRect

```typescript
it('should get element position', () => {
  const mockElement = {
    getBoundingClientRect: () => ({ top: 100, left: 0, width: 200, height: 50 }),
    offsetHeight: 50,
  } as HTMLElement;

  service.scrollToElement(mockElement);

  expect(window.scrollTo).toHaveBeenCalled();
});
```

### document.body Cleanup

**Wichtig:** Immer wiederherstellen!

```typescript
let originalBody: HTMLElement;

beforeEach(() => {
  originalBody = document.body;

  const mockBody = {
    style: { setProperty: jasmine.createSpy() },
    classList: { add: jasmine.createSpy(), remove: jasmine.createSpy() },
  };

  Object.defineProperty(document, 'body', {
    value: mockBody,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(document, 'body', {
    value: originalBody,
    writable: true,
    configurable: true,
  });
});
```

---

## 🧭 Router Testing

### Router Mock Setup

```typescript
let routerSpy: jasmine.SpyObj<Router>;
let routerEventsSubject: Subject<any>;

beforeEach(() => {
  routerEventsSubject = new Subject();

  routerSpy = jasmine.createSpyObj('Router', ['navigate'], {
    events: routerEventsSubject.asObservable(),
    url: '/',
  });

  routerSpy.navigate.and.returnValue(Promise.resolve(true));
});
```

### NavigationEnd Events

```typescript
it('should react to navigation', () => {
  service.initialize();

  routerEventsSubject.next(new NavigationEnd(1, '/new-page', '/new-page'));

  expect(service.currentRoute()).toBe('/new-page');
});
```

### toSignal() Testing

```typescript
it('should convert router events to signal', () => {
  expect(service.currentUrl()).toBe('/');

  routerEventsSubject.next(new NavigationEnd(1, '/about', '/about'));

  expect(service.currentUrl()).toBe('/about');
});
```

---

## 🔄 Observable Testing

### Subject für Mocking

```typescript
let dataSubject: Subject<Data>;

beforeEach(() => {
  dataSubject = new Subject();

  const serviceSpy = jasmine.createSpyObj('Service', [], {
    data$: dataSubject.asObservable(),
  });
});

it('should emit values', () => {
  let receivedValue: Data | undefined;

  service.data$.subscribe((val) => (receivedValue = val));

  dataSubject.next(mockData);

  expect(receivedValue).toEqual(mockData);
});
```

### of() für synchrone Observables

```typescript
it('should return data immediately', (done) => {
  spyOn(dependency, 'getData').and.returnValue(of(mockData));

  service.fetchData().subscribe((data) => {
    expect(data).toEqual(mockData);
    done();
  });
});
```

---

## 🛠️ Service Worker Testing

### SwUpdate Mock

```typescript
let versionUpdatesSubject: Subject<VersionReadyEvent>;

beforeEach(() => {
  versionUpdatesSubject = new Subject();

  swUpdateSpy = jasmine.createSpyObj('SwUpdate', ['checkForUpdate', 'activateUpdate'], {
    isEnabled: true,
    versionUpdates: versionUpdatesSubject.asObservable(),
  });

  swUpdateSpy.checkForUpdate.and.returnValue(Promise.resolve(false));
});
```

### VersionReadyEvent

```typescript
it('should handle version ready event', () => {
  const versionEvent: VersionReadyEvent = {
    type: 'VERSION_READY',
    currentVersion: { hash: 'v1' },
    latestVersion: { hash: 'v2' },
  };

  versionUpdatesSubject.next(versionEvent);

  expect(service.showUpdateNotification()).toBe(true);
});
```

### ApplicationRef.isStable

```typescript
let isStableSubject: Subject<boolean>;

beforeEach(() => {
  isStableSubject = new Subject();

  appRefSpy = jasmine.createSpyObj('ApplicationRef', [], {
    isStable: isStableSubject.asObservable(),
  });
});

it('should check for updates when stable', (done) => {
  service.initialize();

  isStableSubject.next(true);

  setTimeout(() => {
    expect(swUpdateSpy.checkForUpdate).toHaveBeenCalled();
    done();
  }, 0);
});
```

---

## 🧪 Spezielle Testing-Patterns

### Private Method Testing

```typescript
it('should calculate correctly', () => {
  const result = (service as any).privateMethod(input);
  expect(result).toBe(expected);
});
```

### Math Function Testing

```typescript
it('should ease in and out', () => {
  const ease = (service as any).easeInOutQuad;

  expect(ease(0)).toBe(0);
  expect(ease(0.5)).toBe(0.5);
  expect(ease(1)).toBe(1);

  const midpoint = ease(0.25);
  expect(midpoint).toBeGreaterThan(0);
  expect(midpoint).toBeLessThan(0.5);
});
```

### Array Testing

```typescript
it('should return filtered items', () => {
  const items = service.getFilteredItems();

  expect(items.length).toBeGreaterThan(0);
  expect(items.every((item) => item.active)).toBe(true);
});
```

### jasmine.objectContaining

```typescript
it('should have correct structure', () => {
  const project = service.getProject('1');

  expect(project).toEqual(
    jasmine.objectContaining({
      id: '1',
      title: jasmine.any(String),
      technologies: jasmine.any(Array),
    })
  );
});
```

---

## ✅ Best Practices

### 1. Cleanup in afterEach

```typescript
afterEach(() => {
  // HTTP Mocks
  httpMock.verify();

  // jasmine.clock
  jasmine.clock().uninstall();

  // DOM Mocks
  Object.defineProperty(document, 'body', {
    value: originalBody,
    writable: true,
    configurable: true,
  });
});
```

### 2. Test-Namen

- Beschreibend und spezifisch
- Beginnt mit "should"
- Erklärt das erwartete Verhalten

```typescript
// ✅ Gut
it('should return empty array when no items match filter', () => {});

// ❌ Schlecht
it('works', () => {});
it('test filter', () => {});
```

### 3. Ein Konzept pro Test

```typescript
// ✅ Gut
it('should validate email format', () => {});
it('should trim whitespace', () => {});

// ❌ Schlecht
it('should validate and trim email', () => {});
```

### 4. Test-Isolation

Jeder Test muss unabhängig laufen können:

```typescript
beforeEach(() => {
  // Fresh setup für jeden Test
  service = TestBed.inject(ServiceName);
});
```

### 5. Arrange-Act-Assert Trennung

```typescript
it('should calculate total', () => {
  // Arrange
  const items = [{ price: 10 }, { price: 20 }];

  // Act
  const total = service.calculateTotal(items);

  // Assert
  expect(total).toBe(30);
});
```

### 6. Keine Kommentare in Tests

Test-Namen sind die Dokumentation:

```typescript
// ✅ Gut
it('should return null when user is not found', () => {
  expect(service.getUser('invalid')).toBeNull();
});

// ❌ Schlecht
it('test user retrieval', () => {
  // Test if user is null when not found
  expect(service.getUser('invalid')).toBeNull();
});
```

### 7. Edge Cases testen

```typescript
describe('Edge cases', () => {
  it('should handle empty array', () => {});
  it('should handle null input', () => {});
  it('should handle very large numbers', () => {});
  it('should handle special characters', () => {});
});
```

---

## 🚫 Häufige Fehler

### 1. Fehlende TestBed.flushEffects()

```typescript
// ❌ Falsch
it('should update signal', () => {
  service.updateValue('new');
  expect(service.value()).toBe('new'); // Schlägt fehl!
});

// ✅ Richtig
it('should update signal', () => {
  service.updateValue('new');
  TestBed.flushEffects();
  expect(service.value()).toBe('new');
});
```

### 2. Fehlende httpMock.verify()

```typescript
// ❌ Falsch
afterEach(() => {
  // Vergessen httpMock zu verifizieren
});

// ✅ Richtig
afterEach(() => {
  httpMock.verify(); // Prüft auf pending requests
});
```

### 3. DOM Mock nicht aufgeräumt

```typescript
// ❌ Falsch - Browser UI bricht
beforeEach(() => {
  Object.defineProperty(document, 'body', { value: mockBody });
});
// Kein cleanup!

// ✅ Richtig
let originalBody: HTMLElement;

beforeEach(() => {
  originalBody = document.body;
  Object.defineProperty(document, 'body', { value: mockBody, configurable: true });
});

afterEach(() => {
  Object.defineProperty(document, 'body', { value: originalBody, configurable: true });
});
```

### 4. window.location.reload() nicht gemockt

```typescript
// ❌ Problem - Endlosschleife!
it('should reload page', () => {
  service.activateUpdate(); // Ruft window.location.reload() auf
});

// ✅ Lösung - Funktion nicht direkt testen
it('should call activateUpdate', () => {
  expect(swUpdateSpy.activateUpdate).toHaveBeenCalled();
});
```

### 5. Async ohne done() oder fakeAsync

```typescript
// ❌ Falsch
it('should complete async', () => {
  service.asyncMethod();
  expect(service.done).toBe(true); // Zu früh!
});

// ✅ Richtig
it('should complete async', (done) => {
  service.asyncMethod();
  setTimeout(() => {
    expect(service.done).toBe(true);
    done();
  }, 0);
});
```

---

## 📚 Weiterführende Ressourcen

### Offizielle Dokumentation

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Configuration](https://karma-runner.github.io/latest/config/configuration-file.html)

### Testing-Tools

- **TestBed**: Angular's Testing-Modul
- **Jasmine**: Test-Framework (describe, it, expect)
- **Karma**: Test-Runner im Browser
- **HttpTestingController**: HTTP-Mock für Tests

### Commands

```bash
# Alle Tests ausführen
npm test

# Tests mit Code Coverage
ng test --code-coverage

# Einzelne Test-Datei (watch mode)
ng test --include='**/seo.service.spec.ts'
```

---

## 📝 Test-Template

Starter-Template für neue Service-Tests:

```typescript
import { TestBed } from '@angular/core/testing';
import { ServiceName } from './service-name.service';
import { Dependency } from './dependency.service';

describe('ServiceName', () => {
  let service: ServiceName;
  let dependencySpy: jasmine.SpyObj<Dependency>;

  beforeEach(() => {
    dependencySpy = jasmine.createSpyObj('Dependency', ['method1', 'method2']);

    TestBed.configureTestingModule({
      providers: [ServiceName, { provide: Dependency, useValue: dependencySpy }],
    });

    service = TestBed.inject(ServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('methodName()', () => {
    it('should handle normal case', () => {
      // Arrange
      const input = 'test';
      dependencySpy.method1.and.returnValue('mocked');

      // Act
      const result = service.methodName(input);

      // Assert
      expect(result).toBe('expected');
      expect(dependencySpy.method1).toHaveBeenCalledWith(input);
    });

    it('should handle edge case', () => {
      // Test implementation
    });

    it('should handle error case', () => {
      // Test implementation
    });
  });

  describe('Edge cases', () => {
    it('should handle null input', () => {});
    it('should handle empty input', () => {});
  });
});
```

---

**Stand:** 15. Dezember 2025
**Tests:** 135/135 ✅
**Coverage:** Alle 8 Core Services vollständig getestet
