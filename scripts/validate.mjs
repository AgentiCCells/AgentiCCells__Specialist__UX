// Gate: fails the build on any problem. Never weaken a check to get a release out.
// From scripts/validate.mjs in the site repositories made by sites@AgentiCCells.dinis
// (2026-11-16); factory@ added the hub.json fields, the description check and the
// placeholder check (a seeded site must hold no __SITE_*__ placeholder).
// specialist.ux@AgentiCCells.dinis added the link-preview check (2026-11-17, at Dinis's word).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const problems = [];
const fail = m => problems.push(m);
// Width and height from a JPEG's start-of-frame marker, or null if the bytes are not a JPEG.
function jpegSize(b) {
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  for (let i = 2; i + 9 < b.length;) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}
const hype = /\b(revolutionary|cutting[- ]edge|seamless(?:ly)?|world[- ]class|game[- ]changing)\b/i;
const isTemplate = existsSync('.factory-template');
if (!existsSync('_site')) { console.error('FAILED: _site/ is not built: run node scripts/build.mjs'); process.exit(1); }
const files = walk('_site');
for (const f of [...files, 'hub.json', 'README.md']) {
  if (!existsSync(f) || !/\.(html|js|css|json|md)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  s.split('\n').forEach((line, i) => {
    if (line.includes('—')) fail(`${f}:${i + 1}: em dash`);
    const m = line.match(hype); if (m) fail(`${f}:${i + 1}: hype word "${m[0]}"`);
    if (!isTemplate && /__SITE_[A-Z]+__/.test(line)) fail(`${f}:${i + 1}: template placeholder left in a seeded site`);
  });
  if (f.endsWith('.html')) {
    if (!/<title>[^<]+<\/title>/.test(s)) fail(`${f}: no <title>`);
    if (!/<meta name="description" content="[^"]+"/.test(s)) fail(`${f}: no description`);
    if (!/<html lang="/.test(s)) fail(`${f}: no lang on <html>`);
    // Link previews (Dinis, 2026-11-17, relayed by conductor@AgentiCCells.dinis: "yes do the link-preview roll out").
    // Every page: canonical and og:url absolute https; the og:* and twitter:card tags; a description of 110 to
    // 150 characters; a 1200x630 JPEG card served by this site, at most 300 KB (WhatsApp drops larger images).
    const unesc = (x) => x.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const meta = (n) => { const m = s.match(new RegExp(`<meta (?:property|name)="${n}" content="([^"]*)"`)); return m ? unesc(m[1]) : undefined; };
    const canonical = (s.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (!canonical) fail(`${f}: no canonical link (link previews)`);
    for (const n of ['og:type', 'og:site_name', 'og:locale', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:card']) if (!meta(n)) fail(`${f}: no ${n} (link previews)`);
    for (const [n, v] of [['canonical', canonical], ['og:url', meta('og:url')], ['og:image', meta('og:image')]]) if (v && !/^https:\/\/[^/]+\//.test(v)) fail(`${f}: ${n} must be an absolute https URL`);
    const ogd = meta('og:description');
    if (ogd && (ogd.length < 110 || ogd.length > 150)) fail(`${f}: og:description is ${ogd.length} characters; keep it between 110 and 150`);
    if (meta('twitter:card') && meta('twitter:card') !== 'summary_large_image') fail(`${f}: twitter:card must be summary_large_image`);
    if (meta('og:image:type') && meta('og:image:type') !== 'image/jpeg') fail(`${f}: og:image:type must be image/jpeg`);
    if ((meta('og:image:width') && meta('og:image:width') !== '1200') || (meta('og:image:height') && meta('og:image:height') !== '630')) fail(`${f}: og:image:width and height must say 1200 and 630`);
    const img = meta('og:image'), ogurl = meta('og:url');
    if (img && ogurl && /^https:\/\//.test(img) && /^https:\/\//.test(ogurl)) {
      if (new URL(img).host !== new URL(ogurl).host) fail(`${f}: og:image must be served by this site`);
      else {
        const card = join('_site', decodeURIComponent(new URL(img).pathname));
        if (!existsSync(card)) fail(`${f}: og:image ${img} is not in the site`);
        else {
          const kb = Math.round(statSync(card).size / 1024);
          if (statSync(card).size > 300 * 1024) fail(`${f}: the share card is ${kb} KB; keep it at most 300 KB`);
          const dim = jpegSize(readFileSync(card));
          if (!dim) fail(`${f}: the share card is not a JPEG`);
          else if (dim.w !== 1200 || dim.h !== 630) fail(`${f}: the share card is ${dim.w}x${dim.h}; it must be 1200x630`);
        }
      }
    }
    for (const m of s.matchAll(/<script[^>]+src="([^"]+)"/g)) if (/^(https?:)?\/\//.test(m[1])) fail(`${f}: third-party script ${m[1]}`);
    for (const m of s.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) if (/^(https?:)?\/\//.test(m[1])) fail(`${f}: third-party stylesheet ${m[1]}`);
    for (const m of s.matchAll(/(?:href|src)="([^"#?]+)/g)) {
      const u = m[1]; if (/^(https?:|mailto:|data:|\/\/)/.test(u)) continue;
      const target = u.startsWith('/') ? join('_site', u) : join(dirname(f), u);
      if (!existsSync(target) && !existsSync(join(target, 'index.html'))) fail(`${f}: broken link ${u}`);
    }
  }
}
if (!existsSync('_site/version.json')) fail('no version.json');
if (!existsSync('_site/index.html')) fail('no index.html');
try {
  const h = JSON.parse(readFileSync('hub.json', 'utf8'));
  for (const k of ['name', 'what_it_does', 'owner', 'repository', 'live_address', 'version_from']) if (typeof h[k] !== 'string' || !h[k].trim()) fail(`hub.json: ${k} must be a non-empty string`);
  if (h.owner !== 'AgentiCCells') fail('hub.json: owner must be AgentiCCells');
  if (!h.licence || h.licence.code !== 'Apache-2.0' || h.licence.text !== 'CC BY 4.0') fail('hub.json: licence must be code Apache-2.0, text CC BY 4.0');
} catch (e) { fail(`hub.json is missing or not JSON (${e.message})`); }
if (problems.length) { console.error(problems.join('\n')); console.error(`FAILED: ${problems.length} problem(s)`); process.exit(1); }
console.log(`OK${isTemplate ? ' (template)' : ''}`);
