# Portfolio - Angular SPA

Personal portfolio website of Konstantin Aksenov, Dev2K Software.

## Goal

The site presents skills, projects and career history to recruiters and potential
clients - as a single-page application, mobile-first, bilingual (DE/EN).

Primary domain: `https://portfolio.dev2ksoftware.com`

## Preview

![Portfolio Screenshot](./src/assets/images/preview-portfolio.png)

## Tech Stack

| Layer     | Technology                                               |
| --------- | -------------------------------------------------------- |
| Framework | Angular 21 SPA, standalone components, signals, zoneless |
| Styling   | SCSS                                                     |
| i18n      | Local JSON translations in `public/i18n/`                |
| PWA       | Angular Service Worker with light/dark manifest          |
| Testing   | Jasmine + Karma via the Angular test builder             |
| Backend   | PHP-FPM (contact form), dedicated container              |
| CI/CD     | GitHub Actions                                           |
| Hosting   | Self-hosted on Unraid via Cloudflare Tunnel and NPMplus  |
| Domain    | `portfolio.dev2ksoftware.com`                            |

## Sections

| Section  | Purpose                                        |
| -------- | ---------------------------------------------- |
| Hero     | Name, role, contact CTA                        |
| About    | Short introduction, Dev2K Software, tech stack |
| Skills   | Technology icons by category                   |
| Projects | Project cards with live demo links             |
| Contact  | Contact form + direct mail                     |
| Legal    | Imprint, privacy policy, sources               |

## Development

```bash
cd portfolio
npm ci
npm start
```

The app then runs on `http://localhost:4200`.

## Checks

```bash
npm run test:ci        # Headless tests with coverage
npm run build           # Production build
npm run docs             # TypeDoc API documentation
npm run deploy:prepare  # Build + tests + docs in sequence
```

`npm run test:ci` expects Chromium at `/usr/bin/chromium-browser`.

## Git-Flow

`main → staging → dev → feature/*`, GitHub ruleset on all three main branches
(PR required, no force push). Dependency updates run via Renovate
(`renovate.json`) - patch/pin/digest automatically, minor/major and `@angular/*`
wait for approval.

## Deployment Target

```text
GitHub Actions (main / staging push)
  -> cloudflared access ssh (Cloudflare Access, Service Token)
  -> Tunnel `unraid-tower`
  -> sshd on the Tower host, enforced rsync script
  -> /mnt/nvme/appdata/static-sites/www/portfolio(-staging)/
  -> static-sites nginx container
       -> static files directly
       -> /api/contact/contact.php via fastcgi_pass -> portfolio-php (PHP-FPM)
```

Full architecture docs: [`docs/manual/`](./docs/manual/) and
`dev2k-wiki/projekte/portfolio-architektur.md`.

## Developer

Konstantin Aksenov
Dev2K Software
