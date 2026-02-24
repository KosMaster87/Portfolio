# 🚀 Deployment Setup - IONOS via GitHub Actions

## 📋 Overview

This project uses **GitHub Actions** for automatic deployment to IONOS. On every push to `main`:

1. ✅ Code is tested (823 tests)
2. 📊 Coverage report is generated
3. 📚 JSDoc documentation is created
4. 🏗️ Production build is created
5. 📤 Everything is deployed to IONOS via FTP

---

## 🔧 Setup (One-Time)

### 1. Configure GitHub Secrets

Go to: **GitHub Repo → Settings → Secrets and variables → Actions**

Click **"New repository secret"** and add the following secrets:

| Name           | Value                       | Description                                 |
| -------------- | --------------------------- | ------------------------------------------- |
| `FTP_HOST`     | `ftp.your-server.ionos.com` | IONOS FTP Host (see IONOS webspace details) |
| `FTP_USERNAME` | `p123456789`                | Your IONOS FTP username                     |
| `FTP_PASSWORD` | `your-password`             | Your IONOS FTP password                     |

**Finding IONOS FTP credentials:**

1. Login to [ionos.com](https://www.ionos.com)
2. Webhosting & Domains → Webspace & Domains
3. Your Webspace → FTP credentials

---

### 2. IONOS Webspace Structure

After deployment, the following structure is created:

```
/                          # Root directory of your webspace
├── index.html             # Portfolio App
├── assets/
├── *.js, *.css            # App files
├── .htaccess              # Apache configuration (auto-generated)
├── coverage/              # 📊 Coverage Report
│   └── index.html
└── jsdoc/                 # 📚 API Documentation
    └── index.html
```

**URLs:**

- 🌐 App: `https://portfolio.dev2k.org`
- 📊 Coverage: `https://portfolio.dev2k.org/coverage/index.html`
- 📚 Docs: `https://portfolio.dev2k.org/jsdoc/index.html`

---

## 🎯 Usage

### Automatic Deployment

Simply push your changes:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Actions starts automatically and deploys to IONOS.

---

### Manual Deployment

Trigger the workflow manually:

1. GitHub Repo → **Actions**
2. Select workflow **"Build, Test & Deploy to IONOS"**
3. **"Run workflow"** → Choose branch → **"Run workflow"**

---

### Local Testing (without Deployment)

```bash
# Tests with coverage
npm run test:ci

# Generate JSDoc
npm run docs

# View JSDoc locally
npm run docs:serve
# Open: http://localhost:8081

# Production build
npm run build

# Everything together (without deploy)
npm run deploy:prepare
```

---

## 📊 GitHub Actions Workflow

File: [`../../.github/workflows/deploy.yml`](../workflows/deploy.yml)

The pipeline runs on:

- ✅ Push to `main` branch → **Deployed to IONOS**
- ✅ Pull Requests → **Tests only, no deploy**
- ✅ Manually via **"workflow_dispatch"**

### Pipeline Steps:

```yaml
1. Checkout Code
2. Setup Node.js 20
3. Install Dependencies (npm ci)
4. Run Tests + Coverage
5. Generate JSDoc
6. Build Production App
7. Prepare Deployment Structure
8. Deploy to IONOS (only on main push)
```

---

## 🔍 Monitoring & Logs

### View GitHub Actions Logs

1. GitHub Repo → **Actions**
2. Click on latest workflow run
3. Expand the steps to see details

### Deployment Status

In the workflow log you'll see:

```
✅ Deployment successful!
🌐 App: https://portfolio.dev2k.org
📊 Coverage: https://portfolio.dev2k.org/coverage/index.html
📚 Docs: https://portfolio.dev2k.org/jsdoc/
```

---

## 🐛 Troubleshooting

### FTP Connection Failed

**Error:** `Failed to connect to FTP server`

**Solutions:**

1. **Check secrets**: Are `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD` correct?
2. **FTP enabled**: In IONOS → Webspace → Is FTP enabled?
3. **Passive Mode**: IONOS uses Passive FTP (automatically used)

---

### Tests Failing

**Error:** `npm test failed`

**Solution:**

```bash
# Test locally
npm test

# Check coverage
npm run test:ci
```

Only push after tests are green!

---

### Build Error

**Error:** `Build failed`

**Solution:**

```bash
# Build locally
npm run build

# Production build
npm run build -- --configuration production
```

---

### Deployment Successful, but Site Shows 404

**Causes:**

1. **Wrong directory**: Check `server-dir` in `deploy.yml`
2. **.htaccess missing**: Auto-generated, check Apache module
3. **Cache**: Clear browser cache (Ctrl+Shift+R)

---

## 🔒 Security

### .htaccess Features

The auto-generated `.htaccess` includes:

```apache
# Angular SPA Routing (all requests → index.html)
# EXCEPT /coverage and /jsdoc

# Security Headers
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

# Compression (gzip)
# Cache Control
```

### Secrets Security

- ✅ Secrets are **NEVER** exposed in logs
- ✅ Only `main` branch is deployed
- ✅ Pull requests have no FTP access

---

## 📝 Customize Workflow

File: [`../../.github/workflows/deploy.yml`](../workflows/deploy.yml)

### Different Deployment Directory

If your IONOS webspace has a different root directory:

```yaml
server-dir: /html/          # Instead of /
# or
server-dir: /public_html/
```

### Deploy Only Specific Branches

```yaml
on:
  push:
    branches: [main, production] # Multiple branches
```

### Deployment Schedule (Cron)

```yaml
on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
```

---

## ✅ Checklist - Ready to Go?

- [ ] GitHub Secrets set (`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`)
- [ ] JSDoc dependencies installed (`npm install`)
- [ ] Workflow file committed ([`../../.github/workflows/deploy.yml`](../workflows/deploy.yml))
- [ ] IONOS FTP access tested
- [ ] Domain `portfolio.dev2k.org` points to IONOS webspace
- [ ] SSL certificate active (IONOS → SSL Manager)

---

## 🎉 Done!

After the first push to `main`:

1. GitHub Actions runs (approx. 3-5 minutes)
2. All files are uploaded to IONOS
3. Portfolio is live! 🚀

**Check:**

- ✅ `https://portfolio.dev2k.org`
- ✅ `https://portfolio.dev2k.org/coverage/index.html`
- ✅ `https://portfolio.dev2k.org/jsdoc/index.html`

---

**Questions?** Check GitHub Actions Logs or [TEAM-GUIDE.md](./TEAM-GUIDE.md)
