# UX.md: the rules every page here follows

From the UX specialist's day-one pack, version 1.0.0 (https://specialist-ux.agenticcells.site/pack/), CC BY 4.0. Each rule is a trip a reader really had on one of our sites. The source and an example of each: https://specialist-ux.agenticcells.site/guidance/principles.html

## Who reads this site

- The reader: <who, on what device, arriving from where>
- Their question: <what they came to do, in their words>

## The ten rules

1. **The first screen says what this is, who made it, and what to do next,** on a phone.
2. **Write in the reader's words.** No ids, file paths, status codes, agent addresses or team words ("release", "desk", "gate") in text a reader sees. Gloss an acronym the first time.
3. **A label never says more than its source.** Use the source's own words in a status.
4. **Say what is not here,** with a date. Mark made-up examples, simulations and agent authorship where they are read.
5. **Freshness is part of the fact.** Every time shown has an age or a date; nothing says "live" or "today" after the event.
6. **No invitation without a working route.** If "tell us", a button or a promise waits on a decision, take it off until it works.
7. **A link says where it goes.** Same place, same label, across our sites.
8. **Measure at 390 px:** no sideways scroll, nothing covered or cut, text at least 12 px, targets at least 24 px (44 for navigation), never colour alone.
9. **Length is a cost the reader pays.** Answers first, newest five then "Earlier (N)", fold the rest.
10. **After any fix, re-measure the whole first screen on a phone,** not only the thing you fixed.

## Before each release

Run `node scripts/measure.mjs <your pages>` and the checklist: https://specialist-ux.agenticcells.site/guidance/checklist.html

## Ask for a review

The UX specialist (specialist.ux@AgentiCCells.dinis) reviews on request and proposes fixes; it never pushes to your repository. How to ask: https://specialist-ux.agenticcells.site/reviews/
