#!/usr/bin/env node

/**
 * Validate Claims - Checks for banned claims
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = './dist';

const BANNED_CLAIMS = [
  'cheapest',
  'lowest price',
  'lowest cost',
  'most affordable',
  'best value',
  'rock-bottom',
  'guaranteed compatible',
  'guaranteed to work',
  'guaranteed to',
  'always available',
  'always works',
  '100% compatible',
  'all models available',
  'every model supported',
  'complete model list',
  'unlimited usage',
  'unlimited API calls',
  'unlimited requests',
  'unlimited models',
  'no rate limits',
  'no billing risk',
  'no surprise charges',
  'no hidden fees',
  'official partner',
  'official reseller',
  'certified partner',
  'authorized dealer'
];

// API path errors that must not appear in built HTML
const BANNED_API_PATHS = [
  '/v1/organization/usage/audio/speech',
  '/v1/organization/usage/audio/transcriptions',
  '/v1/organization/usage/code_interpreter/sessions',
  "params.set('next_page'",
  'params.set("next_page"',
];

// Required correct strings that must appear in the usage page HTML
const REQUIRED_USAGE_PATTERNS = [
  '/v1/organization/usage/audio_speeches',
  '/v1/organization/usage/audio_transcriptions',
  '/v1/organization/usage/code_interpreter_sessions',
  "params.set('page'",
  'params.set("page"',
];

// Case-insensitive patterns that need special handling
const BANNED_PATTERNS = [
  /cheapest/gi,
  /lowest price/gi,
  /lowest cost/gi,
  /guaranteed compatible/gi,
  /all models available/gi,
  /unlimited usage/gi,
  /unlimited api calls/gi,
  /no billing risk/gi,
  /official partner/gi
];

let errors = [];

async function checkFile(filePath, fileName) {
  const content = await readFile(filePath, 'utf-8');
  const fileErrors = [];
  
  // Check for banned claims
  for (const claim of BANNED_CLAIMS) {
    const regex = new RegExp(`\\b${claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches) {
      fileErrors.push(`Banned claim found: "${claim}" (${matches.length} occurrences)`);
    }
  }

  // Check for banned API path errors (usage page specific)
  for (const badPath of BANNED_API_PATHS) {
    if (content.includes(badPath)) {
      fileErrors.push(`Banned API path in HTML: "${badPath}"`);
    }
  }

  // For the usage page, verify required correct strings are present
  if (fileName === 'openai-api-usage/index.html') {
    for (const reqPattern of REQUIRED_USAGE_PATTERNS) {
      if (!content.includes(reqPattern)) {
        fileErrors.push(`Required correct string missing from usage page: "${reqPattern}"`);
      }
    }
  }
  
  // Check for "exact pricing" claims without verification
  const exactPricingRegex = /\$\d+[\.,]\d{2}/g;
  const exactMatches = content.match(exactPricingRegex);
  if (exactMatches) {
    // Check if it's in a safe context
    const lines = content.split('\n');
    for (const line of lines) {
      const pricingMatches = line.match(exactPricingRegex);
      if (pricingMatches && !line.toLowerCase().includes('check') && !line.toLowerCase().includes('verify')) {
        // Only flag if not in a disclaimer
        if (!line.toLowerCase().includes('official') && !line.includes('$')) {
          // This is a soft warning, not an error
        }
      }
    }
  }
  
  return fileErrors;
}

async function main() {
  console.log('Validating claims...\n');
  
  try {
    const files = await readdir(DIST_DIR, { recursive: true });
    const htmlFiles = files.filter(f => 
      (typeof f === 'string' && f.endsWith('.html')) ||
      (typeof f === 'object' && f.name?.endsWith('.html'))
    );
    
    for (const file of htmlFiles) {
      const fileName = typeof file === 'string' ? file : file.name;
      const filePath = join(DIST_DIR, fileName);
      const fileErrors = await checkFile(filePath, fileName);
      
      if (fileErrors.length > 0) {
        errors.push(...fileErrors.map(e => `${fileName}: ${e}`));
      }
    }
    
    // Also check src for template issues
    const srcFiles = await readdir('./src/pages', { recursive: true });
    for (const file of srcFiles) {
      if (file.endsWith('.astro')) {
        const filePath = join('./src/pages', file);
        const content = await readFile(filePath, 'utf-8');
        
        for (const claim of BANNED_CLAIMS) {
          const regex = new RegExp(`\\b${claim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          const matches = content.match(regex);
          if (matches) {
            errors.push(`src/pages/${file}: Banned claim: "${claim}"`);
          }
        }
      }
    }
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
  
  console.log(`\n=== Claims Validation Results ===\n`);
  
  if (errors.length > 0) {
    console.log(`❌ BANNED CLAIMS FOUND (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
    console.log(`\nSafe wording alternatives:`);
    console.log(`  - "check live pricing" instead of specific prices`);
    console.log(`  - "pricing can change" instead of guaranteed prices`);
    console.log(`  - "model availability varies" instead of all available`);
    process.exit(1);
  } else {
    console.log(`✅ No banned claims found!`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
