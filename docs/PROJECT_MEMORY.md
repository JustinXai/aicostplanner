# PROJECT_MEMORY.md - AICostPlanner Project Memory

## Project Identity

**AICostPlanner** is a static English cost-intent acquisition site for RutaAPI.

- **Domain:** aicostplanner.com
- **Brand:** AICostPlanner
- **Purpose:** English cost-intent acquisition site
- **Core Question:** "How much will this API workflow cost before I run it?"

## What AICostPlanner IS

- Cost-intent site for AI API planning
- Educational content about API costs
- Routes users to RutaAPI for registration and pricing
- Focus on: token usage, credits, billing, failed generation cost, media API pricing

## What AICostPlanner IS NOT

- NOT AI API Ops (that is the engineering workflow / MCP / observability site)
- NOT LinkAI
- NOT AI API Doctor
- NOT aiapiprice.com
- NOT AI API Radar
- NOT SellerFixHub
- NOT ExtensionFixes

## Visual Direction

**Agent Budget Console V2** style:
- Premium agent cost control console aesthetic
- Dark, high-impact hero section
- Light, readable guide/content sections below
- NOT generic AI landing page
- NOT cyberpunk
- NOT purple gradients
- NOT crypto dashboard

## Technical Stack

- **Framework:** Astro 4.x (static site generator)
- **Output:** Static HTML/CSS/JS
- **No:** backend, database, login, payment, scraping

## CTA Policy

**Primary CTA:**
- Text: Create API Key — includes $1 trial credit
- URL: https://app.rutaapi.com/register?lng=en

**Secondary CTA:**
- Text: View live model pricing
- URL: https://app.rutaapi.com/pricing

## Site Sections

1. Claude Code & Coding Agent Cost
2. OpenRouter Credits
3. OpenAI API Credits / Billing / Usage
4. Media API Cost
5. Failed Jobs, Retries and Billing Mismatch
6. Small Prepaid Testing

## Pages

### Homepage
- H1: "AI API Cost Planner for Agents, Media Models and API Credits"
- Dark hero with console preview
- Problem cards
- Cost unit selector
- Page cards
- Testing framework
- AI Summary
- FAQ

### Full Pages (3)
1. /claude-code-token-cost/
2. /openrouter-credits/
3. /video-generation-api-pricing/

### Scaffold Pages (14)
- /openai-api-credits/
- /openai-api-billing/
- /openai-api-usage/
- /api-billing-mismatch/
- /coding-agent-cost/
- /agent-token-usage/
- /image-generation-api-pricing/
- /gpt-image-api-cost/
- /sora-api-pricing/
- /kling-api-pricing/
- /runway-api-pricing/
- /failed-generation-cost/
- /media-api-cost/
- /small-prepaid-test/

## Important Disclaimers

1. Pricing and model availability can change
2. Always check live provider pricing
3. This is educational, not official provider pricing
4. Not affiliated with OpenAI, Anthropic, Google, Runway, Kling, OpenRouter
5. Examples are for educational purposes, not provider endorsements
6. Sora availability has changed over time

## SEO/GEO Requirements

- Unique title, meta, H1 per page
- Canonical URL (absolute)
- JSON-LD with absolute URLs
- AI Summary block per page
- FAQ per page
- Last updated date
- Internal links
- sitemap.xml
- llms.txt

## Banned Claims

- cheapest
- lowest price
- guaranteed compatible
- all models available
- unlimited usage
- no billing risk
- no failed generation cost
- failed jobs never charge
- RutaAPI supports every model mentioned
- exact pricing unless verified live
- official OpenAI/Google/Runway/Kling/OpenRouter partner

## Release Requirements

1. Local build passes
2. All validators pass
3. Production deploy complete
4. Live checks pass
5. GSC/Bing submission only after production live checks pass

## Cross-Project Contamination Prevention

This site must NOT link to:
- LinkAI
- AI API Doctor
- aiapiprice.com
- AI API Radar
- SellerFixHub
- ExtensionFixes
- guides.link-ai.cc
- api1.link-ai.cc
- aiapidoctor.com

## Validator Commands

```bash
npm run validate:content
npm run validate:claims
npm run validate:links
npm run validate:sitemap-llms
npm run validate:jsonld
npm run verify
```

## Current Status

**Foundation Phase:** Complete
- Static site framework built
- Homepage complete
- 3 full pages complete
- 14 scaffold pages complete
- Validators created
- Documentation created

**Next Phase:** Content expansion, production deployment
