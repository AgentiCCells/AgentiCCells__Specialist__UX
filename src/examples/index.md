---
title: "UX examples: the best we have"
description: "Pages and patterns from our own sites and apps that got UX right, with links and why each one works."
---
# Examples: the best we have

Start from these rather than from nothing. Each links to the page or the spec, and says why it works. Read on 16 November 2026; a live page may have moved on.

## Honesty and labels

**The "not everything" note** (promptugal.news). One component in two lengths, in a fixed order: why the list is short, what remains, how items come back, "N of M shown". Not red, because nothing shown is wrong. It turned empty pages that read as broken into pages that explain themselves.
Spec: https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/spec-the-not-everything-note.md

**"What is not here yet"** (agenticcells.site). Three sentences, and "If this page and REALITY.md disagree, REALITY.md is right." https://agenticcells.site/

**Made-up examples labelled where they are read** (the hub). "These are made-up examples, not real customers or sites", and on the card itself "Made-up example, draft live, not yet listed". https://hub.agenticcells.site/

**Build-time numbers dated** (the hub). "v0.1.120 (read on 2026-11-16, when this page was built; the live site may have moved on)". https://hub.agenticcells.site/

**Placeholders that say they are placeholders** (the specialist sites). A styled block, "Placeholder: the review lane is still to be wired", and a status chip "starting". https://specialist-code.agenticcells.site/

**"SYNTHETIC" and "This is not user research"** (promptugal.news). Called "the most honest line on the site" by its sherpa. https://promptugal.news/newsroom/synthetic.html

**A finding answered with a disclosure, not an invented number** (store.sgit.ai). Asked how long a service takes, the page now says it "has never run for a paying buyer, so there is no measurement to quote". https://sgit.ai/demos/vaults/synthetic-users/index.html

## Structure and length

**The findings page restructured** (promptugal.news). Scoreboard first, decisions by owner next, method last: 64 to 18 phone screens, about 10,000 to about 2,500 words.
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/passes/2026-11-06-the-synthetic-readers-page.md

**"Only you can do this"** (the Web Summit team site). The asks only one person can unblock, ranked by who is blocked, capped at five, each with a click path.
https://github.com/SGit-AI/SGit-AI__Website__Web-Summit/blob/dev/board/WS-151-incident-ws-145-not-surfaced-to-dinis.md

**The home page spec for a team that is overwhelmed** (the Web Summit team site). "For a person on the team, on a phone, in under ten seconds: what needs me, what is happening now, who is doing it". Four tiles instead of eleven; "a zero becomes its next step"; every number from data.
https://github.com/SGit-AI/SGit-AI__Website__Web-Summit/blob/dev/team/designer/home/SPEC.md

**Every graph explained in words under it** (promptugal.news). One sentence with the numbers, a "Tap a company to see ..." box, and a "How to read it" list. A reader who cannot read the picture still gets the point. https://promptugal.news/graph/

**List search with a live count, kept in the address** (promptugal.news). Filters as you type, the count follows, the view and the query stay in the address (`#v=org&q=founder`), and "No one matches. Clear the search." Companies went from 31.9 to 11.1 phone screens.
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/team/sherpa/review-2026-11-09-0330-the-list-pages.md

## States and time

**Day pages that say how sure they are** (promptugal.news). A past day: "This is PrompTugal.news as it was at the end of that day ... Back to today". A future day: "Times and rooms can move; each item links to its source." https://promptugal.news/days/

**Offline mode** (promptugal.news). A band with the copy's own time, a "kept" mark on links that will open, the site's own look, and a way to clear saved data.
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/spec-offline-mode-design.md

**A called-off day, fixed within hours** (promptugal.news). A sherpa review of every way in to the same fact, on a phone, on the day, re-measured that night.
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/team/sherpa/review-2026-11-10-2130-day-2-called-off.md

**The storm guide's voice** (storm-charles.promptugal.news). "Say who decides, never instruct: 'Your airline decides whether your flight goes'", and "Not stated ... means we do not know, not that they are closed."
https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/guide/HANDOVER.md

## Specs and reviews to copy

**The iOS UX spec** (the PrompTugal apps). A ten-second test ("within ten seconds knows what is on now, what is next for them, and what is new"), screen ids with owners, before / during / after states, a full empty, offline and error table, one meaning per colour.
https://github.com/PrompTugal/PrompTugal__App__iOS/blob/dev/briefs/2026-11-08__three-apps/status/ux.md

**Acceptance checks written before the build** (promptugal.news). Numbered pass conditions at 390 and 1440 px, light and dark, then dated re-checks with exact selectors and pixel values.
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/spec-front-page-e.md

**Taps counted per job** (the iOS news app redesign). Each workflow measured in taps from a cold launch, before and after ("3 (open, pick, Add to Calendar)" to "1 (the star)").
https://github.com/PrompTugal/PrompTugal__App__iOS/blob/dev/briefs/2026-11-10__newsapp-redesign/README.md

**The synthetic findings ledger** (promptugal.news). 61 rows, each with run, owner, severity, evidence and decision, re-measured before "verified".
https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/desks/synthetic/findings.json

**A second run that turned a claim into a measurement** (riskmandate.ai). Same five readers after the fix: the product's name moved from character 5,387 to 67, and those who would spend went from two of five to four of five. https://riskmandate.ai/synthetic-users.md

**The how-to that publishes its own failures** (newsroom.sgit.ai). https://newsroom.sgit.ai/articles/how-to-run-synthetic-users.html

**Reader controls designed with tests** (newsroom.sgit.ai). Never change the page while the reader reads forward; only colour may change during reading, never size; the reader can pause, reset and correct the measure.
https://newsroom.sgit.ai/articles/your-reading-your-controls.html
