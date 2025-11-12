# Separator Component

A reusable separator line component with gradient effect.

## Features

- ✅ Gradient effect from transparent to color to transparent
- ✅ Customizable spacing, opacity, and color
- ✅ Fully responsive
- ✅ Easy to use

## Usage

### Basic Usage

```html
<app-separator></app-separator>
```

### Custom Spacing

```html
<!-- Default spacing: 1rem -->
<app-separator spacing="2rem"></app-separator>
<app-separator spacing="0.5rem"></app-separator>
```

### Custom Opacity

```html
<!-- Default opacity: 0.6 -->
<app-separator [opacity]="0.8"></app-separator>
<app-separator [opacity]="0.3"></app-separator>
```

### Custom Color

```html
<!-- Default color: #ccc -->
<app-separator color="#00BC8F"></app-separator>
<app-separator color="var(--primeColor-dark)"></app-separator>
```

### Combined Options

```html
<app-separator spacing="2rem" [opacity]="0.8" color="#5988FF"> </app-separator>
```

## Properties

| Property  | Type     | Default  | Description                         |
| --------- | -------- | -------- | ----------------------------------- |
| `spacing` | `string` | `'1rem'` | Bottom spacing from the separator   |
| `opacity` | `number` | `0.6`    | Opacity of the separator line (0-1) |
| `color`   | `string` | `'#ccc'` | Color of the separator              |

## Examples

### Between Sections

```html
<section class="about">
  <!-- Content -->
</section>

<app-separator spacing="3rem"></app-separator>

<section class="skills">
  <!-- Content -->
</section>
```

### In Cards

```html
<div class="card">
  <h3>Title</h3>
  <app-separator spacing="1rem" [opacity]="0.4"></app-separator>
  <p>Content...</p>
</div>
```

### Themed Separators

```html
<!-- Primary theme -->
<app-separator color="var(--primeColor-secundario)" [opacity]="0.7"></app-separator>

<!-- Dark theme -->
<app-separator color="var(--primeColor-dark)" [opacity]="0.5"></app-separator>
```

## Import

The separator is already exported in `SharedModule`:

```typescript
import { SharedModule } from './future-modul/shared.module';

@Component({
  imports: [SharedModule]
})
```
