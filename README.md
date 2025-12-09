# 💼 Personal Portfolio – Angular SPA

[![Angular](https://img.shields.io/badge/Angular-20.3.9-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A fully responsive, modern portfolio website built as a Single Page Application (SPA) to showcase my skills, projects, and professional experience. Designed with a mobile-first approach and optimized for recruiters and hiring managers.

---

## 🚀 Live Demo

🔗 **[portfolio.dev2k.org](https://portfolio.dev2k.org)**

---

## 📸 Preview

![Portfolio Screenshot](./src/assets/images/preview-portfolio.png)

---

## ✨ Features

- 🎨 **Modern Design** – Clean, professional UI with smooth animations
- 📱 **Fully Responsive** – Optimized for mobile, tablet, and desktop
- 🌐 **Internationalization (i18n)** – Multi-language support (EN/DE)
- 📧 **Contact Form** – Integrated PHP backend with email notifications
- 🔒 **Security Features** – Rate limiting, XSS protection, CORS configuration
- ⚡ **Performance** – Optimized bundle size with lazy loading
- 🎯 **SEO Friendly** – Semantic HTML and meta tags
- 🎭 **Smooth Animations** – Custom CSS animations and transitions
- 📊 **Project Showcase** – Dynamic project cards with live demos
- 🔄 **SPA Navigation** – Client-side routing with Angular Router

---

## 🛠️ Tech Stack

### Frontend

- **Angular 20.3.9** – Progressive web framework
- **TypeScript 5.9.3** – Type-safe JavaScript
- **SCSS** – Advanced CSS with variables and mixins
- **RxJS** – Reactive programming
- **ngx-translate** – Internationalization

### Backend (Contact API)

- **PHP 8+** – Contact form handler
- **Apache** – Web server with `.htaccess` configuration

### Tools & Development

- **Angular CLI** – Project scaffolding and build
- **Karma & Jasmine** – Testing framework
- **Git** – Version control
- **Figma** – Design prototyping

---

## 📁 Project Structure

```
Portfolio/
├── public/                          # Static assets & API
│   ├── assets/
│   │   ├── fonts/                   # Custom fonts (Lexend, Overpass, Syne)
│   │   ├── i18n/                    # Translation files (de.json, en.json)
│   │   ├── images/                  # Images and project screenshots
│   │   ├── vector/                  # SVG icons and graphics
│   │   └── styles/                  # Font SCSS imports
│   ├── api/
│   │   └── contact/                 # PHP contact form API
│   │       ├── contact.php          # Production endpoint (not in Git)
│   │       ├── contact.example.php  # Template file
│   │       └── README.md            # API setup guide
│   ├── .htaccess                    # Apache configuration
│   └── media/                       # Screenshots & previews
├── src/
│   ├── app/
│   │   ├── future-modul/            # Shared components & directives
│   │   │   ├── components/          # Reusable UI components
│   │   │   ├── directives/          # Custom directives
│   │   │   └── pipes/               # Custom pipes
│   │   ├── homeprovide/             # Main content sections
│   │   │   ├── hero/                # Hero section
│   │   │   ├── about/               # About me section
│   │   │   ├── skills/              # Skills showcase
│   │   │   ├── portfolio/           # Projects portfolio
│   │   │   └── contact/             # Contact form
│   │   ├── pages/                   # Static pages
│   │   │   ├── imprint/             # Legal imprint
│   │   │   └── not-found/           # 404 page
│   │   ├── shared/                  # Shared services & components
│   │   │   ├── components/          # Header, Footer
│   │   │   ├── services/            # Business logic services
│   │   │   └── styles/              # Shared SCSS
│   │   ├── models/                  # TypeScript interfaces
│   │   ├── app.component.ts         # Root component
│   │   ├── app.config.ts            # App configuration
│   │   └── app.routes.ts            # Route definitions
│   ├── index.html                   # HTML entry point
│   ├── main.ts                      # Application bootstrap
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular workspace config
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.x
- **Angular CLI** >= 20.x

```bash
# Install Angular CLI globally
npm install -g @angular/cli@20
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/KosMaster87/Portfolio.git
cd Portfolio
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Contact API (Optional)

If you want to use the contact form:

```bash
cd public/api/contact
cp contact.example.php contact.php
```

Edit `contact.php` and replace:

- `https://your-domain.com` with your actual domain
- `your-email@example.com` with your email address

See `public/api/contact/README.md` for detailed setup.

### 4. Start development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload when you change source files.

---

## 🎯 Available Scripts

| Command                       | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| `npm start`                   | Start development server on `http://localhost:4200` |
| `npm run build`               | Build project for production to `dist/` folder      |
| `npm run watch`               | Build in watch mode for development                 |
| `npm test`                    | Run unit tests via Karma                            |
| `npm run serve:ssr:portfolio` | Serve SSR version (if configured)                   |

---

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Output will be in dist/portfolio/
```

The build artifacts will be stored in the `dist/portfolio/` directory, ready for deployment.

### Build Optimization Features:

- ✅ Minification & compression
- ✅ Tree shaking for smaller bundles
- ✅ Lazy loading for routes
- ✅ AOT (Ahead-of-Time) compilation
- ✅ Cache busting with content hashes

---

## 🚀 Deployment

### Deploy to Apache Server

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload `dist/portfolio/` contents to your web server

3. Ensure `.htaccess` is in the root for SPA routing:

   ```apache
   # Already included in public/.htaccess
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_URI} !^/api/
   RewriteRule . /index.html [L]
   ```

4. Setup PHP contact API (see `public/api/contact/README.md`)

### Other Hosting Options

<details>
<summary><strong>GitHub Pages</strong></summary>

```bash
ng build --base-href "/Portfolio/"
# Then push dist/ to gh-pages branch
```

</details>

<details>
<summary><strong>Netlify / Vercel</strong></summary>

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist/portfolio`
4. Add `_redirects` file for SPA routing:
   ```
   /*    /index.html   200
   ```
   </details>

---

## 🌐 Internationalization (i18n)

The portfolio supports multiple languages using `ngx-translate`.

### Available Languages:

- 🇬🇧 English (`en`)
- 🇩🇪 German (`de`)

### Translation Files:

- `public/assets/i18n/en.json`
- `public/assets/i18n/de.json`

### Adding a New Language:

1. Create new JSON file in `public/assets/i18n/`
2. Add language selector logic in header component
3. Update `TranslateService` configuration

---

## 📧 Contact Form Features

The integrated contact form includes:

- ✅ **Rate Limiting** – 3 requests per hour per IP
- ✅ **Email Validation** – Server-side validation
- ✅ **Spam Protection** – Honeypot field
- ✅ **HTML Email Templates** – Professional email design
- ✅ **Auto-Response** – Confirmation email to sender
- ✅ **Logging** – Request logging for debugging
- ✅ **Security Headers** – XSS, CSRF protection

See `public/api/contact/README.md` for complete documentation.

---

## 🎨 Customization

### Colors & Theme

Edit global variables in `src/styles.scss`:

```scss
$primary-color: #00bc8f;
$secondary-color: #5988ff;
$accent-color: #ff6b6b;
```

### Fonts

The portfolio uses custom fonts from `public/assets/fonts/`:

- **Lexend** – Body text
- **Overpass** – Headers
- **Syne** – Accent text

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --code-coverage
```

---

## 📝 Project Highlights

### Key Components:

- **Hero Section** – Animated introduction with call-to-action
- **About Me** – Professional background and skills
- **Skills Grid** – Interactive technology showcase
- **Portfolio Projects** – Filterable project cards with live demos
- **Contact Form** – Fully functional with backend integration

### Notable Features:

- Custom directives for hover effects and highlighting
- Scroll-to-section navigation
- Responsive hamburger menu
- Form validation with custom validators
- Error handling with user-friendly notifications

---

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Konstantin Aksenov**

- 🌐 Portfolio: [portfolio.dev2k.org](https://portfolio.dev2k.org)
- 💼 LinkedIn: [LinkedIn](https://www.linkedin.com/in/konstantin-aksenov-802b88190/)
- 🐙 GitHub: [@KosMaster87](https://github.com/KosMaster87)
- 📧 Email: konstantin.aksenov@dev2k.org

---

## � Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from custom SVG collection
- Fonts from Google Fonts
- Community feedback and support

---

<div align="center">
  <strong>⭐ If you like this project, please give it a star! ⭐</strong>
</div>

---

**Last Updated:** Dezember 2025
