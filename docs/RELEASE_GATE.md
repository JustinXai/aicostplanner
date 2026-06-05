# RELEASE_GATE.md - AICostPlanner Release Checklist

## Pre-Release Checklist

### Build Verification
- [x] Local build passes (`npm run build`)
- [x] No TypeScript errors
- [x] No Astro errors
- [x] All pages generate correctly

### Content Validation
- [ ] All titles are unique
- [ ] All meta descriptions are unique
- [ ] All H1s are unique
- [ ] All canonical URLs are present and absolute
- [ ] All JSON-LD URLs are absolute
- [ ] All pages have AI Summary block
- [ ] All pages have FAQ section
- [ ] All pages have last updated date
- [ ] All pages have internal links

### Claim Validation
- [ ] No "cheapest" claims
- [ ] No "lowest price" claims
- [ ] No "guaranteed compatible" claims
- [ ] No "all models available" claims
- [ ] No "unlimited usage" claims
- [ ] No "no billing risk" claims
- [ ] No "official partner" claims
- [ ] No exact pricing claims (unverified)
- [ ] Pricing freshness warnings present

### CTA Validation
- [ ] Primary CTA uses correct URL: https://app.rutaapi.com/register?lng=en
- [ ] Secondary CTA uses correct URL: https://app.rutaapi.com/pricing
- [ ] No other external CTAs present

### Cross-Project Contamination
- [ ] No LinkAI references
- [ ] No AI API Doctor references
- [ ] No aiapiprice.com references
- [ ] No AI API Radar references
- [ ] No SellerFixHub references
- [ ] No ExtensionFixes references
- [ ] No guides.link-ai.cc references
- [ ] No api1.link-ai.cc references
- [ ] No aiapidoctor.com references

### Sitemap/llms.txt
- [ ] sitemap.xml includes all public pages
- [ ] llms.txt includes all public pages
- [ ] sitemap.xml uses absolute URLs
- [ ] robots.txt present and correct

### Page-Specific Checks

#### Homepage
- [ ] H1 is exactly: "AI API Cost Planner for Agents, Media Models and API Credits"
- [ ] Hero has console preview
- [ ] No TODO/scaffold placeholders
- [ ] Primary CTA present
- [ ] Secondary CTA present

#### Full Pages (no TODO allowed)
- [ ] /claude-code-token-cost/ - complete
- [ ] /openrouter-credits/ - complete
- [ ] /video-generation-api-pricing/ - complete

#### Scaffold Pages (TODO allowed)
- [ ] /openai-api-credits/ - scaffold
- [ ] /openai-api-billing/ - scaffold
- [ ] /openai-api-usage/ - scaffold
- [ ] /api-billing-mismatch/ - scaffold
- [ ] /coding-agent-cost/ - scaffold
- [ ] /agent-token-usage/ - scaffold
- [ ] /image-generation-api-pricing/ - scaffold
- [ ] /gpt-image-api-cost/ - scaffold
- [ ] /sora-api-pricing/ - scaffold
- [ ] /kling-api-pricing/ - scaffold
- [ ] /runway-api-pricing/ - scaffold
- [ ] /failed-generation-cost/ - scaffold
- [ ] /media-api-cost/ - scaffold
- [ ] /small-prepaid-test/ - scaffold

### Validator Results

```bash
npm run validate:content
# Expected: pass

npm run validate:claims
# Expected: pass (0 banned claims)

npm run validate:links
# Expected: pass

npm run validate:sitemap-llms
# Expected: pass

npm run validate:jsonld
# Expected: pass
```

## Production Deployment Checklist

### Pre-Deploy
- [ ] All local checks pass
- [ ] Validators pass
- [ ] Git commit created
- [ ] Deployment target confirmed (Vercel/Cloudflare Pages/Netlify)

### Post-Deploy
- [ ] Site accessible at production URL
- [ ] Homepage returns 200
- [ ] All full pages return 200
- [ ] sitemap.xml returns 200
- [ ] robots.txt returns 200
- [ ] llms.txt returns 200

### Cache-Busted Live Check
- [ ] Homepage title correct
- [ ] Homepage H1 correct
- [ ] Homepage canonical correct
- [ ] CTA hrefs correct (cache-busted)

### Final Verification
- [ ] Title/meta/H1 correct on all pages
- [ ] CTA hrefs correct on all pages
- [ ] Banned claims = 0
- [ ] Required phrases present
- [ ] No prompt residue in HTML

## Post-Production

### GSC/Bing Submission
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Submit sitemap.xml to Bing Webmaster Tools
- [ ] Wait for indexing
- [ ] Check for any manual actions or issues

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Monitor for 404 errors
- [ ] Monitor for crawl errors

## Release Status

**Foundation Release (v1.0.0)**
- Status: READY_FOR_BUILD
- Local build: PENDING
- Validators: PENDING
- Production: PENDING
- Live verification: PENDING

## Known Limitations

1. No live price fetching (static site)
2. Scaffold pages need content expansion
3. No user account system
4. No API integration

## Next Recommended Tasks

1. Expand scaffold pages with full content
2. Set up production deployment
3. Submit to GSC/Bing after live verification
4. Monitor and iterate based on performance
