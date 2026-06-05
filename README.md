# AICostPlanner

AI API Cost Planner for Agents, Media Models and API Credits.

## Overview

AICostPlanner is an English cost-intent acquisition site for RutaAPI. It helps developers understand API credits, token usage, agent cost, image generation pricing, video generation pricing, failed job cost, and small prepaid testing before scaling AI workflows.

**Important:** AICostPlanner is NOT AI API Ops. AI API Ops is the engineering workflow / MCP / observability / billing workflow site. AICostPlanner is the cost-intent site.

## Project Type

- **Domain:** aicostplanner.com
- **Framework:** Astro (static site)
- **Purpose:** Cost-intent acquisition site
- **No backend, database, login, or payment processing**

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Validators

```bash
# Validate all content and SEO requirements
npm run verify

# Individual validators
npm run validate:content
npm run validate:claims
npm run validate:links
npm run validate:sitemap-llms
npm run validate:jsonld
```

## Pages

### Homepage
- Dark console-style hero with budget review preview
- Problem cards
- Cost units selector
- Page cards for cost planning guides
- Small prepaid testing framework
- AI Summary block
- FAQ section
- CTAs to RutaAPI

### Full Pages (3)
1. `/claude-code-token-cost/` - Claude Code token cost
2. `/openrouter-credits/` - OpenRouter credits
3. `/video-generation-api-pricing/` - Video generation API pricing

### Scaffold Pages (14)
- `/openai-api-credits/`
- `/openai-api-billing/`
- `/openai-api-usage/`
- `/api-billing-mismatch/`
- `/coding-agent-cost/`
- `/agent-token-usage/`
- `/image-generation-api-pricing/`
- `/gpt-image-api-cost/`
- `/sora-api-pricing/`
- `/kling-api-pricing/`
- `/runway-api-pricing/`
- `/failed-generation-cost/`
- `/media-api-cost/`
- `/small-prepaid-test/`

## CTA Policy

Primary CTA:
- Text: Create API Key — includes $1 trial credit
- URL: https://app.rutaapi.com/register?lng=en

Secondary CTA:
- Text: View live model pricing
- URL: https://app.rutaapi.com/pricing

## Design Direction

Agent Budget Console V2 style:
- Premium agent cost control console
- Dark, high-impact hero section
- Light, readable guide/content sections below
- Restrained accent colors (electric blue / cyan / green)
- Slate, zinc, near-black, off-white, soft borders, subtle glow
- Monospace for technical labels only
- Strong hierarchy, compact cards, precise labels

## SEO/GEO Requirements

Every page has:
- Unique title
- Unique meta description
- Unique H1
- Canonical URL
- AI Summary / GEO summary
- FAQ
- Last updated date
- Internal links
- sitemap.xml inclusion
- llms.txt inclusion
- Schema.org markup (WebSite, Organization, Article, FAQPage, BreadcrumbList)

## Important Disclaimers

- Pricing and model availability can change. Always check live provider pricing.
- AICostPlanner provides educational cost planning information, not official provider pricing.
- This site is not affiliated with OpenAI, Anthropic, Google, Runway, Kling, or OpenRouter.
- Examples of pricing patterns are used for educational purposes, not to claim specific provider support.

## Deployment

The site is static and can be deployed to:
- Vercel
- Cloudflare Pages
- Netlify
- Any static hosting provider

## License

Proprietary - All rights reserved.
