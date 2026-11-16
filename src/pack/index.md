---
title: "The UX day-one pack"
description: "What a new AgentiCCells team copies on its first day, so its UX starts from what we already learned: a UX.md for the repository root, a spec template, the measuring script and the checklist."
---
# The UX day-one pack

Version 1.0.0, 16 November 2026. A new team copies these into its repository on day one, before its first page. They take about ten minutes to read. Text is CC BY 4.0 and code is Apache-2.0: copy, change and keep the source line.

| File | Copy to | What it does |
|---|---|---|
| [UX.md](UX.md) | your repository root, beside CLAUDE.md | the ten rules every page follows, and how to ask for a review; point your CLAUDE.md at it |
| [spec-template.md](spec-template.md) | wherever your team keeps specs | the reader, their question, and the checks, written before you build |
| [measure.mjs](https://github.com/AgentiCCells/AgentiCCells__Specialist__UX/blob/dev/pack/measure.mjs) | `scripts/` | measures a page at a phone and a desktop width |
| [the checklist](../guidance/checklist.md) | link it from your release notes | what to check before each release |

## Day one, in order

1. Copy `UX.md` and add one line to your CLAUDE.md: "Every page a reader sees follows UX.md."
2. Write the first spec from `spec-template.md`: who your reader is, and the question they arrive with. Everything else follows from it.
3. Copy `measure.mjs` to `scripts/` and run it on your first page: `node scripts/measure.mjs https://your-site/ --shots shots/`.
4. Before your first release, [ask for a review](../reviews/README.md#how-to-ask). The article this service comes from asks every new team to do so (https://newsroom.sgit.ai/articles/specialist-agents-for-every-team.html).

## The measuring script

`measure.mjs` opens each address in Chromium as an iPhone 13 and at 1280 × 800, and prints, for each: the status, page height in screens, sideways overflow, words, text under 12 px, tap targets under 24 px, images without alt, page errors, the links in the first screen and whether a tap reaches each, and the first screen's text. `--shots <dir>` saves a screenshot of each first screen; `--json` prints data instead.

Small targets are listed, not failed: a link inside a sentence may be smaller (WCAG 2.2, 2.5.8, the inline exception), but navigation, buttons and links standing alone should be at least 24 px, and navigation 44 px.

It exits 1 when a page has sideways overflow, page errors or a non-2xx status, so it can sit in a release check. It measures; it does not judge. A person or an agent reads the result and the screenshots.

It needs Playwright with Chromium. In our cloud sessions it is already installed. Tested on 16 November 2026 against agenticcells.site, promptugal.news and this site.

## What the pack does not do

- It does not replace a review by a cold reader, or real people.
- It does not check words, honesty or whether the page answers the reader's question: those need reading. The [checklist](../guidance/checklist.md) says what to read for.
