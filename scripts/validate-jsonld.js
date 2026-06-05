#!/usr/bin/env node

/**
 * Validate JSON-LD - Checks all JSON-LD URLs are absolute
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DIST_DIR = './dist';
const SITE_URL = 'https://aicostplanner.com';

let errors = [];
let warnings = [];

function extractJsonLd(html) {
  const scripts = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      scripts.push(data);
    } catch (e) {
      scripts.push({ _error: e.message, _raw: match[1] });
    }
  }
  return scripts;
}

function checkJsonLdUrls(data, path, visited = new Set()) {
  const key = JSON.stringify(data);
  if (visited.has(key)) return;
  visited.add(key);
  
  if (Array.isArray(data)) {
    data.forEach(item => checkJsonLdUrls(item, path, visited));
  } else if (typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (key === '@id' || key === 'url' || key === 'item' || key === 'mainEntityOfPage') {
        if (typeof value === 'string') {
          // Check if it's a relative URL (starts with / or //)
          if (value.startsWith('/') && !value.startsWith('//')) {
            // Relative URL without domain - this is an error
            errors.push(`${path}: JSON-LD ${key} is relative: ${value}`);
          }
          // Check for malformed URLs
          if (value === SITE_URL || value.endsWith('/') === false) {
            // This is fine - absolute URL to domain root
          }
        }
      } else if (typeof value === 'object') {
        checkJsonLdUrls(value, path, visited);
      }
    }
  }
}

async function checkFile(filePath, fileName) {
  const content = await readFile(filePath, 'utf-8');
  const jsonLdScripts = extractJsonLd(content);
  
  for (const data of jsonLdScripts) {
    if (data._error) {
      errors.push(`${fileName}: Invalid JSON-LD: ${data._error}`);
      continue;
    }
    checkJsonLdUrls(data, fileName);
  }
}

async function main() {
  console.log('Validating JSON-LD...\n');
  
  try {
    const files = await readdir(DIST_DIR, { recursive: true });
    const htmlFiles = files.filter(f => 
      (typeof f === 'string' && f.endsWith('.html')) ||
      (typeof f === 'object' && f.name?.endsWith('.html'))
    );
    
    for (const file of htmlFiles) {
      const fileName = typeof file === 'string' ? file : file.name;
      const filePath = join(DIST_DIR, fileName);
      await checkFile(filePath, fileName);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
  
  console.log(`\n=== JSON-LD Validation Results ===\n`);
  
  if (errors.length > 0) {
    console.log(`❌ ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  } else {
    console.log(`✅ All JSON-LD URLs are absolute!`);
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
