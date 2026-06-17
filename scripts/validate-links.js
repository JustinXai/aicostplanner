#!/usr/bin/env node

/**
 * Validate Links - Checks CTA URLs and external links
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = './dist';

const ALLOWED_CTA_URLS = [
  'https://app.rutaapi.com/register?lng=en',
  'https://app.rutaapi.com/pricing'
];

const ALLOWED_OTHER_URLS = [
  'https://aicostplanner.com',
  'https://www.aicostplanner.com',
  'https://www.anthropic.com/api',
  'https://developers.openai.com/api/docs',
  'https://ai.google.dev/gemini-api/docs/pricing',
  'https://openrouter.ai/docs/models',
  'https://dev.runwayml.com/api',
  'https://platform.openai.com/docs/guides/image-generation'
];

const BANNED_DOMAINS = [
  'link-ai.cc',
  'linkai',
  'aiapidoctor.com',
  'aiapidoctor',
  'aiapiprice.com',
  'aiapiprice',
  'aiapiradar',
  'sellerfixhub',
  'extensionfixes',
  'aiapiobs',
  'aiapiobs.com'
];

let errors = [];
let warnings = [];

function extractLinks(html) {
  const links = [];
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function isAllowedUrl(url) {
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
    return true; // Internal link
  }
  
  try {
    const urlObj = new URL(url);
    
    // Check if it's an allowed domain
    for (const allowed of ALLOWED_OTHER_URLS) {
      if (urlObj.href.startsWith(allowed)) {
        return true;
      }
    }

    
    // Check if it's an allowed CTA URL
    for (const allowed of ALLOWED_CTA_URLS) {
      if (urlObj.href === allowed) {
        return true;
      }
    }
    
    // Check if it's a banned domain
    for (const banned of BANNED_DOMAINS) {
      if (urlObj.hostname.includes(banned)) {
        return { allowed: false, reason: `Banned domain: ${banned}` };
      }
    }
    
    // Allow schema-relative URLs to same domain
    if (urlObj.hostname === 'aicostplanner.com' || urlObj.hostname === 'www.aicostplanner.com') {
      return true;
    }
    
    return { allowed: false, reason: `External link to ${urlObj.hostname}` };
  } catch {
    return true; // Invalid URL, skip
  }
}

async function checkFile(filePath, fileName) {
  const content = await readFile(filePath, 'utf-8');
  const links = extractLinks(content);
  const fileErrors = [];
  const fileWarnings = [];
  
  for (const link of links) {
    const result = isAllowedUrl(link);
    
    if (result && typeof result === 'object' && !result.allowed) {
      fileErrors.push(`Disallowed link: ${link} - ${result.reason}`);
    }
  }
  
  return { errors: fileErrors, warnings: fileWarnings };
}

async function main() {
  console.log('Validating links...\n');
  
  try {
    const files = await readdir(DIST_DIR, { recursive: true });
    const htmlFiles = files.filter(f => 
      (typeof f === 'string' && f.endsWith('.html')) ||
      (typeof f === 'object' && f.name?.endsWith('.html'))
    );
    
    let ctaRegisterCount = 0;
    let ctaPricingCount = 0;
    
    for (const file of htmlFiles) {
      const fileName = typeof file === 'string' ? file : file.name;
      const filePath = join(DIST_DIR, fileName);
      const content = await readFile(filePath, 'utf-8');
      
      // Count CTA occurrences
      const registerMatches = content.match(/app\.rutaapi\.com\/register/g);
      const pricingMatches = content.match(/app\.rutaapi\.com\/pricing/g);
      
      if (registerMatches) ctaRegisterCount += registerMatches.length;
      if (pricingMatches) ctaPricingCount += pricingMatches.length;
      
      // Check for disallowed links
      const result = await checkFile(filePath, fileName);
      if (result.errors.length > 0) {
        errors.push(...result.errors.map(e => `${fileName}: ${e}`));
      }
      warnings.push(...result.warnings.map(w => `${fileName}: ${w}`));
    }
    
    console.log(`\n=== Links Validation Results ===\n`);
    console.log(`CTA URL counts (in HTML):`);
    console.log(`  https://app.rutaapi.com/register?lng=en: ${ctaRegisterCount}`);
    console.log(`  https://app.rutaapi.com/pricing: ${ctaPricingCount}`);
    
    if (errors.length > 0) {
      console.log(`\n❌ ERRORS (${errors.length}):`);
      errors.forEach(e => console.log(`  - ${e}`));
      process.exit(1);
    } else {
      console.log(`\n✅ All link checks passed!`);
      if (warnings.length > 0) {
        console.log(`\nWarnings (${warnings.length}):`);
        warnings.forEach(w => console.log(`  - ${w}`));
      }
      process.exit(0);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
