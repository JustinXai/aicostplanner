# AGENTS.md - AICostPlanner Development Guidelines

## Project Context

AICostPlanner is an AI API cost-intent acquisition site. This document provides guidelines for AI agents working on this project.

## What This Project Is

- **Domain:** aicostplanner.com
- **Purpose:** Help developers understand AI API costs before scaling
- **Framework:** Astro (static site, no backend)
- **Target Users:** Developers planning AI API usage

## What This Project Is NOT

- NOT AI API Ops (that's a separate engineering/workflow site)
- NOT affiliated with LinkAI, AI API Doctor, aiapiprice.com, AI API Radar, SellerFixHub, or ExtensionFixes
- NOT official documentation for any API provider
- NOT a calculator or price fetcher

## Key Constraints

1. **No backend** - Static site only
2. **No database** - No user accounts or data storage
3. **No payment processing** - Routes to RutaAPI for registration
4. **No scraping** - No automated price fetching
5. **No real-time pricing** - Educational content only

## Allowed External Links

- https://app.rutaapi.com/register?lng=en (primary CTA)
- https://app.rutaapi.com/pricing (secondary CTA)

## Prohibited

- Links to other projects (LinkAI, AI API Doctor, etc.)
- Claims of "cheapest", "lowest price", "guaranteed compatible"
- Claims of official partnerships
- Mixing with other project content

## Content Guidelines

### Tone
- Educational and informative
- Professional but accessible
- Clear disclaimers about pricing changes

### Style
- Use "check live pricing" instead of specific prices
- Use "model availability can change" for volatile topics
- Use "examples" for pricing patterns, not provider endorsements
- Include "this is educational, not official" disclaimers

### Technical Labels
- Monospace for: request_id, tokens_in, tokens_out, tool_calls, retries
- Plain text for: body content, descriptions

## Design Direction: Agent Budget Console V2

- Dark console-style hero
- Light content sections
- Restrained accent colors (cyan/blue/green)
- No purple gradients
- No cyberpunk excess
- Compact cards, precise labels
- Request-log style details

## Page Structure

Each page needs:
1. Title (unique, SEO-optimized)
2. Meta description (unique)
3. H1 (unique)
4. Canonical URL
5. JSON-LD schema
6. Breadcrumb
7. Quick Answer section
8. Content with headers
9. AI Summary block
10. FAQ section
11. Related links
12. CTA block

## Validators

Run before any release:
```bash
npm run verify
```

Checks:
- Unique title/meta/H1
- Canonical present and absolute
- JSON-LD URLs absolute
- No TODO on full pages
- No banned claims
- CTA URLs correct
- Sitemap includes all pages
- llms.txt includes all pages

## Release Gate

Before claiming "Done":
1. Local build passes
2. All validators pass
3. Production deploy complete
4. Live checks pass
5. No cross-project contamination

## Contact

For questions about this project, consult the project owner.
