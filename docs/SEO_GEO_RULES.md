# SEO_GEO_RULES.md - AICostPlanner SEO and GEO Guidelines

## Overview

This document defines SEO and GEO (Generative Engine Optimization) requirements for AICostPlanner pages.

## SEO Requirements

### Per-Page Requirements

Every public page MUST have:

1. **Title tag** (unique, 50-60 characters optimal)
   - Format: "Page Topic | AICostPlanner"
   - Must be unique across all pages
   - Include primary keyword

2. **Meta description** (unique, 150-160 characters optimal)
   - Must be unique across all pages
   - Include primary keyword
   - Clear value proposition

3. **H1 heading** (unique, includes primary keyword)
   - Only one H1 per page
   - Matches or closely reflects title

4. **Canonical URL** (absolute, HTTPS)
   - Format: https://aicostplanner.com/[page-path]/
   - Must be absolute, not relative

5. **Open Graph tags**
   - og:title
   - og:description
   - og:type (website or article)
   - og:url
   - og:image (optional but recommended)

6. **Twitter Card tags**
   - twitter:card
   - twitter:title
   - twitter:description

## GEO Requirements

### AI Summary Block

Every page MUST have an AI Summary block containing:

- 120-180 words
- Written for AI answer extraction
- Clearly state "educational" nature
- Include "check live pricing" guidance
- Include "test small before scaling" guidance
- Use natural language flow
- Include key topics covered on the page

Example structure:
```
[AICostPlanner summary paragraph about the topic].
[Key points about cost units and factors].
[Disclaimer about pricing changes].
[Call to action to check live pricing].
```

### FAQ Section

Every page MUST have FAQ section:

- 3-5 questions
- Questions users actually ask
- Concise, helpful answers
- Crawlable (not JS-only)

## Schema.org Requirements

### Homepage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AICostPlanner",
  "url": "https://aicostplanner.com",
  "description": "...",
  "publisher": {
    "@type": "Organization",
    "name": "AICostPlanner",
    "url": "https://aicostplanner.com"
  }
}
```

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AICostPlanner",
  "url": "https://aicostplanner.com",
  "description": "..."
}
```

### Article Schema (for content pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Page Title",
  "description": "Meta description",
  "author": { "@type": "Organization", "name": "AICostPlanner" },
  "publisher": { "@type": "Organization", "name": "AICostPlanner", "url": "https://aicostplanner.com" },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aicostplanner.com/page/" }
}
```

### BreadcrumbList Schema (all pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aicostplanner.com/" },
    { "@type": "ListItem", "position": 2, "name": "Page Name", "item": "https://aicostplanner.com/page/" }
  ]
}
```

**Important:** All URLs in JSON-LD must be absolute.

## URL Requirements

### URL Structure
- Use kebab-case: `/claude-code-token-cost/`
- Include trailing slash
- Keep short and descriptive

### Internal Linking

Link related pages to each other:
- Claude Code → Coding Agent → Agent Token Usage
- OpenRouter → OpenAI API Credits → API Billing Mismatch
- Video Pricing → Failed Generation → Media API Cost
- Image Pricing → GPT Image Cost

## Sitemap Requirements

- Include all public pages
- Use absolute URLs
- Include lastmod date
- Set appropriate priority and changefreq

## llms.txt Requirements

Must include:
- Brand summary
- Site purpose
- Homepage URL
- All full page URLs with summaries
- All scaffold page URLs with summaries
- CTA policy
- Disclaimers about pricing changes
- Warning about no cross-project links

## Content Quality Guidelines

### Headings
- Use H2 for major sections
- Use H3 for subsections
- Include keywords naturally

### Paragraphs
- 2-4 sentences per paragraph
- Use bullet points for lists
- Include examples where helpful

### Technical Labels
- Monospace font for: request_id, tokens_in, tokens_out, tool_calls, retries
- Plain text for body content

## Banned Content

### Banned Claims
- "cheapest"
- "lowest price"
- "guaranteed compatible"
- "all models available"
- "unlimited usage"
- "no billing risk"
- "no failed generation cost"
- "failed jobs never charge"
- "RutaAPI supports every model"
- "exact pricing" (unless verified)
- "official partner"

### Safe Alternatives
- "check live pricing"
- "pricing can change"
- "model availability varies"
- "test small before scaling"
- "examples for educational purposes"

## Validation

Run validators before release:

```bash
npm run validate:content
npm run validate:claims
npm run validate:links
npm run validate:sitemap-llms
npm run validate:jsonld
npm run verify
```

## Checklist

- [ ] Title unique and optimized
- [ ] Meta description unique and optimized
- [ ] H1 unique and includes keyword
- [ ] Canonical URL present and absolute
- [ ] JSON-LD has absolute URLs
- [ ] AI Summary present (120-180 words)
- [ ] FAQ present (3-5 questions)
- [ ] Breadcrumbs present
- [ ] Internal links present
- [ ] sitemap.xml updated
- [ ] llms.txt updated
- [ ] No banned claims
- [ ] No cross-project contamination
