// measure.mjs: the cold reader's measurements for one or more pages, at a phone and a desktop width.
// From the UX specialist's day-one pack (https://specialist-ux.agenticcells.site/pack/).
// Needs Playwright with Chromium. Node built-ins otherwise. Apache-2.0.
//
// Usage: node measure.mjs <url> [<url> ...] [--shots <dir>] [--json]
// Prints, per page and width: status, page height in screens, sideways overflow, words,
// text under 12px, tap targets under 24px, images without alt, page errors, the first
// screen's links (and whether a tap reaches each), and the first screen's text. Exits 1 if any page has overflow,
// page errors or a non-2xx status, so it can sit in a release check.
// It measures; it does not judge. A person or an agent reads the result.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
// require, not import, so a global Playwright (NODE_PATH) is found as well as a local one.
const { chromium, devices } = createRequire(import.meta.url)('playwright');

const args = process.argv.slice(2);
const json = args.includes('--json');
const si = args.indexOf('--shots');
const shots = si >= 0 ? args[si + 1] : null;
const urls = args.filter((a, i) => !a.startsWith('--') && (si < 0 || i !== si + 1));
if (!urls.length) { console.error('usage: node measure.mjs <url> [<url> ...] [--shots <dir>] [--json]'); process.exit(2); }
if (shots) mkdirSync(shots, { recursive: true });

const widths = [
  ['phone', { ...devices['iPhone 13'] }],
  ['desktop', { viewport: { width: 1280, height: 800 } }],
];

const browser = await chromium.launch();
const results = [];
let bad = false;
for (const url of urls) {
  for (const [name, opts] of widths) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e.message || e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    let status = 0;
    try { status = (await page.goto(url, { waitUntil: 'load', timeout: 45000 }))?.status() ?? 0; await page.waitForTimeout(800); }
    catch (e) { errors.push(`load failed: ${e.message}`); }
    const m = await page.evaluate(() => {
      const vw = innerWidth, vh = innerHeight;
      const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
      const texts = [...document.querySelectorAll('body *')].filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && visible(el));
      const small = texts.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).map((el) => el.textContent.trim().slice(0, 40));
      const targets = [...document.querySelectorAll('a[href],button,input,select,textarea,[role=button]')].filter(visible);
      const tiny = targets.filter((el) => el.getBoundingClientRect().height < 24).map((el) => (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40));
      const first = targets.filter((el) => { const r = el.getClientRects()[0] || el.getBoundingClientRect(); return r.top >= 0 && r.top + r.height / 2 < vh; }).map((el) => {
        // The first line box, so a link that wraps is probed on its text, not between its lines.
        const r = el.getClientRects()[0] || el.getBoundingClientRect();
        const hit = document.elementFromPoint(Math.min(vw - 1, r.left + Math.min(r.width / 2, 8)), r.top + r.height / 2);
        const label = (el.innerText || el.getAttribute('aria-label') || el.querySelector('img[alt]')?.alt || el.getAttribute('title') || el.getAttribute('href') || '').trim().slice(0, 50);
        return { label, href: el.getAttribute('href'), tappable: !!hit && (hit === el || el.contains(hit)) };
      });
      return {
        title: document.title,
        screens: +(document.documentElement.scrollHeight / vh).toFixed(1),
        overflowPx: Math.max(0, document.documentElement.scrollWidth - vw),
        words: (document.body.innerText.match(/\S+/g) || []).length,
        smallText: [...new Set(small)].slice(0, 10),
        smallTargets: [...new Set(tiny)].slice(0, 15),
        imagesWithoutAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
        firstScreenLinks: first,
        firstScreenText: document.body.innerText.trim().slice(0, 600),
      };
    }).catch((e) => ({ error: e.message }));
    if (shots) {
      const slug = url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-$/, '');
      await page.screenshot({ path: join(shots, `${slug}--${name}.png`) }).catch(() => {});
    }
    const r = { url, width: name, status, errors, ...m };
    if (!(status >= 200 && status < 300) || errors.length || m.overflowPx > 0) { bad = true; r.fail = true; }
    results.push(r);
    await ctx.close();
  }
}
await browser.close();

if (json) console.log(JSON.stringify(results, null, 2));
else for (const r of results) {
  console.log(`\n${r.fail ? 'CHECK' : 'ok   '} ${r.url} [${r.width}] status ${r.status} · ${r.title || ''}`);
  console.log(`  ${r.screens} screens · ${r.words} words · overflow ${r.overflowPx}px · images without alt ${r.imagesWithoutAlt}`);
  if (r.errors.length) console.log(`  page errors: ${r.errors.slice(0, 5).join(' | ')}`);
  if (r.smallText?.length) console.log(`  text under 12px: ${r.smallText.join(' | ')}`);
  if (r.smallTargets?.length) console.log(`  targets under 24px: ${r.smallTargets.join(' | ')}`);
  const untappable = (r.firstScreenLinks || []).filter((l) => !l.tappable);
  console.log(`  first screen: ${(r.firstScreenLinks || []).length} links${untappable.length ? `, ${untappable.length} not tappable now (covered, clipped or in a closed menu): ${untappable.map((l) => l.label).join(' | ')}` : ''}`);
  console.log(`  first screen text: ${(r.firstScreenText || '').replace(/\s+/g, ' ').slice(0, 300)}`);
}
process.exit(bad ? 1 : 0);
