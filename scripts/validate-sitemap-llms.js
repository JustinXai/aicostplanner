#!/usr/bin/env node

/**
 * Validate Sitemap and llms.txt - Checks all public pages are included
 */

import { readFile, access } from 'fs/promises';

const SITE_URL = 'https://aicostplanner.com';

const REQUIRED_PAGES = [
  '/',
  '/claude-code-token-cost/',
  '/openrouter-credits/',
  '/video-generation-api-pricing/',
  '/openai-api-credits/',
  '/openai-api-billing/',
  '/openai-api-usage/',
  '/api-billing-mismatch/',
  '/coding-agent-cost/',
  '/agent-token-usage/',
  '/image-generation-api-pricing/',
  '/gpt-image-api-cost/',
  '/sora-api-pricing/',
  '/kling-api-pricing/',
  '/runway-api-pricing/',
  '/failed-generation-cost/',
  '/media-api-cost/',
  '/small-prepaid-test/',
  '/video-generation-api-cost/',
  '/image-generation-api-cost/',
  '/gpt-image-api-pricing/',
  '/veo-api-pricing/',
  '/seedance-api-pricing/',
  '/image-to-video-api-cost/',
  '/video-generation-webhook/',
  '/failed-video-generation-cost/',
  '/video-generation-timeout-cost/',
  '/product-video-api-cost/',
  '/realtime-voice-api-cost/',
  '/billing-transparency/',
  '/claude-fable-5-api-cost/'
];

let errors = [];
let warnings = [];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function validateSitemap() {
  console.log('Checking sitemap-list.xml...\n');

  if (!await fileExists('./public/sitemap-list.xml')) {
    errors.push('sitemap-list.xml not found in public/');
    return;
  }

  const sitemap = await readFile('./public/sitemap-list.xml', 'utf-8');

  for (const page of REQUIRED_PAGES) {
    const loc = `<loc>${SITE_URL}${page}</loc>`;
    if (!sitemap.includes(loc)) errors.push(`Missing in sitemap: ${page}`);
  }

  if (sitemap.includes('/404')) errors.push('sitemap.xml should not include /404');

  const locMatches = sitemap.match(/<loc>([^<]+)<\/loc>/g);
  if (locMatches) {
    for (const match of locMatches) {
      const url = match.replace(/<\/?loc>/g, '');
      if (!url.startsWith('http')) errors.push(`Sitemap URL is not absolute: ${url}`);
    }
  }

  console.log(`  Found ${locMatches ? locMatches.length : 0} URLs in sitemap`);
}

async function validateLlms() {
  console.log('Checking llms.txt...\n');

  if (!await fileExists('./public/llms.txt')) {
    errors.push('llms.txt not found in public/');
    return;
  }

  const llms = await readFile('./public/llms.txt', 'utf-8');

  if (!llms.includes('AICostPlanner')) errors.push('llms.txt missing brand summary');
  if (!llms.includes('cost-intent') && !llms.includes('API cost')) errors.push('llms.txt missing site purpose');
  if (!llms.includes(SITE_URL + '/') && !llms.includes(SITE_URL)) errors.push('llms.txt missing homepage');
  if (!llms.includes('CTA') && !llms.includes('Create API Key')) warnings.push('llms.txt may be missing CTA policy');
  if (!llms.toLowerCase().includes('pricing')) warnings.push('llms.txt may be missing pricing disclaimer');

  for (const page of REQUIRED_PAGES) {
    if (!llms.includes(page)) errors.push(`llms.txt missing page: ${page}`);
  }

  const bannedTerms = ['LinkAI', 'AI API Doctor', 'aiapiprice.com', 'AI API Radar', 'SellerFixHub', 'ExtensionFixes'];
  for (const term of bannedTerms) {
    const linkPattern = new RegExp(`href=["']https?://[^"']*${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
    if (linkPattern.test(llms)) errors.push(`llms.txt contains banned external link to: ${term}`);
  }

  console.log(`  llms.txt size: ${llms.length} characters`);
}

async function validateRobots() {
  console.log('Checking robots.txt...\n');

  if (!await fileExists('./public/robots.txt')) {
    errors.push('robots.txt not found in public/');
    return;
  }

  const robots = await readFile('./public/robots.txt', 'utf-8');
  if (!robots.includes('Sitemap:')) warnings.push('robots.txt may be missing Sitemap reference');
  console.log('  robots.txt exists');
}

async function main() {
  console.log('=== Sitemap and llms.txt Validation ===\n');

  await validateSitemap();
  await validateLlms();
  await validateRobots();

  console.log(`\n=== Results ===\n`);

  if (errors.length > 0) {
    console.log(`❌ ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
  }

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    warnings.forEach(w => console.log(`  - ${w}`));
  }

  if (errors.length > 0) process.exit(1);
  console.log('✅ All sitemap/llms.txt checks passed!');
  process.exit(0);
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
