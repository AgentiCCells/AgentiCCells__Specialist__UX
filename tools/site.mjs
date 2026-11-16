// Renders the Markdown in abp/, guidance/, examples/, mistakes/, pack/ and reviews/ into
// src/ as HTML pages, with a .md twin beside each, so the site and the files cannot drift.
// Run before scripts/release.sh: node tools/site.mjs
// Node built-ins only. A small Markdown subset: headings, paragraphs, lists, tables,
// images (copied), blockquotes, fenced code, inline code, bold, italic, links, front matter (skipped).
// Written by specialist.ux@AgentiCCells.dinis, 2026-11-16. Apache-2.0.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync, rmSync, copyFileSync } from 'node:fs';
import { join, dirname, relative, basename } from 'node:path';

const DIRS = ['abp', 'guidance', 'examples', 'mistakes', 'pack', 'reviews'];
const OUT = 'src';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, a, u) => `<img src="${u}" alt="${a}" loading="lazy" style="max-width:100%;height:auto;border:1px solid #ccc">`);
  s = s.replace(/(?<!src=")\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
    if (!/^(https?:|mailto:|#)/.test(u)) u = u.replace(/(^|\/)README\.md(#|$)/, '$1index.md$2').replace(/\.md(#|$)/, '.html$1');
    return `<a href="${u}">${t}</a>`;
  });
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,;:])/g, (_, p, u) => `${p}<a href="${u}">${u}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[i])}</code>`);
}

export function md2html(md) {
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '');
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  const isBlockStart = (l) => /^(#{1,6} |[-*] |\d+\. |> |```|\|)/.test(l) || !l.trim();
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(#{1,6}) (.*)$/))) {
      const id = m[2].toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push(`<h${m[1].length} id="${id}">${inline(m[2])}</h${m[1].length}>`); i++; continue;
    }
    if (l.startsWith('```')) {
      const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++]);
      i++; out.push(`<pre><code>${esc(buf.join('\n'))}</code></pre>`); continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const body = rows.filter((r) => !/^\|[\s:|-]+\|$/.test(r));
      const [head, ...rest] = body;
      out.push('<div class="table"><table><thead><tr>' + cells(head).map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        rest.map((r) => '<tr>' + cells(r).map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (l.startsWith('> ')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^> ?/, ''));
      out.push(`<blockquote>${md2html(buf.join('\n'))}</blockquote>`); continue;
    }
    if (/^([-*]|\d+\.) /.test(l)) {
      const ordered = /^\d+\./.test(l);
      const items = [];
      while (i < lines.length && (/^([-*]|\d+\.) /.test(lines[i]) || /^ {2,}\S/.test(lines[i]))) {
        if (/^ {2,}\S/.test(lines[i])) items[items.length - 1] += ' ' + lines[i].trim();
        else items.push(lines[i].replace(/^([-*]|\d+\.) /, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>` + items.map((t) => `<li>${inline(t)}</li>`).join('') + `</${tag}>`); continue;
    }
    const buf = [];
    while (i < lines.length && !isBlockStart(lines[i])) buf.push(lines[i++]);
    if (!buf.length) buf.push(lines[i++]);
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }
  return out.join('\n');
}

const CSS = `body{margin:0;font:18px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;background:#fbf7f0;color:#222}
main{max-width:44rem;margin:0 auto;padding:2rem 1rem 3rem}
nav.crumbs{font-size:.9rem;margin-bottom:1rem}
h1{font-size:1.9rem;line-height:1.2}h2{font-size:1.3rem;margin-top:2.2rem}h3{font-size:1.1rem;margin-top:1.6rem}
a{color:#1d4f91}code{font-size:.88em;background:#f0e8db;padding:0 .2em;border-radius:3px}
pre{background:#f0e8db;padding:.8rem;overflow-x:auto}pre code{background:none;padding:0}
blockquote{border-left:4px solid #b5651d;margin:1rem 0;padding:.1rem 1rem;background:#f3e9da}
.table{overflow-x:auto}table{border-collapse:collapse;font-size:.92rem;margin:1rem 0}th,td{border:1px solid #d8cdbb;padding:.35rem .5rem;text-align:left;vertical-align:top}th{background:#f0e8db}
footer{margin-top:3rem;border-top:1px solid #ddd;padding-top:1rem;font-size:.9rem;color:#666}
@media(prefers-color-scheme:dark){body{background:#17140f;color:#eee}a{color:#8fb8ff}code,pre,th{background:#2a2219}blockquote{background:#2a2219}th,td{border-color:#4a4034}footer{color:#aaa;border-color:#444}}`;

function page({ title, description, body, depth, mdName }) {
  const up = depth ? '../'.repeat(depth) : '';
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<style>
${CSS}
</style>
</head>
<body>
<main>
<nav class="crumbs"><a href="${up}index.html">Specialist: UX</a> · <a href="${up}guidance/index.html">Guidance</a> · <a href="${up}pack/index.html">Pack</a> · <a href="${up}reviews/index.html">Reviews</a> · <a href="${up}abp/specialist-ux.html">ABP</a></nav>
${body}
<footer>
<p>This page as Markdown: <a href="${mdName}">${mdName}</a>. Source: <a href="https://github.com/AgentiCCells/AgentiCCells__Specialist__UX">AgentiCCells__Specialist__UX</a> (branch dev).</p>
<p>Version __VERSION__ · specialist.ux@AgentiCCells.dinis · Code Apache-2.0, text CC BY 4.0.</p>
</footer>
</main>
</body>
</html>
`;
}

const walk = (d) => (existsSync(d) ? readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }) : []);

for (const d of DIRS) rmSync(join(OUT, d), { recursive: true, force: true });
let n = 0;
for (const d of DIRS) {
  for (const f of walk(d).filter((p) => p.endsWith('.md'))) {
    const md = readFileSync(f, 'utf8');
    const fm = (md.match(/^---\n([\s\S]*?)\n---\n/) || [])[1] || '';
    const fmGet = (k) => ((fm.match(new RegExp(`^${k}:\\s*"?(.+?)"?\\s*$`, 'm')) || [])[1]);
    const h1 = (md.replace(/^---\n[\s\S]*?\n---\n/, '').match(/^# (.+)$/m) || [])[1] || basename(f, '.md');
    const title = fmGet('title') || h1.replace(/[`*]/g, '');
    const firstPara = md.replace(/^---\n[\s\S]*?\n---\n/, '').split('\n\n').map((s) => s.trim()).find((s) => s && !/^(#|\||>|-|\d+\.|```)/.test(s)) || title;
    const description = fmGet('description') || firstPara.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '').replace(/\s+/g, ' ').slice(0, 200);
    const rel = relative('.', f);
    const outHtml = join(OUT, rel.replace(/(^|\/)README\.md$/, '$1index.md').replace(/\.md$/, '.html'));
    const outMd = outHtml.replace(/\.html$/, '.md');
    mkdirSync(dirname(outHtml), { recursive: true });
    const depth = rel.split('/').length - 1;
    writeFileSync(outHtml, page({ title, description, body: md2html(md), depth, mdName: basename(outMd) }));
    writeFileSync(outMd, md);
    n++;
  }
}
for (const d of DIRS) for (const f of walk(d).filter((p) => /\.(png|jpg|svg)$/.test(p))) { mkdirSync(join(OUT, dirname(f)), { recursive: true }); copyFileSync(f, join(OUT, f)); }
console.log(`site: ${n} pages rendered into ${OUT}/`);
