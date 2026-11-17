---
title: "Two review methods: the cold reader and synthetic readers"
description: "How to run a cold-reader review (the sherpa method) and synthetic readers, as our teams did: what to measure, what to write, what to avoid."
---
# Two review methods

Two methods found most of the trips in the [principles](principles.md). Use the first on every release; use the second before a launch or when you change what a page is for. Both are inspection by agents, never user research, and both say so.

## 1. The cold-reader review (the sherpa method)

Taken from sherpa@PrompTugal.dinis (https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/team/sherpa/ROLE.md), which Dinis asked for on 6 November 2026, about 04:00 UTC: "an agent that represents the user ... a Sherpa agent". Its own test: "if a reader is lost on a page that a review could have caught, the Sherpa missed it."

**Inputs.** The live page (or a local build), opened in Chromium with Playwright, as an iPhone 13 (390 wide) and at 1280 or 1440 wide, light and dark.

**Measure, do not narrate:**
- page height in phone screens;
- scroll width against viewport width (sideways pan);
- word count;
- the share of the first screen taken by the header;
- every link in the first screen, and whether a tap reaches it (`document.elementFromPoint`);
- text under 12 px and tap targets under 24 px;
- page errors in the console;
- behaviour under `prefers-reduced-motion`.

[pack/measure.mjs](../pack/README.md#the-measuring-script) does most of this in one run.

**Write one file per review,** in the shape of [our reviews](../reviews/README.md#what-a-review-looks-like): the reader assumed, what works (keep), findings ranked by cost with the measurement and a proposed fix, what was not checked.

**Re-measure.** After the owner's release, append a then / now / state table to the same review. "Done" means re-measured, not ticked by the person who fixed it.

**Rules.** Never redesign or rewrite the page; propose. Never decide a finding; the owner decides. Never present a review as user research.

**Lessons the sherpas recorded:**
- A full-page screenshot can catch an animation mid-way: use `load`, not `networkidle`, on pages with a live loop.
- "A page is only as current as its own 'last checked' line."
- Test twice before filing: a Playwright locator that re-resolves after a click looked like a bug.
- On a day that changes, check every way in to the same fact, first screen first.

## 2. Synthetic readers

From https://newsroom.sgit.ai/articles/how-to-run-synthetic-users.html (10 October 2026) and https://newsroom.sgit.ai/articles/synthetic-users-for-your-website.html (4 November 2026), and synthetic@PrompTugal.dinis's runs (https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/desks/synthetic/README.md).

**Why it works.** "Give the agent the screenshot, not the page's code": an agent reading the DOM "finds the buy button every time, and therefore finds no confusion, which is the only thing worth running this for."

**Steps.**
1. **Choose four to six invented readers, for disagreement, not coverage:** who the site is for, who it must convince, a sceptic who will never buy, someone on a phone, someone anxious about money, and one outside the in-group (Dinis, for PrompTugal: "one who does not know what a prompt is"). Never model a real person.
2. **Write each as a record:** situation, the question they arrive with, what they know, **what they do not know**, what they decide on, **what makes them leave**, patience, device and window size. The negative fields make the run honest.
3. **Write the expected journey before any run.** The gap between it and the run is the finding.
4. **Run on screenshots only,** one action per step, up to about 14 steps: observe, say what you see, think, record a question the page did not answer, record a confusion (it must point at the screenshot), act with a reason. Leaving is a result.
5. **Interview** every reader with the same questions: what is this; was any of it for you; did you believe it; where did you guess; what did you still not know; would you act; one change; rate 1 to 5.
6. **Order findings by what they cost:** blocks a decision, costs trust, loses a reader, minor.
7. **Check every surprising finding** against the capture and the site before publishing; label tooling artefacts and keep them.
8. **Publish with the protocol inside,** "everybody in it is invented" above the fold, fix, then run the same readers again: "A finding that disappears is a fix that worked, and a new one is something the fix broke."

**Cadence.** Do not loop. synthetic@PrompTugal.dinis ran only when a page had changed by 20%, the front page's first screen by 10%, or a new article appeared, and otherwise said so in one line. Run the cheap mechanical measurement (method 1) before every reader run.

**Mistakes to skip** (from the newsroom run): a helper that reloaded per step; scroll restored before images loaded, which made two false findings; a protocol copied from another site that kept its rules. Commit the capture and brief scripts: PrompTugal's lived in a scratch folder and the method had to be rebuilt from its description.

**Safety.** Pause your own analytics for synthetic visits. No screenshot shows a signed-in view. Every reader stays marked SYNTHETIC.

## What each is good and poor at

| | Good at | Poor at |
|---|---|---|
| Cold-reader review | layout, length, words, broken states, regressions; fast and repeatable | knowing what a newcomer does not know |
| Synthetic readers | where a page loses someone, the unanswered question, the word that means something else | how many real people it would lose; what is worth paying for |
| Real people | what really confuses and what is worth paying for | volume and speed |
