# 03 — Interview rounds, mock interviews and final revision

## What the rounds usually look like
Processes differ by team and change often, so always ask the recruiter: "How many rounds, and what does each one cover?" This is the pattern candidates commonly report:

| Company type | Typical loop | What decides it |
|---|---|---|
| **Engineering MNCs** (Siemens, Schneider, Honeywell, Continental, ABB, Philips) | (Online test: JS/aptitude/MCQ) → Technical 1 (JS + React deep questions + small coding) → Technical 2 (project deep dive, architecture, live component or problem) → Managerial → HR | JS fundamentals, React depth, **your migration project**, communication |
| **Qualcomm / semiconductor** (frontend for tools & dashboards) | 2–4 technical rounds incl. JS/DSA coding + React + project, then manager/HR | Problem solving + solid fundamentals; frontend roles are fewer, so set job alerts |
| **Product / GCC** (Walmart, Target, Atlassian, Adobe, Intuit, PayPal) | DSA round (1–2 mediums) → machine coding (60–90 min) → JS/React depth → frontend system design → hiring manager/behavioral | Speed + clean code in machine coding, structured system design |
| **Consulting product** (Thoughtworks, Publicis Sapient) | Pair-programming/code assignment → technical discussion → culture | Clean code, testing, communication |

## How to behave in technical rounds
- Think out loud. Silence = interviewer can't give you credit.
- Clarify before coding. Repeat the question in your own words.
- If stuck: say what you know, try a smaller example, ask for a hint — a hint costs less than silence.
- For "what is X" questions: **definition → how it works → example from your project → pitfall**. That pattern makes you sound senior.
- Never bluff. "I haven't used that in production, but my understanding is…" is fine.
- Online coding: test with examples before saying "done"; handle edge cases.

## Mock interview scripts (do every weekend from Week 3)
Use a friend/colleague, Pramp/peer platforms, or record yourself answering out loud.

**Mock A — JS + React (45 min)**
1. Tell me about yourself (2 min)
2. 5 output questions from [javascript/39-interview-revision-sheet](../javascript/39-interview-revision-sheet/README.md) §14 (10 min)
3. Implement `debounce` and `Promise.all` from scratch (15 min)
4. React: rendering, keys, stale closure, useEffect cleanup, memo (10 min)
5. Your migration project deep-dive questions (8 min)

**Mock B — Machine coding (60 min)**: pick one problem from [code/machine-coding](../code/machine-coding/README.md) that you haven't built in the last 7 days. Requirements → build → edge cases → explain.

**Mock C — DSA (45 min)**: 1 easy (15 min) + 1 medium (30 min) from the list, unseen or 🔴/🟡.

**Mock D — System design (45 min)**: one prompt from [system-design/27-worked-designs](../system-design/27-worked-designs/README.md), using RADIO.

**Mock E — Managerial (30 min)**: why leaving, why us, conflict, failure, pressure, strengths/weaknesses, questions for them.

Score yourself 1–5 on: correctness, communication, structure, speed, edge cases. Log in the tracker.

## Final-week revision — the 100 questions
Answer each out loud in ≤ 90 seconds. Mark ✅ / ⚠️. Revisit all ⚠️ the next day.

**JavaScript (25):** var/let/const & TDZ · hoisting · closures + real use · `this` rules · call/apply/bind · arrow vs normal function · prototypes & inheritance · `new` steps · event loop, micro vs macro · promises & combinators · async/await internals · error handling in async code · `==` vs `===` & coercion · shallow vs deep copy · `structuredClone` · debounce vs throttle · currying · memoization · ESM vs CJS · tree shaking · garbage collection & leaks · `Map` vs object, `WeakMap` · generators · `Proxy` · event delegation.

**TypeScript (10):** type vs interface · any/unknown/never · generics + constraints · utility types · discriminated unions · type guards · `as const`/`satisfies` · mapped & conditional types · typing props/hooks/context · runtime validation.

**React (25):** render vs commit · re-render triggers · reconciliation & keys · Fiber · batching · setState updater · useEffect deps & cleanup · useLayoutEffect · stale closures · useRef uses · useMemo/useCallback/memo · useReducer vs useState · context pitfalls · Redux Toolkit flow · server vs client state, TanStack Query · controlled vs uncontrolled · error boundaries · portals · code splitting & Suspense · useTransition/useDeferredValue · SSR & hydration · RSC · React 19 features · testing with RTL · performance debugging story.

**Browser/CSS (20):** URL → page · critical rendering path · async vs defer · reflow vs repaint · storage comparison · cookies flags · CORS & preflight · XSS/CSRF/CSP · HTTP caching headers · HTTP/2 vs 1.1 · Web Vitals (LCP/INP/CLS) and fixes · service worker caching · WebSocket vs SSE · a11y basics & ARIA · box model · specificity · positioning & stacking context · flex vs grid · centering · responsive techniques.

**Migration & architecture (10):** why migrate · strategies (rewrite vs strangler vs micro-frontends) · how React ran inside AngularJS · shared state · routing ownership · testing for parity · ordering of migration · results/metrics · what you'd do differently · AngularJS digest vs React rendering.

**Behavioral (10):** tell me about yourself · why leave · why us · conflict · failure · pressure/deadline · leadership/mentoring · biggest achievement · strengths/weaknesses · expected CTC & notice period.

## Day-of-interview checklist
- [ ] Laptop charged, stable internet, IDE/CodeSandbox/StackBlitz ready, camera at eye level
- [ ] Resume + job description open; 3 points about the company
- [ ] Water, notebook for diagrams
- [ ] Join 5 min early; smile; think out loud
- [ ] After: write every question in your interview log within an hour
