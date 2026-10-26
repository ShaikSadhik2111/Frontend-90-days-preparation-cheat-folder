# Frontend 90 Days Preparation Cheat Folder

Interview preparation for a **senior frontend / product engineering** switch (target: engineering MNCs like Siemens, Schneider, Honeywell, Continental and Qualcomm, plus product companies like Walmart, Target, Atlassian and Adobe).

> **Start here → [PLAN.md](PLAN.md)** — a dated, day-by-day plan (27 Oct → 15 Dec 2026) that continues from where I am: JavaScript ✅ · TypeScript ✅ · React 🔄.
> Track progress in [tracker.md](tracker.md). See [CHANGES.md](CHANGES.md) for what was updated.

## Tracks

| Track | What's inside | Status |
|---|---|---|
| [javascript/](javascript) | 38 topics + [interview revision sheet & output drill](javascript/39-interview-revision-sheet/README.md) | ✅ done → revise |
| [typescript/](typescript) | 34 topics + [interview revision sheet](typescript/35-interview-revision-sheet/README.md) | ✅ done → revise |
| [react/](react/README.md) | 18 sections, 73 topic files (rewritten), [50 Q&A](react/17-interview-questions/README.md), [debugging case studies](react/18-depth-and-interview-engineering/case-studies.md) | 🔄 in progress |
| [angularjs-to-react-migration/](angularjs-to-react-migration/README.md) | AngularJS & Angular concepts, migration strategies, bridge code, STAR story template | ⭐ my differentiator |
| [web-platform/](web-platform) | [Interview revision sheet](web-platform/00-interview-revision-sheet/README.md) (URL → page, rendering, storage, HTTP/caching, CORS, security, Web Vitals, CSS) + topic folders | |
| [system-design/](system-design) | Topic folders + [RADIO framework & 8 worked designs](system-design/27-worked-designs/README.md) | |
| [machine-coding/](machine-coding) | Interview framework & problem notes | |
| [code/machine-coding](code/machine-coding/README.md) | **Runnable** React + TS practice app: 10 problems with tests | practise timed |
| [code/polyfills](code/polyfills) | **Runnable** JS utilities (debounce, throttle, Promise.all/any, MyPromise, bind, deepClone, EventEmitter, LRU, promisePool …) with tests | write from memory |
| [dsa/](dsa) | Pattern notes + [templates & 120-problem list](dsa/problem-list/README.md) | 2 problems/day |
| [tooling/](tooling/README.md) | Vite/webpack, testing, Git, CI/CD | |
| [interview/](interview) | [Resume & job search](interview/01-resume-and-job-search.md) · [behavioral, HR & negotiation](interview/02-behavioral-hr-negotiation.md) · [rounds, mocks & final 100 questions](interview/03-rounds-mocks-final-revision.md) · my stories & interview log | |
| [ai/](ai), [backend/](backend) | Optional — after the core interview prep | later |

## Run the code
```bash
# polyfills (Node 18+, no install)
cd code/polyfills && npm test

# machine-coding app (React 18 + Vite + Vitest)
cd code/machine-coding && npm install
npm run dev     # demo app with all problems
npm test        # tests
```

## Learning standard
A topic is done when I can **explain it without notes, code it from memory, and answer follow-up questions** — not when I've read it.

For DSA: **understand → constraints → brute force → bottleneck → pattern → implementation → dry run → complexity → edge cases.**

## Daily commit habit
Commit practice code, tracker updates and notes every day. A consistent contribution graph is visible to recruiters.
