# Shared Components

These components are reusable UI elements for the entire portfolio.

## Overview

### Button Components

#### CtaButton

**Path**: `src/app/shared/components/buttons/cta-button/cta-button.ts`
**Purpose**: Call-to-Action button with smooth-scroll functionality

**Properties**:

- `btnContentText` (Input): Button text
- `clicked` (Output): Click event
- Integrated smooth-scroll on focus

**Tests**: 19 ✅

- Rendering & content
- Input/Output bindings
- SmoothScroll integration
- Focus behavior

**Usage**:

```html
<app-cta-button [btnContentText]="'Get Started'" (clicked)="handleClick()"> </app-cta-button>
```

---

#### IconButton

**Path**: `src/app/shared/components/buttons/icon-button/icon-button.ts`
**Purpose**: Themed icon button (e.g., for arrows, icons)

**Properties**:

- `ariaLabel` (Input): Accessibility label
- `type` (Input): Button type (button/submit)
- `clicked` (Output): Click event
- `isDark` (Computed): Theme-based
- Theme-aware image switching

**Tests**: 19 ✅

- Theme switching (Light/Dark/Auto)
- Accessibility (ARIA)
- Click handling

**Usage**:

```html
<app-icon-button ariaLabel="Next slide" (clicked)="nextSlide()"> </app-icon-button>
```

---

#### NavButton

**Path**: `src/app/shared/components/buttons/nav-button/nav-button.component.ts`
**Purpose**: Navigation button with RouterLink

**Tests**: 19 ✅

---

#### ProjectButton

**Path**: `src/app/shared/components/buttons/project-button/project-button.component.ts`
**Purpose**: Button for project links

---

#### ScrollArrow

**Path**: `src/app/shared/components/buttons/scroll-arrow/scroll-arrow.component.ts`
**Purpose**: Scroll-to-top/bottom arrow button

---

#### SubmitButton

**Path**: `src/app/shared/components/buttons/submit-button/submit-button.ts`
**Purpose**: Form submit button with disabled state

**Properties**:

- `label` (Input): Button text
- `type` (Input): submit/button
- `disabled` (Input): Disabled state
- `clicked` (Output): Click event

**Tests**: 19 ✅

- Disabled state handling
- Form integration
- Click event

**Usage**:

```html
<app-submit-button
  [label]="'Send'"
  [type]="'submit'"
  [disabled]="form.invalid"
  (clicked)="onSubmit()"
>
</app-submit-button>
```

---

### UI Components

#### DecorativeBorder

**Path**: `src/app/shared/components/decorative-border/decorative-border.component.ts`
**Purpose**: Decorative border component

**Tests**: ✅

---

#### LanguageSwitcher

**Path**: `src/app/shared/components/language-switcher/language-switcher.component.ts`
**Purpose**: Language switcher between EN/DE

**Features**:

- TranslationService integration
- Keyboard navigation
- Accessibility

**Tests**: ✅

---

#### LinearGradient

**Path**: `src/app/shared/components/linear-gradient/linear-gradient.component.ts`
**Purpose**: Gradient background component

**Tests**: ✅

---

#### Separator

**Path**: `src/app/shared/components/separator/separator.component.ts`
**Purpose**: Visual separators between sections

**Tests**: ✅

---

#### ThemeSwitcher

**Path**: `src/app/shared/components/theme-switcher/theme-switcher.component.ts`
**Purpose**: Theme switcher (Light/Dark/Auto)

**Features**:

- ThemeService integration
- System preference detection
- Accessibility

**Tests**: ✅

---

### Notification Component

**Path**: `src/app/shared/components/notification/notification.ts`
**Purpose**: Toast notification system

**Features**:

- Auto-dismiss with timer
- Type-based (success/error/info/warning)
- Animation
- Accessibility (ARIA live regions)

**Tests**: 51 ✅

- Lifecycle management
- Auto-dismiss functionality
- User interactions
- Edge cases

**Usage**:

```html
<app-notification
  [show]="showNotification"
  [message]="notificationMessage"
  [type]="'success'"
  [duration]="3000"
  (closed)="onNotificationClosed()"
>
</app-notification>
```

---

## Testing

All shared components have complete unit tests:

- **Total Tests**: 177 ✅
- **Coverage**: >95%

Run tests:

```bash
npm test -- --include='**/shared/**/*.spec.ts'
```

---

## Development Guidelines

### Adding New Shared Components

1. Create component in appropriate subfolder
2. Export in `shared/index.ts`
3. Create `*.spec.ts` test file
4. Document in this README

### Best Practices

- **Standalone components**: All shared components are standalone
- **Signal-based**: Use signals for reactive state
- **Accessibility**: Always include ARIA labels & keyboard navigation
- **Theme-aware**: Use ThemeService where needed
- **Testable**: Isolate logic, mock dependencies

---

**Last Update**: December 15, 2025
