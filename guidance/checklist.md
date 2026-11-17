---
title: "UX checklist before a release"
description: "The checks to run on every page before a release: measured at 390 and 1280 px, in light and dark, with the reader's question in mind."
---
# UX checklist before a release

Run it on every page a release changes, and on the home page every time. Most checks are measurable; [pack/measure.mjs](../pack/README.md#the-measuring-script) measures the ones marked **(m)**. Each line links the principle behind it.

## Set up

- Write down the reader and the question they arrive with. Without one, this checklist is a matter of taste.
- Open the page in a real browser at **390 × 844** (a phone) and **1280 × 800**, in light and dark.

## The first screen (on the phone)

- [ ] It says what this is, who made it, and the next step ([1](principles.md#1-the-first-screen-says-what-this-is-who-made-it-and-what-to-do-next)).
- [ ] The product or thing is named by its full name ([2](principles.md#2-name-the-thing-before-you-argue-for-it-and-give-each-thing-one-name)).
- [ ] Any number with £ or € says what it is in the words beside it ([7](principles.md#7-a-currency-sign-reads-as-a-price-unless-the-words-beside-it-say-otherwise)).
- [ ] Every main section is reachable in one tap (a Menu counts) ([18](principles.md#18-every-destination-one-tap-from-the-phone-s-first-screen-hidden-scroll-needs-a-cue)).
- [ ] Shared in a chat, the link shows a card, a title and a description (Open Graph tags; a 1200 × 630 JPEG under 300 KB). For many readers the preview is the first screen.
- [ ] The site's own name is not cut **(m)** ([21](principles.md#21-measure-at-390-px-nothing-panning-covered-or-cut)).

## Layout **(m)**

- [ ] No sideways scroll at 390 px: scroll width equals viewport width ([21](principles.md#21-measure-at-390-px-nothing-panning-covered-or-cut)).
- [ ] No text under 12 px; no tap target under 24 px; navigation targets 44 px ([23](principles.md#23-floors-text-12-px-targets-24-px-44-for-navigation-never-colour-alone)).
- [ ] No floating control covering text.
- [ ] Page height in phone screens noted, and compared with the last release ([22](principles.md#22-length-is-a-cost-the-reader-pays)).
- [ ] Every image has alt text (empty for decoration).
- [ ] No page errors in the console ([27](principles.md#27-check-in-a-real-browser-with-real-data-the-console-counts)).

## Words

- [ ] No internal ids, file paths, status codes, agent addresses or team verbs in reader text ([5](principles.md#5-write-in-the-reader-s-words-not-the-team-s), [6](principles.md#6-an-address-with-an-reads-as-an-email-address)).
- [ ] Acronyms glossed on first use.
- [ ] Generated strings tried with 0, 1, many and unknown ([10](principles.md#10-templates-handle-the-edge-cases-in-the-data)).
- [ ] Every status label uses the source's own words ([8](principles.md#8-a-label-never-says-more-than-its-source)).
- [ ] Each link's words name where it goes; outside links show the address ([17](principles.md#17-a-link-says-where-it-goes)).
- [ ] The same place has the same label as on sister sites ([20](principles.md#20-same-destination-same-label-one-primary-action)).

## Honesty

- [ ] What is not here yet is said, with a date ([11](principles.md#11-say-what-is-not-here)).
- [ ] Every "tell us", button and promise has a working route; if not, it is removed ([15](principles.md#15-never-show-an-invitation-control-or-promise-without-a-working-route)).
- [ ] Every trust badge links to what a reader can check ([12](principles.md#12-a-trust-claim-needs-an-action-beside-it)).
- [ ] Nothing on the page contradicts anything else on it, footer included ([13](principles.md#13-one-page-tells-one-story)).
- [ ] Every time shown has its age or a date; nothing says "today" or "live" after the event ([14](principles.md#14-freshness-is-part-of-the-fact)).
- [ ] Made-up examples, simulations and agent authorship are labelled where they are read ([16](principles.md#16-mark-simulated-as-simulated-and-agents-as-agents)).
- [ ] Every number comes from data, with its source ([29](principles.md#29-generate-pages-from-the-record-so-they-cannot-drift)).

## States

- [ ] The empty state says why and offers one way forward ([24](principles.md#24-design-the-empty-offline-and-changed-states)).
- [ ] If a fact changed, every way in to it was checked ([25](principles.md#25-when-a-fact-changes-check-every-way-in-to-it)).

## After a fix

- [ ] The original finding is gone, and the whole first screen was re-measured on the phone ([28](principles.md#28-after-any-fix-re-measure-the-whole-first-screen-at-the-narrowest-width)).
