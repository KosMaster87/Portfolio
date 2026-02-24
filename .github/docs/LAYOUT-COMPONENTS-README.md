# Layout Components

Persistent layout components for the portfolio.

## Overview

### HeaderComponent

**Path**: `src/app/layout/header/header.component.ts`
**Purpose**: Top navigation bar

**Features**:

- Logo/Branding
- Navigation menu
- Language switcher
- Theme switcher
- Mobile menu (hamburger)
- Scroll detection (transparent → solid)

**Dependencies**:

- NavigationService
- ThemeService
- TranslationService

**Tests**: 40 ✅

- Desktop navigation
- Mobile menu toggle
- Theme integration
- Language integration
- Scroll behavior
- Accessibility

**Structure**:

```html
<header>
  <div class="logo">...</div>
  <nav class="desktop-nav">...</nav>
  <div class="actions">
    <app-language-switcher />
    <app-theme-switcher />
  </div>
  <button class="mobile-menu-toggle">...</button>
</header>
```

---

### FooterComponent

**Path**: `src/app/layout/footer/footer.component.ts`
**Purpose**: Footer with links and social media

**Features**:

- Social media links
- Legal links (imprint, privacy)
- Copyright notice
- Attribution (sources)

**Dependencies**:

- TranslationService

**Tests**: 40 ✅

- Link rendering
- i18n integration
- Social media icons
- Legal links
- Accessibility

**Structure**:

```html
<footer>
  <div class="social-links">...</div>
  <nav class="legal-links">
    <a routerLink="/imprint">Imprint</a>
    <a routerLink="/privacy">Privacy</a>
    <a routerLink="/sources">Sources</a>
  </nav>
  <p class="copyright">...</p>
</footer>
```

---

## Testing

All layout components have complete tests:

- **Total Tests**: 80 ✅
- **Coverage**: >95%

Run tests:

```bash
npm test -- --include='**/layout/**/*.spec.ts'
```

---

## Development Guidelines

### Best Practices

- **Responsive design**: Mobile-first approach
- **Accessibility**: WCAG compliant
- **Performance**: Lazy load mobile menu
- **Theme aware**: Integrate with ThemeService
- **i18n**: Use TranslationService for all text

---

**Last Update**: December 15, 2025
