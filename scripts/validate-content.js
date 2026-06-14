#!/usr/bin/env node

/**
 * Validate Content - Checks unique title/meta/H1, canonical, AI Summary,
 * FAQ, last updated, internal links, empty content markers and output residue.
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative, dirname } from 'path';

const DIST_DIR = './dist';

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
  '/billing-transparency/'
];

let errors = [];

function extractMeta(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : null;
}

function extractTag(html, tag) {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
  const match = html.match(pattern);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : null;
}

function countInternalLinks(html) {
  const matches = html.match(/href=["']\/(?!\/)[^"']*["']/g) || [];
  return matches.length;
}

function filePathToUrl(filePath) {
  const rel = relative(DIST_DIR, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.replace(/\/index\.html$/, '')}/`;
  if (rel.endsWith('index.html')) return `/${dirname(rel).replace(/\\/g, '/')}/`;
  return `/${rel.replace(/\.html$/, '')}/`;
}

async function validatePage(filePath, url) {
  const html = await readFile(filePath, 'utf-8');
  const pageErrors = [];

  const title = extractMeta(html, /<title>([^<]+)<\/title>/i);
  if (!title) pageErrors.push('Missing title tag');
  else if (title.length > 60) pageErrors.push(`Title too long: ${title.length} chars (max 60): "${title}"`);

  const metaDesc = extractMeta(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
    extractMeta(html, /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  if (!metaDesc) pageErrors.push('Missing meta description');

  const h1Matches = html.match(/<h1\b[^>]*>/gi) || [];
  if (h1Matches.length !== 1) pageErrors.push(`Expected exactly one H1, found ${h1Matches.length}`);
  const h1 = extractTag(html, 'h1');
  if (!h1) pageErrors.push('Missing H1');

  const canonical = extractMeta(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    extractMeta(html, /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (!canonical) pageErrors.push('Missing canonical URL');
  else if (!canonical.startsWith('https://aicostplanner.com/')) pageErrors.push(`Canonical must use https://aicostplanner.com/: ${canonical}`);

  if (!html.includes('AI Summary') && !html.includes('ai-summary')) pageErrors.push('Missing AI Summary block');
  if (!html.includes('faq') && !html.includes('FAQ')) pageErrors.push('Missing FAQ section');
  if (!html.includes('Last updated') && !html.includes('last-updated')) pageErrors.push('Missing last updated date');

  const internalLinks = countInternalLinks(html);
  if (internalLinks < 3) pageErrors.push(`Expected at least 3 internal links, found ${internalLinks}`);

  if (!html.includes('https://app.rutaapi.com/register?lng=en')) pageErrors.push('Missing RutaAPI register CTA');
  if (!html.includes('https://app.rutaapi.com/pricing')) pageErrors.push('Missing RutaAPI pricing CTA');

  const bannedResidue = ['undefined', 'NaN', '[object Object]'];
  for (const token of bannedResidue) {
    if (html.includes(token)) pageErrors.push(`Generated HTML contains banned residue: ${token}`);
  }

  const scaffoldMarkers = [
    'Scaffold content to expand later',
    'This is scaffold content for future expansion',
    'scaffold content for future expansion',
    'TODO',
    'TBD',
    'placeholder',
    'coming soon',
  ];
  for (const marker of scaffoldMarkers) {
    if (html.includes(marker)) {
      pageErrors.push(`Scaffold/placeholder content found: "${marker}"`);
      break;
    }
  }

  return { url, title, metaDesc, h1, errors: pageErrors };
}

async function main() {
  console.log('Validating content...\n');

  const titles = new Map();
  const metaDescs = new Map();
  const h1s = new Map();
  const seenUrls = new Set();

  try {
    const htmlFiles = [];

    async function walk(dir) {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
          htmlFiles.push(fullPath);
        }
      }
    }

    await walk(DIST_DIR);

    const pageFiles = htmlFiles.filter(filePath => {
      const url = filePathToUrl(filePath);
      return !url.startsWith('/404');
    });

    for (const filePath of pageFiles) {
      const url = filePathToUrl(filePath);

      if (seenUrls.has(url)) errors.push(`Duplicate route detected: ${url}`);
      seenUrls.add(url);

      const pageResult = await validatePage(filePath, url);
      if (pageResult.title) {
        if (titles.has(pageResult.title)) errors.push(`Duplicate title: "${pageResult.title}" on ${url} and ${titles.get(pageResult.title)}`);
        else titles.set(pageResult.title, url);
      }
      if (pageResult.metaDesc) {
        if (metaDescs.has(pageResult.metaDesc)) errors.push(`Duplicate meta description on ${url} and ${metaDescs.get(pageResult.metaDesc)}`);
        else metaDescs.set(pageResult.metaDesc, url);
      }
      if (pageResult.h1) {
        if (h1s.has(pageResult.h1)) errors.push(`Duplicate H1: "${pageResult.h1}" on ${url} and ${h1s.get(pageResult.h1)}`);
        else h1s.set(pageResult.h1, url);
      }
      if (pageResult.errors.length > 0) errors.push(...pageResult.errors.map(e => `${url}: ${e}`));
    }

    for (const page of REQUIRED_PAGES) {
      if (!seenUrls.has(page)) errors.push(`Missing built page: ${page}`);
    }
  } catch (err) {
    console.error('Error reading dist directory:', err.message);
    console.log('Make sure to run: npm run build');
    process.exit(1);
  }

  console.log(`\n=== Content Validation Results ===\n`);
  console.log(`Pages checked: ${seenUrls.size}`);
  console.log(`Unique titles: ${titles.size}`);
  console.log(`Unique meta descriptions: ${metaDescs.size}`);
  console.log(`Unique H1s: ${h1s.size}`);

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  } else {
    console.log(`\n✅ All content checks passed!`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
