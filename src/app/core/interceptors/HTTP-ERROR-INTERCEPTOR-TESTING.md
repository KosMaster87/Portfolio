# HTTP Error Interceptor Testing Guide

Detaillierte Dokumentation der Test-Konzepte für den HTTP Error Interceptor.

## 📊 Übersicht

**16 von 16 Tests erfolgreich** ✅

| Kategorie           | Tests | Beschreibung                        |
| ------------------- | ----- | ----------------------------------- |
| Successful requests | 1     | Normale HTTP-Responses durchlassen  |
| Client-side errors  | 3     | ErrorEvent, Logging in Dev/Prod     |
| Server-side errors  | 6     | 404, 500, 401, 403, Logging         |
| Error propagation   | 2     | Error re-throwing, Details erhalten |
| Unknown errors      | 1     | Errors ohne spezifischen Typ        |
| Request types       | 3     | POST, PUT, DELETE                   |

---

## 🎯 Was wird getestet?

### Der Interceptor

```typescript
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Error handling logic
      return throwError(() => error);
    })
  );
};
```

**Funktionen:**

- Fängt alle HTTP-Errors ab
- Unterscheidet Client-side vs. Server-side Errors
- Loggt Errors in Development (nicht in Production)
- Wirft Errors wieder, damit sie weiter behandelt werden können

---

## 🔧 Test-Setup

### beforeEach Configuration

```typescript
let consoleErrorSpy: jasmine.Spy;
let nextHandler: jasmine.Spy;
let request: HttpRequest<any>;

beforeEach(() => {
  consoleErrorSpy = spyOn(console, 'error');
  request = new HttpRequest('GET', '/api/test');
});
```

**Wichtige Konzepte:**

#### 1. console.error mocken

```typescript
consoleErrorSpy = spyOn(console, 'error');

// Später prüfen:
expect(consoleErrorSpy).toHaveBeenCalled();
expect(consoleErrorSpy).not.toHaveBeenCalled();
```

**Warum?**

- Verhindert Konsolen-Output während Tests
- Erlaubt Prüfung, ob Logging erfolgt

#### 2. HttpRequest erstellen

```typescript
request = new HttpRequest('GET', '/api/test');
```

**Erlaubt mit `new`:**

- `HttpRequest` ist nur ein Daten-Container
- Keine Business-Logik
- Reine HTTP-Metadaten (Method, URL, Body)

#### 3. nextHandler Spy

```typescript
nextHandler = jasmine.createSpy('next').and.returnValue(of(mockResponse));
```

**Was ist nextHandler?**

- Simuliert den nächsten Handler in der Interceptor-Chain
- Gibt Observable zurück (Success oder Error)

---

## ✅ Successful Requests

### Test: Erfolgreiche Responses durchlassen

```typescript
it('should pass through successful responses', (done) => {
  const mockResponse = new HttpResponse({ status: 200, body: { data: 'test' } });
  nextHandler = jasmine.createSpy('next').and.returnValue(of(mockResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    next: (response) => {
      expect(response).toBe(mockResponse);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      done();
    },
  });
});
```

**Was wird getestet?**

- Interceptor greift bei Success NICHT ein
- Response bleibt unverändert
- Kein Logging bei Success

**Konzepte:**

- `of(mockResponse)` = RxJS Observable mit Erfolgs-Response
- `done()` = Async-Test-Callback (wartet auf Observable)

---

## ❌ Client-Side Errors

### Was sind Client-Side Errors?

```typescript
const clientError = new ErrorEvent('Network error', {
  message: 'Connection failed',
});
```

**Beispiele:**

- Netzwerk-Fehler (offline)
- CORS-Fehler
- DNS-Fehler
- Browser-Probleme

**Erkennung im Code:**

```typescript
if (error.error instanceof ErrorEvent) {
  // Client-side error
  errorMessage = `Error: ${error.error.message}`;
}
```

### Test: ErrorEvent handling

```typescript
it('should handle ErrorEvent errors', (done) => {
  const clientError = new ErrorEvent('Network error', {
    message: 'Connection failed',
  });
  const errorResponse = new HttpErrorResponse({
    error: clientError,
    status: 0,
    statusText: 'Unknown Error',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: (error: HttpErrorResponse) => {
      expect(error).toBe(errorResponse);
      expect(error.error).toBe(clientError);
      done();
    },
  });
});
```

**Wichtig:**

- `throwError()` statt `of()` für Errors
- Callback in `error:` statt `next:`
- `status: 0` typisch für Client-Errors

### Test: Production vs. Development Logging

#### Development (Logging aktiv)

```typescript
it('should log client-side errors in non-production', (done) => {
  const originalProduction = environment.production;
  (environment as any).production = false;

  // ... Error erstellen ...

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: () => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'HTTP Error:',
        jasmine.stringContaining('Error: Connection failed'),
        errorResponse
      );
      (environment as any).production = originalProduction;
      done();
    },
  });
});
```

**Konzepte:**

1. **Environment mocken:**

```typescript
const originalProduction = environment.production;
(environment as any).production = false;

// Test...

(environment as any).production = originalProduction; // Wiederherstellen!
```

2. **jasmine.stringContaining:**

```typescript
expect(consoleErrorSpy).toHaveBeenCalledWith(
  'HTTP Error:',
  jasmine.stringContaining('Error: Connection failed'),
  errorResponse
);
```

- Prüft, ob String den Text enthält
- Flexibler als exakter Vergleich

#### Production (Kein Logging)

```typescript
it('should not log client-side errors in production', (done) => {
  const originalProduction = environment.production;
  (environment as any).production = true;

  // ... Error erstellen ...

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: () => {
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      (environment as any).production = originalProduction;
      done();
    },
  });
});
```

**Wichtig:**

- Immer `originalProduction` wiederherstellen!
- Sonst beeinflussen Tests sich gegenseitig

---

## 🌐 Server-Side Errors

### Was sind Server-Side Errors?

```typescript
const errorResponse = new HttpErrorResponse({
  error: 'Not Found',
  status: 404,
  statusText: 'Not Found',
  url: '/api/test',
});
```

**Beispiele:**

- 404 Not Found
- 500 Internal Server Error
- 401 Unauthorized
- 403 Forbidden

**Erkennung im Code:**

```typescript
else {
  // Server-side error
  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
}
```

### Test: Verschiedene Status Codes

```typescript
it('should handle 404 errors', (done) => {
  const errorResponse = new HttpErrorResponse({
    error: 'Not Found',
    status: 404,
    statusText: 'Not Found',
    url: '/api/test',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: (error: HttpErrorResponse) => {
      expect(error.status).toBe(404);
      expect(error).toBe(errorResponse);
      done();
    },
  });
});
```

**Getestete Status Codes:**

- **404** - Not Found (Ressource existiert nicht)
- **500** - Internal Server Error (Server-Fehler)
- **401** - Unauthorized (Nicht authentifiziert)
- **403** - Forbidden (Keine Berechtigung)

### Test: Server-Error Logging

Gleiche Logik wie bei Client-Errors:

- Development: `console.error()` wird aufgerufen
- Production: Kein Logging

```typescript
it('should log server-side errors in non-production', (done) => {
  const originalProduction = environment.production;
  (environment as any).production = false;

  const errorResponse = new HttpErrorResponse({
    error: 'Server error',
    status: 500,
    statusText: 'Internal Server Error',
  });

  // ...

  expect(consoleErrorSpy).toHaveBeenCalledWith(
    'HTTP Error:',
    jasmine.stringContaining('Error Code: 500'),
    errorResponse
  );
});
```

---

## 🔄 Error Propagation

### Test: Errors werden wieder geworfen

```typescript
it('should re-throw errors after handling', (done) => {
  const errorResponse = new HttpErrorResponse({
    error: 'Test error',
    status: 400,
    statusText: 'Bad Request',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    next: () => fail('Should not emit next'),
    error: (error: HttpErrorResponse) => {
      expect(error).toBe(errorResponse);
      expect(error instanceof HttpErrorResponse).toBe(true);
      done();
    },
  });
});
```

**Warum wichtig?**

- Interceptor soll Error NICHT verschlucken
- Andere Error-Handler sollen Error auch sehen
- Service kann weiter reagieren

**fail() Verwendung:**

```typescript
next: () => fail('Should not emit next');
```

- Test schlägt fehl, wenn `next` aufgerufen wird
- Stellt sicher, dass nur `error` emittiert wird

### Test: Error-Details bleiben erhalten

```typescript
it('should preserve error details', (done) => {
  const errorResponse = new HttpErrorResponse({
    error: { message: 'Validation failed', fields: ['email', 'password'] },
    status: 422,
    statusText: 'Unprocessable Entity',
    url: '/api/validate',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: (error: HttpErrorResponse) => {
      expect(error.error).toEqual({
        message: 'Validation failed',
        fields: ['email', 'password'],
      });
      expect(error.status).toBe(422);
      expect(error.url).toBe('/api/validate');
      done();
    },
  });
});
```

**Was wird geprüft?**

- Error-Body bleibt unverändert
- Status Code bleibt gleich
- URL bleibt erhalten
- Alle Metadaten intakt

---

## ❓ Unknown Errors

### Test: Errors ohne spezifischen Typ

```typescript
it('should handle errors without specific type', (done) => {
  const errorResponse = new HttpErrorResponse({
    error: null,
    status: 0,
    statusText: 'Unknown Error',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(request, nextHandler).subscribe({
    error: (error: HttpErrorResponse) => {
      expect(error).toBe(errorResponse);
      done();
    },
  });
});
```

**Szenario:**

- `error: null` (kein ErrorEvent, kein Server-Error)
- `status: 0` (kein HTTP-Status)
- Edge-Case für unerwartete Fehler

---

## 📮 Request Types

### Warum verschiedene HTTP-Methoden testen?

```typescript
it('should handle POST requests', (done) => {
  const postRequest = new HttpRequest('POST', '/api/data', { name: 'test' });
  const errorResponse = new HttpErrorResponse({
    error: 'Bad Request',
    status: 400,
    statusText: 'Bad Request',
  });

  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  httpErrorInterceptor(postRequest, nextHandler).subscribe({
    error: (error: HttpErrorResponse) => {
      expect(error.status).toBe(400);
      done();
    },
  });
});
```

**Getestete Methoden:**

- **GET** - Basis-Request (Standard in anderen Tests)
- **POST** - Mit Request-Body `{ name: 'test' }`
- **PUT** - Update mit Body `{ name: 'updated' }`
- **DELETE** - Ohne Body

**Warum wichtig?**

- Sicherstellen, dass Interceptor bei allen Methoden funktioniert
- Body wird korrekt behandelt
- Keine spezielle Logik für bestimmte Methoden nötig

---

## 🔑 Wichtige Konzepte

### 1. Datenklassen mit `new` erstellen

**✅ Erlaubt:**

```typescript
new HttpRequest('GET', '/api/test');
new HttpResponse({ status: 200 });
new HttpErrorResponse({ status: 404 });
new ErrorEvent('Network error');
```

**Warum?**

- Nur Datencontainer
- Keine Business-Logik
- Keine Dependencies

**❌ Nicht erlaubt:**

```typescript
new HttpClient(); // Service → jasmine.createSpyObj
new Router(); // Service → jasmine.createSpyObj
```

### 2. RxJS Observables

**Erfolg simulieren:**

```typescript
of(mockResponse); // Emittiert Wert sofort
```

**Fehler simulieren:**

```typescript
throwError(() => errorResponse); // Emittiert Error
```

**Subscribe Pattern:**

```typescript
observable.subscribe({
  next: (value) => {
    /* Success */
  },
  error: (error) => {
    /* Error */
  },
});
```

### 3. Async Testing mit done()

```typescript
it('should do async operation', (done) => {
  observable.subscribe({
    next: (value) => {
      expect(value).toBe(expected);
      done(); // ← Test beendet
    },
  });
});
```

**Wichtig:**

- Ohne `done()` endet Test zu früh
- Observable würde nicht abgewartet
- Assertions würden nie ausgeführt

### 4. Environment Mocking

```typescript
const originalProduction = environment.production;
(environment as any).production = false;

// Test...

(environment as any).production = originalProduction;
```

**Best Practice:**

- Immer Original-Wert speichern
- Nach Test wiederherstellen
- Sonst beeinflussen Tests sich gegenseitig

### 5. jasmine.stringContaining

```typescript
expect(consoleErrorSpy).toHaveBeenCalledWith(
  'HTTP Error:',
  jasmine.stringContaining('Error Code: 500'),
  errorResponse
);
```

**Vorteile:**

- Flexibler als exakter String-Vergleich
- Funktioniert auch wenn Error-Message variiert
- Fokussiert auf wichtigen Teil

---

## ✅ Best Practices

### 1. Console Mocking

```typescript
beforeEach(() => {
  consoleErrorSpy = spyOn(console, 'error');
});

afterEach(() => {
  consoleErrorSpy.calls.reset();
});
```

**Warum reset()?**

- Verhindert, dass Calls sich zwischen Tests akkumulieren
- Jeder Test startet sauber

### 2. Environment Cleanup

```typescript
it('should test something', (done) => {
  const originalProduction = environment.production;
  (environment as any).production = false;

  // Test logic...

  expect(something).toBe(true);
  (environment as any).production = originalProduction; // ← Immer!
  done();
});
```

### 3. Error-Callback prüfen

```typescript
httpErrorInterceptor(request, nextHandler).subscribe({
  next: () => fail('Should not emit next'), // ← Sicherheitsnetz
  error: (error) => {
    expect(error).toBeDefined();
    done();
  },
});
```

### 4. Test-Namen beschreibend

```typescript
// ✅ Gut
it('should log client-side errors in non-production', () => {});
it('should handle 404 errors', () => {});

// ❌ Schlecht
it('works', () => {});
it('test error', () => {});
```

### 5. Arrange-Act-Assert

```typescript
it('should handle errors', (done) => {
  // Arrange
  const errorResponse = new HttpErrorResponse({ status: 500 });
  nextHandler = jasmine.createSpy('next').and.returnValue(throwError(() => errorResponse));

  // Act
  httpErrorInterceptor(request, nextHandler).subscribe({
    error: (error) => {
      // Assert
      expect(error.status).toBe(500);
      done();
    },
  });
});
```

---

## 📚 Zusammenfassung

### Was haben wir gelernt?

1. **Interceptor Testing**

   - HttpInterceptorFn testen
   - nextHandler mocken
   - Observable-basierte Tests

2. **Error Handling**

   - Client-side vs. Server-side Errors
   - ErrorEvent vs. HttpErrorResponse
   - Error Propagation

3. **Environment Mocking**

   - Production/Development unterscheiden
   - Console Logging testen
   - Cleanup nach Tests

4. **HTTP Testing**

   - Verschiedene Request-Typen
   - Status Codes
   - Error Details erhalten

5. **RxJS Testing**
   - of() für Success
   - throwError() für Errors
   - Subscribe-Pattern mit done()

### Test-Coverage

| Feature           | Getestet | Tests  |
| ----------------- | -------- | ------ |
| Success Handling  | ✅       | 1      |
| Client Errors     | ✅       | 3      |
| Server Errors     | ✅       | 6      |
| Error Propagation | ✅       | 2      |
| Unknown Errors    | ✅       | 1      |
| HTTP Methods      | ✅       | 3      |
| **TOTAL**         | **✅**   | **16** |

---

**Stand:** 15. Dezember 2025
**Tests:** 16/16 ✅
**Interceptor:** http-error.interceptor.ts
**Teil von:** 151 gesamt Tests im Projekt
