---
title: "UX principles: what readers trip on, and how to avoid it"
description: "Thirty principles drawn from what readers and users actually tripped on across our sites and apps in September to November 2026, each with its source and an example."
---
# UX principles

Version 1.0.0, 16 November 2026, by specialist.ux@AgentiCCells.dinis. Owner of the skill: Dinis Cruz.

Each principle comes from a trip someone actually had on one of our sites or apps, not from a textbook. Each one gives the rule, the trip behind it, and its source. Many trips were found by **synthetic readers** (invented personas reading screenshots) or by a **sherpa** (an agent reading cold, on a phone). That is inspection, not user research. Where a real person tripped, it says so.

Sections: [the first screen](#the-first-screen) (1 to 4), [words](#words) (5 to 10), [honesty](#honesty) (11 to 16), [navigation](#navigation) (17 to 20), [phone and layout](#phone-and-layout) (21 to 23), [states](#states) (24 to 26), [how we check](#how-we-check) (27 to 30). Short source names (PTN, Ledger, Sherpa, iOS, WS, Storm, RM study) are spelled out [at the end](#short-source-names).

## The first screen

### 1. The first screen says what this is, who made it, and what to do next

**Trip.** On the storm site, the front page was the data. Dinis, 11 November 2026, about 09:50 UTC: "we need to send this to a journalist ... So the first page has to be super clear ... It feels to me that the current page is like the data page." Synthetic run 1 measured the same: "/ never says what this is, who makes it, or that AI agents make it." On newsroom.sgit.ai the phone's first screen was "the masthead, eight menu links and an editor's note"; the commuter persona "read the £5.00 as a price".

**Do.** One plain line at the top: what it is, for whom, made by whom. Then the one next step. Check it on a phone.

Sources: Storm `BRIEF.md` and `research/synthetic/findings.md`; https://newsroom.sgit.ai/articles/how-to-run-synthetic-users.html

### 2. Name the thing before you argue for it, and give each thing one name

**Trip.** On riskmandate.ai, "The words Agent Behaviour Policy first appeared at character 5,387 of 9,270", and "Two of the five read 'Buy one, from £5' as buying an insurance policy". The fix put the full name at character 67; four of five would then spend, against two of five (RM study, v1.20.1 to v1.25.1, September 2026). The same study found a rename done on the home page only: linked pages still said "the grant" and "the delta". Today the AgentiCCells idea is written "AgentiCCells", "AgenticCell" and "agentic.cell".

**Do.** Name the product in the first sentence. Qualify an ambiguous noun ("behaviour policy", not "policy") every time. Keep a short glossary per site; a rename is a site-wide change.

### 3. Lead with the reader's present

**Trip.** The summit app opened "at the top of the day, not at now" (Sherpa `review-2026-11-09-1830-the-app.md`, AP1). The iOS app opened on "'All days': hundreds of rows" (iOS `briefs/2026-11-08__three-apps/status/review.md`, F3). The home page put "Now and next" 2,407 to 6,201 px down on a phone (PTN `board/spec-home-page-designs.md`, D11).

**Do.** Open on now, mark it, and keep the controls pinned when you jump.

### 4. Put the person's next action first, ranked by who is blocked

**Trip.** A blocking ask that only Dinis could do sat at row 53 of 93, in file order (`readdirSync().sort()`). Dinis, 4 November, about 16:40 UTC: "why this high-importance issue (WS-145) was not picked up and shows in that massive list". A team dashboard was 30,705 px tall; the person's own part started 3,637 px down.

**Do.** An "Only you can do this" block at the top, ranked by who is blocked, capped at five, each with its click path. Shared material folds below.

Source: WS `board/WS-151-incident-ws-145-not-surfaced-to-dinis.md`

## Words

### 5. Write in the reader's words, not the team's

**Trip.** "Who made this" read: "'storyline S2', 'the curator's map', 'marked Ready' ... '403'" (Ledger F30). "116 releases": "an attendee does not know what a release is" (Sherpa `review-2026-11-06-0930-wake.md`, D10). The iOS graph's subtitle was "1,688 nodes, drawn natively" (iOS review F6). Storm newcomers did not know "IPMA, ANEPC, METAR, CAP, UTC ... markdown twin, sha256, conductor@, vault".

**Do.** Read every reader-facing string as a cold reader. No ids, paths, status codes or team verbs. Gloss an acronym the first time ("IPMA, Portugal's weather service").

### 6. An address with an @ reads as an email address

**Trip.** "Thirteen agent addresses on the page read as e-mail addresses to a cold reader" (Sherpa `review-2026-11-06-0630-wake.md`). A persona: "The writer has an email address instead of a name."

**Do.** On cards, say it in words ("By our AI journalist, for the editor"). Keep the agent's address one click deeper, on the article page. Never hide that an agent wrote it (principle 16).

### 7. A currency sign reads as a price unless the words beside it say otherwise

**Trip.** A free reading credit: "every persona read it as a paywall or a charge" (Ledger F01). The first fix was a hover tooltip, which a phone cannot show.

**Do.** Put the meaning in the words next to the number ("£5.00 free"), visible on a phone. Search every page for the old money words ("charged", "pay") when you change the meaning (F53).

### 8. A label never says more than its source

**Trip.** In the storm, "Day 3 of Web Summit is tagged 'running' ... but the organisers' words are only that it 'aims to proceed as planned'"; a parks row showed "running" while the city had closed them (Storm `research/synthetic/findings-guide-1.md`). "Every fact sourced and dated" was read as "every fact checked" (Ledger F45).

**Do.** Use the source's own words in a status. Put the day in it ("Thu: not announced"). In a crisis a status label is read as advice.

### 9. Keep notes about our own process apart from facts about the world

**Trip.** "'NOT READ' reads as a service status. For about 2 s the all-caps chip on the Metro row reads as 'not running'" (Storm `research/synthetic/findings-guide-5.md`). "About" opened a 9,279 px internal brief; "Two personas read it as internal notes published by mistake" (Storm `research/synthetic/findings.md`).

**Do.** Process notes in a quiet lower-case style, worded as being about us ("we do not read this site"). Internal pages one level down and labelled internal.

### 10. Templates handle the edge cases in the data

**Trip.** "1 items" (F56), "?." after a title ending in a question mark (F61), an unknown time shown as "All day" ("a reader cannot tell when to go", F60), "what is on" on a past day, "in in 1 day" and "Updated tomorrow" in the iOS app (iOS `website/build-log/2026-11-07-0620.md`).

**Do.** Test every generated string with zero, one, many, null and punctuation already present. Unknown must render as unknown, never as a confident value. Tense follows time.

## Honesty

### 11. Say what is not here

**Trip and fix.** When licence rules removed most of a programme, empty lists read as broken ("'Nothing matches on this day.' At the venue that reads as a broken app"). The "not everything" note fixed it: why, what remains, how items come back, "N of M shown", not in red because nothing shown is wrong. agenticcells.site does it well: "What is not here yet ... If this page and REALITY.md disagree, REALITY.md is right."

**Do.** A short, dated section on what does not exist yet, and where the full thing is if it is elsewhere.

Sources: PTN `board/spec-the-not-everything-note.md`; https://agenticcells.site/

### 12. A trust claim needs an action beside it

**Trip.** "Signed": "All 4 readers in run 5 guessed what it means; none could check it" (Ledger F28). Fixed by a line under each article linking the signed text, the signature, the key and how we publish.

**Do.** Every badge (signed, checked, verified) links to the thing a reader can check, in plain words. Show a badge only when it is true for that item (PTN `board/spec-front-page-e.md`, E8).

### 13. One page tells one story

**Trip.** "No person read this article before it went live" beside a footer saying it was edited by three people: "a compliance reader cannot reconcile the two" (Ledger F50). "OUR PICK" beside "Nothing on it is an endorsement" (F15). £4.97 in the bar and £4.49 on the card: the editor persona "trusted the honesty and doubted the engineering" (newsroom study).

**Do.** Feed every statement about the same fact from one source. Read the whole page, footer included, as one text before release.

### 14. Freshness is part of the fact

**Trip.** "The page says 'Last checked 21:37 UTC' at 06:35 on Wednesday: nine hours old on the morning IPMA's red rain warning starts" (Sherpa `review-2026-11-11-0630-storm-and-agentic.md`). Today the Web Summit home page still says "0 days to the summit" and "The summit is on", a week after it ended.

**Do.** Show age next to time ("read 9 h ago"). After an event, a dated archive line and counters in the past tense. Exact UTC times are for logs; readers want relative age.

### 15. Never show an invitation, control or promise without a working route

**Trip.** "'Correct us, add to us' says 'Tell Dinis Cruz' with no link, form or route" (Ledger F46, blocking, open 10 days). A printed card promised "Book a meeting" and "Talk to my agent"; the page said "coming this week" (WS `board/WS-146-the-meet-pages-before-the-cards-are-printed.md`). "Play the briefing" played nothing (F39).

**Do.** If the route waits on a decision, take the invitation off until the route exists. Never print what the page cannot deliver.

### 16. Mark simulated as simulated, and agents as agents

**Trip and fix.** The synthetic readers page's "SYNTHETIC" label and "This is not user research" were called "the most honest line on the site" (Sherpa `review-2026-11-06-the-synthetic-readers-page.md`). Hiding that an agent wrote an article was a blocking finding (F35); the researcher persona asked for "the agent involvement on the byline of every article, where a reader meets the name" (https://newsroom.sgit.ai/articles/who-is-speaking.html).

**Do.** Label made-up examples where they are read ("Made-up example", as the hub does). Say who is speaking on the byline. An inspection is never called research.

## Navigation

### 17. A link says where it goes

**Trip.** On agenticcells.site, "The factory's public repository" links to the website's repository, not the factory's (review of 16 November 2026, finding 2). PrompTugal's footer "Source code" linked an old repository (F16). On agenticcells.ai, tables label every source just "Link" (reviewer@AgentiCCells.dinis, 16 November 12:12).

**Do.** Link text names the destination. Show the full address for an outside link so the reader knows they are leaving (PTN `board/spec-the-live-sources-strip.md`, L2). A link appears only once its target is live.

### 18. Every destination one tap from the phone's first screen; hidden scroll needs a cue

**Trip.** "On a phone, six of eight sections sat behind a swipe nobody knew to make" (Sherpa `review-2026-11-06-the-top-of-the-page.md`, T1). Dinis "on his phone in portrait ... cannot find the Newsroom link" (T2). A graph fixed by making it scroll sideways: "Nothing says so" (G1).

**Do.** A Menu on the phone. A sideways strip shows a cut item at the edge, or says "Swipe to see more".

### 19. One front door per person; remove a view before adding one

**Trip (a real person).** A team member, 3 November: "too many views of the same thing (my dashboard, the command centre, the For-you panel, the board, the stand-up briefings, two board-health pages, the conductor's briefs). I don't know which one to look at first." The same day another view was added. The ask went undecided for four days (WS `content/pulse-summary.md`).

**Do.** One "start here" page per person, the rest linked from it. Each new view names the one it replaces.

### 20. Same destination, same label; one primary action

**Trip.** "The header's button says Get in touch on the home page and Book a demo on three others" (RM study). agenticcells.site's nav says "Home · Hub · Publish"; the hub's says "Sites · Publish or copy" for the same places. riskmandate.ai's menu grew to 34 entries, with two near-identical "Agent Behaviour Policy" pages four rows apart.

**Do.** One nav vocabulary per family of sites, kept in the template. Navigation reflects what a reader is here for now, not the order pages were written.

## Phone and layout

### 21. Measure at 390 px: nothing panning, covered or cut

**Trip.** "The article lays out 591 px wide on a 390 px phone" (Sherpa T9, F10). "The floating Ask button covers the right end of a headline in every screen" (T11). A wider credit pill cut the site's own name to "PrompTugal.ne…" (F55). A time wrapped as "11:05 A / M" in the iOS app (F16).

**Do.** On every page: scroll width equals viewport width at 390 px; no floating control without a reserved gutter; the longest locale and the narrowest phone tried.

### 22. Length is a cost the reader pays

**Trip and fix.** The synthetic readers page was "amazing, but completely unreadable" (Dinis, 6 November); its fix list was section 14 of 15. Putting the scoreboard first and the method last took it from 64 to 18 phone screens and from about 10,000 to about 2,500 words (PTN `board/passes/2026-11-06-the-synthetic-readers-page.md`). A storm guide went from 16,625 to 4,235 px over 13 versions. A trust page on agenticcells.ai grew to 64,292 px before a cap.

**Do.** Answers before statistics. The newest five, then "Earlier (N)". Fold long lists with native `<details>`. Measure the answer's pixel position after every change: each fix pushes another answer down.

### 23. Floors: text 12 px, targets 24 px (44 for navigation), never colour alone

**Trip.** A 9 px "AI-made" label; 10 to 15 links under 32 px per page on agenticcells.ai across five reviews; a maturity level shown by colour only.

**Do.** `font-size: max(12px, ...)`, `min-height: 24px` (WCAG 2.2), 44 px for navigation; the level in words with an `aria-label`; contrast at least AA in every theme, checked by the build (https://newsroom.sgit.ai/articles/dark-mode-and-four-more.html).

Sources: PTN `board/spec-home-page-designs.md` (H6); PTN `board/spec-maturity-badge.md`

## States

### 24. Design the empty, offline and changed states

**Trip.** "0 items in our programme on Thursday 12 November ... five things to plan around" (Sherpa `review-2026-11-12-0030-the-not-everything-note.md`). The offline page had "no styles, no top, no tab bar ... a reader takes it for an error" (Sherpa `review-2026-11-07-0930-offline-mode.md`). The iOS talk detail opened offline on "Connect to load this talk's times" although the data was on the phone (F23).

**Do.** An empty state says why and offers one way forward. A fallback page looks like the product and marks what will work. Never strand a user offline when the data is on the device.

### 25. When a fact changes, check every way in to it

**Trip and fix.** When Day 2 of the summit was called off by the storm, the home page was right within an hour, "the day's own page three hours later, the app last"; the app still listed the day "with 'Add' on every item" (Sherpa `review-2026-11-10-2130-day-2-called-off.md`).

**Do.** List every surface that shows the fact (home, day page, strip, app, feed) and check each, first screen first, on a phone.

### 26. Ask for permission at the moment of use

**Trip.** The notification prompt appeared at launch: "It covers 60 of 63 store images" (iOS review F15).

**Do.** Ask on the first action that needs it, with the reason in one line.

## How we check

### 27. Check in a real browser, with real data; the console counts

**Trip.** On riskmandate.ai, "a page error on every step of every journey ... The menu, the mobile drawer ... were dead", while "twenty-six tests, four npm run check gates and two further CI checks all passed" (RM study). A view switch rendered "one letter per line" (Sherpa `review-2026-11-09-0330-the-list-pages.md`, L1). An iOS screen "failed with real data" (iOS `briefs/2026-11-08__overnight-push/status/design.md`).

**Do.** Drive a real browser; record page errors; screenshot every theme; use the live data, not samples. Review what users get, not the debug build.

### 28. After any fix, re-measure the whole first screen at the narrowest width

**Trip.** Fixing the credit (F01) cut the site's name (F55). Jumping the app to "now" (AP1) pushed the day row off screen (AP5). Naming the agent on bylines (F35) brought back the email look (F9).

**Do.** A fix is checked against the original finding and against the whole first screen, on the phone. When two reader needs pull against each other, write both as checks.

### 29. Generate pages from the record, so they cannot drift

**Trip.** Mock-ups typed "218 events" and "22 stories"; the build counted 215 and 31 (PTN `board/spec-home-page-designs.md`, D5). The live synthetic page still lists as urgent two findings its own ledger marks verified. agenticcells.site says no sites live on its subdomains while ten answer.

**Do.** Every number and list from data. A generated summary carries a check that its top items still match the data. A hand-written "today" line carries a date.

### 30. Write the acceptance check before the build

**Fix that worked.** Specs that listed numbered pass conditions at 390 and 1440 px, light and dark, before building, then re-checked with exact selectors and pixel values, turned fixes into one-liners ("`height: 40px` gives 245 px wide").

**Do.** For any page or feature: the reader, their question, and three to six measurable checks, written first.

Sources: PTN `board/spec-front-page-e.md`, `board/spec-list-pages-and-days-check.md`

## What this does not claim

- These principles come from our own sites and apps over about ten weeks. They are not a complete UX standard; where WCAG or platform guidelines say more, they win.
- Most trips were found by synthetic readers and sherpa reviews, which are inspection by agents. They show where a page can lose someone, not how many real people it would lose.
- Some fixes cited here were not re-checked live by me on 16 November 2026; their state is as the source file records it.

## Short source names

- **PTN** = https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/
- **Ledger** = PTN `desks/synthetic/findings.json` (synthetic@PrompTugal.dinis, findings F01 to F61)
- **Sherpa** = PTN `board/team/sherpa/`
- **iOS** = https://github.com/PrompTugal/PrompTugal__App__iOS/blob/dev/
- **WS** = https://github.com/SGit-AI/SGit-AI__Website__Web-Summit/blob/dev/
- **Storm** = https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/
- **RM study** = https://riskmandate.ai/synthetic-users.md
