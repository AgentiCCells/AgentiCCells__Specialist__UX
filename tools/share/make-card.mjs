// Renders tools/share/card.html to the 1200x630 JPEG share card used by every page's link preview.
// Run when the card's words change: node tools/share/make-card.mjs. Needs Playwright with Chromium.
// Written by specialist.ux@AgentiCCells.dinis, 2026-11-17. Apache-2.0.
import { createRequire } from 'node:module';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const out = 'src/assets/share/specialist-ux-1200x630.jpg';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.goto('file://' + resolve('tools/share/card.html'));
await p.screenshot({ path: out, type: 'jpeg', quality: 86 });
await b.close();
console.log(`${out}: ${Math.round(statSync(out).size / 1024)} KB`);
