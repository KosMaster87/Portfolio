# Core Services

Zentrale Services für das gesamte Portfolio.

## Übersicht

### NavigationService

**Pfad**: `services/navigation.service.ts`
**Zweck**: Verwaltung der Navigation und aktiven Route

**Features**:

- Aktive Route Tracking
- Navigation State Management

**Tests**: ✅

---

### PortfolioDataService

**Pfad**: `services/portfolio-data.service.ts`
**Zweck**: Zentrale Datenverwaltung für Portfolio-Inhalte

**Features**:

- Projekt-Daten
- Skills-Daten
- Content Management

**Tests**: ✅

---

### ScrollService

**Pfad**: `services/scroll.service.ts`
**Zweck**: Scroll-Position Tracking und Management

**Features**:

- Scroll-Event Handling
- Position Tracking
- Scroll-to-Element

**Tests**: ✅

---

### SeoService

**Pfad**: `services/seo.service.ts`
**Zweck**: SEO Metadata Management (Title, Meta-Tags)

**Features**:

- Dynamic Title Updates
- Meta Description
- Open Graph Tags
- Structured Data

**API**:

```typescript
setMetadata(config: {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}): void
```

**Tests**: ✅

**Verwendung**:

```typescript
constructor(private seo: SeoService) {}

ngOnInit() {
  this.seo.setMetadata({
    title: 'About Me',
    description: 'Learn more about my work',
    keywords: 'portfolio, developer, angular'
  });
}
```

---

### SmoothScrollService

**Pfad**: `services/smooth-scroll.service.ts`
**Zweck**: Smooth-Scroll Animationen

**Features**:

- Smooth scroll to element
- Custom easing
- Duration control

**API**:

```typescript
scrollElementToTop(element: HTMLElement, offset?: number): void
scrollToTop(): void
```

**Tests**: ✅

---

### SwUpdateService

**Pfad**: `services/sw-update.service.ts`
**Zweck**: Service Worker Update Management (PWA)

**Features**:

- Update Detection
- User Notification
- Auto-activate Updates

**Signals**:

- `showUpdateNotification: Signal<boolean>`
- `updateMessage: Signal<string>`

**API**:

```typescript
initialize(): void
dismissUpdate(): void
activateUpdate(): void
```

**Tests**: ✅

**Verwendung**:

```typescript
@if (swUpdate.showUpdateNotification()) {
  <div class="update-banner">
    {{ swUpdate.updateMessage() }}
    <button (click)="swUpdate.activateUpdate()">Update</button>
    <button (click)="swUpdate.dismissUpdate()">Dismiss</button>
  </div>
}
```

---

### ThemeService

**Pfad**: `services/theme.service.ts`
**Zweck**: Theme Management (Light/Dark/Auto Mode)

**Features**:

- System Preference Detection
- Theme Persistence (LocalStorage)
- Theme Signals

**Signals**:

- `activeTheme: Signal<'light' | 'dark' | 'auto'>`
- `effectiveTheme: Signal<'light' | 'dark'>`

**API**:

```typescript
setTheme(theme: 'light' | 'dark' | 'auto'): void
getTheme(): 'light' | 'dark' | 'auto'
```

**Tests**: ✅

---

### TranslationService

**Pfad**: `services/translation.service.ts`
**Zweck**: i18n - Internationalization (EN/DE)

**Features**:

- Language Switching
- Translation Loading
- Language Persistence

**Signals**:

- `currentLang: Signal<string>`
- `isLoaded: Signal<boolean>`

**API**:

```typescript
setLanguage(lang: 'en' | 'de'): void
instant(key: string): string
get(key: string): Observable<string>
```

**Tests**: ✅

**Verwendung**:

```typescript
// Im Template
{
  {
    translationService.instant('home.hero.title');
  }
}

// In Component
title = computed(() => this.translationService.instant('home.hero.title'));
```

---

## Interceptors

### HttpErrorInterceptor

**Pfad**: `interceptors/http-error.interceptor.ts`
**Zweck**: Globales HTTP Error Handling

**Features**:

- Catch HTTP Errors
- Error Logging
- User Notification

**Tests**: 16 ✅

---

## Directives

### IconHoverDirective

**Pfad**: `directives/icon-hover.directive.ts`
**Zweck**: Hover-Effekte für Icons

**Tests**: ✅

---

### NoScrollDirective

**Pfad**: `directives/no-scroll.directive.ts`
**Zweck**: Verhindert Scrollen (z.B. bei offenen Modals)

**Tests**: ✅

---

## Testing

Alle Core Services haben vollständige Unit Tests:

- **Services**: 135 Tests ✅
- **Interceptors**: 16 Tests ✅
- **Directives**: 22 Tests ✅
- **Total**: 173 Tests ✅

Tests ausführen:

```bash
# Alle Core Tests
npm test -- --include='**/core/**/*.spec.ts'

# Nur Services
npm test -- --include='**/services/*.spec.ts'

# Einzelner Service
npm test -- --include='**/theme.service.spec.ts'
```

---

## Dependency Injection

Alle Services sind `providedIn: 'root'` und als Singleton verfügbar.

```typescript
import { inject } from '@angular/core';
import { ThemeService } from './core/services';

export class MyComponent {
  private theme = inject(ThemeService);
}
```

---

## Best Practices

1. **Signal-basiert**: Alle Services nutzen Signals statt Subjects
2. **Immutable**: State-Updates nur über Service-Methods
3. **Type-safe**: Vollständige TypeScript-Typisierung
4. **Testbar**: Alle Services sind leicht zu mocken
5. **Singleton**: Ein Service-Instanz pro App

---

**Letzte Aktualisierung**: 15.12.2025
