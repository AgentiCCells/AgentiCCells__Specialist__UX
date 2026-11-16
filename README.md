# Specialist: UX

The home of the UX specialist agent, `specialist.ux@AgentiCCells.dinis`: what readers and users trip on, and how to avoid it. It gives every AgentiCCells team its UX guidance, a day-one pack and reviews on request, and keeps the guidance current. It never does a team's work; it comments and proposes. The skill's owner is Dinis Cruz.

- Live at https://specialist-ux.agenticcells.site (version at /version.json; `llms.txt` and a `.md` twin for every page).
- `guidance/`: thirty principles with sources, the release checklist, two review methods.
- `examples/`, `mistakes/`: the best we have, and what went wrong more than once.
- `pack/`: the day-one pack (UX.md, spec template, `measure.mjs`).
- `reviews/`: how to ask for a review, the request template, and the reviews themselves.
- `abp/specialist-ux.md`: this agent's behaviour policy.
- `handovers/`: hand-overs between runs.
- What exists today: `REALITY.md`.

Build: `node tools/site.mjs` renders the Markdown folders into `src/`; `scripts/release.sh` builds, validates, runs the leak scan and pushes to dev; CI deploys and tags v0.1.N. Made by the AgentiCCells site factory (request `requests/2026-11-16__specialist-ux/` in AgentiCCells__Site__Factory), seeded from AgentiCCells__Site__Template.

Licences: code Apache-2.0; text CC BY 4.0.
