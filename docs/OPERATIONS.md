# OPERATIONS.md - AICostPlanner Operations Guide

## Overview

This document covers operational procedures for AICostPlanner.

## Site Architecture

### Technology Stack
- **Framework:** Astro 4.x (static site generator)
- **Hosting:** Static hosting (Vercel/Cloudflare Pages/Netlify)
- **Domain:** aicostplanner.com
- **No backend, database, or dynamic content**

### Directory Structure

```
aicostplanner/
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── llms.txt
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Breadcrumb.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── Layout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── index.astro (homepage)
│   │   ├── claude-code-token-cost.astro
│   │   ├── openrouter-credits.astro
│   │   ├── video-generation-api-pricing.astro
│   │   └── [14 scaffold pages]
│   └── styles/
│       └── global.css
├── docs/
│   ├── PROJECT_MEMORY.md
│   ├── RELEASE_GATE.md
│   ├── HISTORICAL_INCIDENTS.md
│   ├── SEO_GEO_RULES.md
│   ├── CONTENT_ROADMAP.md
│   └── OPERATIONS.md
├── scripts/
│   └── [validator scripts]
├── package.json
├── astro.config.mjs
└── tsconfig.json
```

## Deployment Procedures

### Pre-Deployment Checklist

1. Run validators:
   ```bash
   npm run verify
   ```

2. Build locally:
   ```bash
   npm run build
   ```

3. Preview locally:
   ```bash
   npm run preview
   ```

4. Check for any console errors

5. Commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### Deployment Options

#### Option 1: Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Option 2: Cloudflare Pages
1. Connect repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`

#### Option 3: Netlify
1. Connect repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## Monitoring

### Uptime Monitoring
- Set up uptime monitoring for aicostplanner.com
- Monitor key pages (homepage, full pages)

### Error Monitoring
- Check for 404 errors in hosting dashboard
- Monitor for crawl errors in GSC

### Performance Monitoring
- Monitor Core Web Vitals
- Check PageSpeed Insights scores

## Maintenance

### Regular Tasks

1. **Weekly**
   - Check for 404 errors
   - Monitor uptime
   - Review any new validator issues

2. **Monthly**
   - Review sitemap.xml (auto-updates on build)
   - Check for broken links
   - Update last modified dates on pages
   - Review SEO performance

3. **Quarterly**
   - Full content audit
   - Review and update pricing disclaimers
   - Expand scaffold pages per roadmap
   - Review competitor landscape

### Content Updates

When adding new pages:
1. Create the page file in `src/pages/`
2. Update `sitemap.xml`
3. Update `llms.txt`
4. Update `docs/CONTENT_ROADMAP.md`
5. Run validators
6. Deploy

### Validator Maintenance

If adding new pages:
- Ensure page has unique title/meta/H1
- Ensure page has AI Summary
- Ensure page has FAQ
- Ensure page has CTA
- Add page to sitemap.xml
- Add page to llms.txt

## Troubleshooting

### Build Failures

1. Check Node.js version (requires Node 18+)
2. Run `npm install` again
3. Check for syntax errors in Astro files
4. Clear cache: `rm -rf node_modules .astro`

### Validator Failures

1. Run individual validators to isolate issue:
   ```bash
   npm run validate:content
   npm run validate:claims
   npm run validate:links
   ```

2. Check for:
   - Duplicate titles/meta
   - Banned claims
   - Incorrect CTA URLs
   - Missing required elements

### Deployment Failures

1. Check build succeeds locally
2. Verify build output in `dist/`
3. Check hosting provider logs
4. Verify environment variables (if any)

## Security

### Content Security
- No user input on static pages
- No database to secure
- No payment processing

### External Links
- Only allow: app.rutaapi.com/register and app.rutaapi.com/pricing
- All other external links are prohibited

### Dependencies
- Run `npm audit` periodically
- Keep Astro and dependencies updated
- Review new dependencies before adding

## Backup and Recovery

### Backup
- All content is in Git repository
- Hosted on code hosting (GitHub/GitLab)
- No database to backup

### Recovery
- Clone repository
- Run `npm install`
- Run `npm run build`
- Deploy

## Contacts

For operational issues, consult the project owner.

## Change Log

### 2026-06-03
- Initial project setup
- Foundation pages created
- Validators created
- Documentation created
