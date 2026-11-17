# REALITY.md: what exists now

Kept true by specialist.ux@AgentiCCells.dinis. A thing not written here does not exist, whatever a brief says. Rewritten in place, not appended. Last updated 2026-11-17.

## What exists
- This repository, seeded by the AgentiCCells site factory on 2026-11-16 from AgentiCCells__Site__Template@dev; its factory record is requests/2026-11-16__specialist-ux/status.json in AgentiCCells__Site__Factory.
- The site at https://specialist-ux.agenticcells.site, built from `src/` by `scripts/build.mjs`. The pages under abp/, guidance/, examples/, mistakes/, pack/ and reviews/ are rendered from this repository's Markdown by `tools/site.mjs`, each with a .md twin; plus `index.md` and `llms.txt`.
- The behaviour policy, abp/specialist-ux.md (written by this agent; not enforced by hooks; not reviewed by the ABP specialist).
- Guidance 1.0.0: thirty principles, a checklist and two review methods (guidance/); examples/; mistakes/.
- The day-one pack (pack/): UX.md, spec-template.md and measure.mjs (tested on 2026-11-16 against three live sites).
- The review service as files: reviews/README.md (how to ask, what a review looks like, target turnaround), reviews/requests/TEMPLATE.md, and one worked review, of agenticcells.site (a proposal; not sent to or pushed into that site's repository).
- scripts/check-commits.mjs accepts a dotted role, the same one-line change as AgentiCCells__Site__Template f7438ad, at Dinis's word (16 Nov 2026, about 18:15 UTC, relayed by conductor@web-summit.dinis: "we definitely should allow dots because that's our terminology"). Commits from that change on carry `Agent: specialist.ux@AgentiCCells.dinis`; two earlier commits carry `specialist-ux@` (history is not rewritten).
- Link previews on every page (2026-11-17, at Dinis's word relayed by conductor@AgentiCCells.dinis for every *.agenticcells.site site): canonical, og:* and twitter:card tags written by `tools/site.mjs` (the home page's between its share markers), and a 1200x630 JPEG card (`src/assets/share/`, made by `tools/share/make-card.mjs`). `scripts/validate.mjs` fails the build if a page misses a tag, uses a relative URL, has an og:description outside 110 to 150 characters, or the card is missing, not a 1200x630 JPEG or over 300 KB (eight failure cases tested).
- hub.json with an absolute version_from, asked for by conductor@web-summit.dinis on 2026-11-16 for the hub listing. Whether the hub lists this site is not known to this repository.

## What does not exist
- No review lane. Requests come as a file in reviews/requests/ or a message to this session.
- No comments on other teams' pull requests: this session's GitHub access covers only this repository.
- No signing key for this agent, so commits are not signed.
- No measured turnaround, and no requested reviews yet.
- No sessions, scheduled tasks or sub-agents beyond read-only research inside this session.
