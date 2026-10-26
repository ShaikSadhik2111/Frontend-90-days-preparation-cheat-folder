# CHANGES — repo update (26 Oct 2026)

Review everything in VS Code → **Source Control** (Ctrl+Shift+G) before committing. Nothing is committed or pushed yet.
Line endings were kept as Windows CRLF. Git may list ~196 extra files as "modified" only because of line endings (no content change) — that existed before this update.

## 1. React — rewritten (73 files, same folders & file names)
The old files were almost identical templates (only the "What it is" line differed; e.g. the Context page's example was a list with keys).
Every topic now has: mental model → correct code → common bugs & fixes → interview questions → practice task.
New depth: `react/17-interview-questions` (50 Q&A with model answers + 8 code-reading questions), `react/18-depth-and-interview-engineering/case-studies.md` (10 debugging scenarios), `react/README.md` (clickable index).

## 2. Web platform — rewritten (20 numbered topics) + revision sheet
`web-platform/01…20` now contain full explanations, code and interview questions (URL → page, HTML, CSS, DOM, events, rendering, storage, HTTP, fetch, caching, workers, service workers, real-time, security, a11y, performance, DevTools, web components, modern APIs, drills).
New: `web-platform/00-interview-revision-sheet`. Index: `web-platform/README.md`.

## 3. System design — rewritten (26 numbered topics) + worked designs
Each topic is now a design-round guide with decision tables. New: `system-design/27-worked-designs` (RADIO framework + 8 full designs incl. IoT dashboard and micro-frontend migration). `real-world-designs/` kept. Index: `system-design/README.md`.

## 4. Machine coding — rewritten (30 lessons + 8 flagship specs)
Lessons with code (debounce/throttle, races, pagination, infinite scroll, grids, virtualization, undo/redo, uploads, DnD, concurrency…). Flagship specs in `machine-coding/flagships/`. Index: `machine-coding/README.md`.

## 5. New: runnable practice code
- `code/polyfills` — 30+ interview utilities with tests (`npm test`, no install).
- `code/machine-coding` — React 18 + TS app with 10 problems and Vitest/RTL tests (`npm install`, `npm run dev`, `npm test`).

## 6. New sections
- `angularjs-to-react-migration/` — AngularJS & Angular concepts, migration strategies, bridge code, STAR story template.
- `interview/` — resume & job search, behavioral/HR/negotiation, rounds & mocks & final 100 questions, `my-stories.md`, `my-interview-log.md`.
- `tooling/` — Vite/webpack, testing, Git, CI/CD.
- `javascript/39-interview-revision-sheet` (with output-prediction drill), `typescript/35-interview-revision-sheet`.
- `dsa/problem-list` — pattern templates (verified) + 120-problem list.
- `PLAN.md` — dated day-by-day plan 27 Oct → 15 Dec 2026, starting from React (JS ✅, TS ✅). `ROADMAP-90-120-DAYS.md` marked as superseded.
- `tracker.md` — daily log, DSA redo queue, mock scores, applications.
- Root `README.md` rewritten as an index; `.gitignore` added (node_modules, dist, …).

## 7. Removed (198 files — duplicates/stubs)
- `web-platform/{accessibility,browser,css,html,networking,performance,security}/` — 1–5 line stubs duplicated by the numbered topics.
- `system-design/` unnumbered stub folders (e.g. `caching/`, `security/`, `testing/` …) — kept `real-world-designs/`.
- 51 × `deep-study.md` in `system-design/NN-*` and `machine-coding/NN-*` — short outlines, merged into the rewritten READMEs.
- `machine-coding/{advanced,application-components,common-components,data-display,forms,fundamentals,interaction,interview-framework,testing}/` and `flagship-problems.md` — stubs/duplicates of numbered lessons.
Not committed yet: restore anything with `git restore <path>` (or all deletions with `git restore .` — careful, that also undoes edits).

## Not changed
`javascript/` and `typescript/` topic files (real content; only added a revision-sheet link to their READMEs), `dsa/` pattern notes, `ai/`, `backend/`.
