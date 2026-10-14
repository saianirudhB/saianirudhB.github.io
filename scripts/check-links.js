#!/usr/bin/env node
/**
 * Minimal internal-link checker for a static site.
 *
 * - Every href="#id" must resolve to an element with that id in the page.
 * - Every local, non-http(s) href/src (e.g. "styles.css", "assets/favicon.svg")
 *   must exist on disk relative to this script's project root.
 *
 * No dependencies — just enough to catch a typo'd anchor or a missing asset
 * before it ships. Exits non-zero on any failure.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_FILE = path.join(ROOT, 'index.html');

const html = fs.readFileSync(HTML_FILE, 'utf8');

let failures = 0;

// Collect every id="..." in the document.
const ids = new Set();
for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
  ids.add(match[1]);
}

// Collect every href="..." and src="..." value.
const refs = [];
for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
  refs.push(match[1]);
}

for (const ref of refs) {
  if (ref.startsWith('#')) {
    const target = ref.slice(1);
    if (!ids.has(target)) {
      console.error(`Broken internal anchor: href="${ref}" has no matching id="${target}"`);
      failures++;
    }
    continue;
  }

  // Skip external links, mailto, and protocol-relative URLs.
  if (/^(https?:)?\/\//.test(ref) || ref.startsWith('mailto:') || ref.startsWith('tel:')) {
    continue;
  }

  // Local file reference — strip any query/hash before checking existence.
  const cleanPath = ref.split(/[?#]/)[0];
  const filePath = path.join(ROOT, cleanPath);
  if (!fs.existsSync(filePath)) {
    console.error(`Broken local reference: "${ref}" -> ${filePath} does not exist`);
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} broken link(s) found.`);
  process.exit(1);
}

console.log(`OK: checked ${refs.length} link(s)/reference(s) in index.html, 0 broken.`);
