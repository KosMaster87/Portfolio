# Feature Components

Feature-specific components organized by functionality.

## Home Features

### Hero Section

**Path**: `src/app/features/home/components/hero-section/hero-section.component.ts`
**Purpose**: Landing hero with title and CTA

**Features**:

- Animated title
- CTA button
- Scroll indicator

**Tests**: ✅

---

### About Section

**Path**: `src/app/features/home/components/about-section/about-section.component.ts`
**Purpose**: "About me" section

**Features**:

- Profile image
- Bio text
- i18n support

**Tests**: ✅

---

### Skills Section

**Path**: `src/app/features/home/components/skills-section/skills-section.component.ts`
**Purpose**: Skills/Technologies overview

**Features**:

- Skill categories
- Icons/Logos
- Progress indicators (optional)

**Tests**: ✅

---

### Projects Section

**Path**: `src/app/features/home/components/projects-section/projects-section.component.ts`
**Purpose**: Project overview (teaser)

**Features**:

- Featured projects
- Link to detail page
- Lazy loading (`@defer`)

**Tests**: ✅

**Template pattern**:

```typescript
@defer (on viewport) {
  <app-project-card
    *ngFor="let project of projects()"
    [project]="project" />
} @placeholder {
  <div class="skeleton">Loading...</div>
}
```

---

### Contact Section

**Path**: `src/app/features/home/components/contact-section/contact-section.component.ts`
**Purpose**: Contact form

**Features**:

- Reactive form (FormBuilder)
- Validation (Email, Required)
- HTTP POSTto PHP backend
- Success/Error notification
- Privacy checkbox

**Tests**: 33 ✅

- Form validation
- HTTP requests
- Error handling
- Privacy checkbox
- Rate limiting

**Form schema**:

```typescript
form = FormBuilder.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  message: ['', Validators.required],
  privacy: [false, Validators.requiredTrue],
});
```

---

## Project Features

### Project Card

**Path**: `src/app/features/projects/components/project-card/project-card.component.ts`
**Purpose**: Individual project card

**Features**:

- Project image
- Title & description
- Tech stack tags
- Links (demo, GitHub)
- Hover effects

**Inputs**:

```typescript
@Input() project: Project;
```

**Tests**: ✅

---

## Page Components

### HomePage

**Path**: `src/app/features/home/pages/home-page/home-page.component.ts`
**Purpose**: Landing page container

**Features**:

- SEO metadata
- Scroll management
- Section composition

**Sections**:

- Hero
- About
- Skills
- Projects
- Contact

**Tests**: 15 ✅

---

### NotFoundPage (404)

**Path**: `src/app/shared/pages/not-found-page/not-found-page.component.ts`
**Purpose**: 404 error page

**Features**:

- Error message
- Back navigation
- Search suggestion (optional)
- SEO (noindex)

**Tests**: 17 ✅

---

## Legal Pages

### ImprintPage

**Path**: `src/app/features/legal/pages/imprint-page/imprint-page.component.ts`
**Purpose**: Imprint (German legal requirement)

**Tests**: 13 ✅

---

### PrivacyPolicyPage

**Path**: `src/app/features/legal/pages/privacy-policy-page/privacy-policy-page.component.ts`
**Purpose**: Privacy policy (GDPR)

**Features**:

- Last updated date
- Cookie policy
- Data processing information

**Tests**: 14 ✅

---

### SourcesPage

**Path**: `src/app/features/legal/pages/sources-page/sources-page.component.ts`
**Purpose**: Image sources & attributions

**Tests**: 13 ✅

---

## Testing

Feature component tests:

- **Home components**: ~50 tests ✅
- **Project components**: ~15 tests ✅
- **Pages**: 72 tests ✅
- **Total**: ~137 tests ✅

Run tests:

```bash
# All feature tests
npm test -- --include='**/features/**/*.spec.ts'

# Only home features
npm test -- --include='**/features/home/**/*.spec.ts'
```

---

**Last Update**: December 15, 2025
