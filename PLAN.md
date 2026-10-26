# Day-by-day plan — from where you are now (Tue 27 Oct → Tue 15 Dec 2026)

You've completed **JavaScript** and **TypeScript** and are in the middle of **React**. This plan:
- restarts React with the **rewritten React notes** (the old files were mostly copied templates),
- keeps JS/TS fresh through daily **polyfill coding** and the new revision sheets,
- adds the **migration story**, **machine coding**, **web platform**, **system design**, **behavioral** and **mock interviews**,
- runs **DSA every day** (2 problems on weekdays, 3–4 on weekends) from the [120-problem list](dsa/problem-list/README.md).

**Time:** weekdays 2–3 h · weekends (⚡) 5–6 h.

| Weekday block | Time |
|---|---|
| DSA — 2 problems | 60 min |
| Learn — linked notes, run the code | 45 min |
| Practice — code from memory / answer out loud | 30 min |
| Career task + update [tracker.md](tracker.md) | 15 min |

**Rules:** "done" = you can explain it without notes and code it from memory · mark DSA 🔴/🟡/🟢 and redo 🔴/🟡 on weekends · missed a day? move on, catch up at the weekend · log every real interview in `interview/my-interview-log.md`.


---

## Week 1 — React fundamentals → hooks (re-study the rewritten notes)

### Day 1 — Tue 27 Oct · React: components, JSX, props
- [ ] **Learn:** [components](react/01-fundamentals/components/README.md) · [JSX](react/01-fundamentals/jsx/README.md) · [props](react/01-fundamentals/props/README.md) (rewritten — re-read even if you studied the old version).
- [ ] **Practice:** Polyfills warm-up: write `debounce` + `throttle` from memory → `npm test` in `code/polyfills`.
- [ ] **DSA:** LC 1 Two Sum · LC 217 Contains Duplicate
- [ ] **Career:** Start resume v1 using the [resume guide](interview/01-resume-and-job-search.md).

### Day 2 — Wed 28 Oct · React: state, events, composition
- [ ] **Learn:** [state](react/01-fundamentals/state/README.md) · [events](react/01-fundamentals/events/README.md) · [composition](react/01-fundamentals/children-and-composition/README.md).
- [ ] **Practice:** Build a shopping cart (add/remove/qty/total derived). Break it by mutating state, then fix.
- [ ] **DSA:** LC 242 Valid Anagram · LC 49 Group Anagrams
- [ ] **Career:** Collect your real migration numbers (screens, modules, users, perf).

### Day 3 — Thu 29 Oct · React: lifting state, derived state, forms, conditional rendering
- [ ] **Learn:** [lifting](react/01-fundamentals/lifting-state/README.md) · [derived](react/01-fundamentals/derived-state/README.md) · [controlled/uncontrolled](react/01-fundamentals/controlled-uncontrolled-forms/README.md) · [conditional](react/01-fundamentals/conditional-rendering/README.md).
- [ ] **Practice:** Polyfills: `myCall/myApply/myBind`, `once`, `memoize` from memory → tests.
- [ ] **DSA:** LC 347 Top K Frequent Elements · LC 238 Product of Array Except Self

### Day 4 — Fri 30 Oct · React: rendering model, reconciliation, keys
- [ ] **Learn:** [rendering model](react/02-rendering/rendering-model/README.md) · [render cycle](react/02-rendering/render-cycle/README.md) · [reconciliation](react/02-rendering/reconciliation/README.md) · [VDOM](react/02-rendering/virtual-dom/README.md) · [keys](react/02-rendering/keys/README.md).
- [ ] **Practice:** Reproduce the index-key bug with inputs, fix with ids. Predict the effect order of the render-cycle demo.
- [ ] **DSA:** LC 128 Longest Consecutive Sequence · LC 121 Best Time to Buy and Sell Stock

### Day 5 — Sat 31 Oct · ⚡ Weekend: hooks core
- [ ] **Learn:** [rules](react/03-hooks/hook-rules/README.md) · [useState](react/03-hooks/useState/README.md) · [useEffect](react/03-hooks/useEffect/README.md) · [useRef](react/03-hooks/useRef/README.md).
- [ ] **Practice:** Write the fetch-with-AbortController effect from memory; fix the stale-closure interval bug. Polyfills: `promiseAll`, `allSettled`, `race`, `any` → tests.
- [ ] **DSA:** LC 53 Maximum Subarray · LC 88 Merge Sorted Array · LC 26 Remove Duplicates from Sorted Array · LC 283 Move Zeroes
- [ ] **Career:** Resume v1 done. Update Naukri + LinkedIn profiles.

### Day 6 — Sun 01 Nov · ⚡ Weekend: hooks advanced + JS output drill
- [ ] **Learn:** [useMemo](react/03-hooks/useMemo/README.md) · [useCallback](react/03-hooks/useCallback/README.md) · [useReducer](react/03-hooks/useReducer/README.md) · [useContext](react/03-hooks/useContext/README.md) · [custom hooks](react/03-hooks/custom-hooks/README.md).
- [ ] **Practice:** Write `useDebounce`, `useLocalStorage`, `usePrevious`, `useFetch` from memory. Do the JS output drill §14 in [JS revision sheet](javascript/39-interview-revision-sheet/README.md) (target 15/15).
- [ ] **DSA:** LC 27 Remove Element · LC 169 Majority Element · LC 189 Rotate Array
- [ ] **Career:** Build target-company sheet (30+). Send 5 referral requests.

### Day 7 — Mon 02 Nov · React: concurrent hooks + React 19 hooks
- [ ] **Learn:** [useTransition](react/03-hooks/useTransition/README.md) · [useDeferredValue](react/03-hooks/useDeferredValue/README.md) · [useSyncExternalStore](react/03-hooks/useSyncExternalStore/README.md) · [useId](react/03-hooks/useId/README.md) · [useActionState](react/03-hooks/useActionState/README.md) · [useOptimistic](react/03-hooks/useOptimistic/README.md).
- [ ] **Practice:** Filter 10k rows while typing: measure lag, then try useMemo vs useDeferredValue vs useTransition.
- [ ] **DSA:** LC 268 Missing Number · LC 448 Find All Numbers Disappeared in an Array
- [ ] **Career:** **Start applying: 5–10 jobs/day from today.**


---

## Week 2 — React: state, data, forms, performance, testing

### Day 8 — Tue 03 Nov · React: state management
- [ ] **Learn:** [local](react/04-state-management/local-state/README.md) · [context](react/04-state-management/context/README.md) · [Redux Toolkit](react/04-state-management/redux/README.md) · [Zustand](react/04-state-management/zustand/README.md) · [architecture](react/04-state-management/state-architecture/README.md).
- [ ] **Practice:** Explain the 6 kinds of state with tools out loud (3 min). Build a small Zustand cart store.
- [ ] **DSA:** LC 387 First Unique Character in a String · LC 383 Ransom Note
- [ ] **Career:** Apply 5+.

### Day 9 — Wed 04 Nov · React: forms + routing
- [ ] **Learn:** [RHF + Zod](react/05-forms/README.md) · [form actions](react/05-forms/form-actions-and-useFormStatus/README.md) · [routing](react/06-routing/README.md) · [protected routes](react/06-routing/protected-routes/README.md).
- [ ] **Practice:** Build a signup form with RHF + Zod; a protected route with redirect back after login.
- [ ] **DSA:** LC 125 Valid Palindrome · LC 344 Reverse String
- [ ] **Career:** Apply 5+.

### Day 10 — Thu 05 Nov · React: data fetching
- [ ] **Learn:** [overview](react/07-data-fetching/README.md) · [server state](react/07-data-fetching/server-state/README.md) · [TanStack Query](react/07-data-fetching/tanstack-query/README.md) · [caching](react/07-data-fetching/caching-invalidation/README.md).
- [ ] **Practice:** Write an optimistic mutation with rollback (TanStack Query) from memory.
- [ ] **DSA:** LC 167 Two Sum II · LC 977 Squares of a Sorted Array
- [ ] **Career:** Apply 5+.

### Day 11 — Fri 06 Nov · React: errors + auth
- [ ] **Learn:** [error strategy](react/08-error-handling/README.md) · [error boundaries](react/08-error-handling/error-boundaries/README.md) · [authentication](react/09-authentication/README.md) · [authorization](react/10-authorization/README.md).
- [ ] **Practice:** Write an ErrorBoundary class from memory. Explain token storage trade-offs in 90 sec.
- [ ] **DSA:** LC 392 Is Subsequence · LC 15 3Sum
- [ ] **Career:** Apply 5+.

### Day 12 — Sat 07 Nov · ⚡ Weekend: performance + machine coding #1
- [ ] **Learn:** [memoization](react/11-performance/memoization/README.md) · [profiling](react/11-performance/profiling/README.md) · [code splitting](react/11-performance/code-splitting/README.md) · [virtualization](react/11-performance/virtualization/README.md) · [Web Vitals](react/11-performance/web-vitals/README.md).
- [ ] **Practice:** Timed 60 min: **Autocomplete** from the requirements in [machine coding](code/machine-coding/README.md), then compare + run tests. Write the VirtualList from memory.
- [ ] **DSA:** LC 11 Container With Most Water · LC 680 Valid Palindrome II · LC 290 Word Pattern · LC 14 Longest Common Prefix
- [ ] **Career:** Prepare your performance STAR story with numbers.

### Day 13 — Sun 08 Nov · ⚡ Weekend: testing + a11y + machine coding #2
- [ ] **Learn:** [unit](react/12-testing/unit-testing/README.md) · [RTL](react/12-testing/component-testing/README.md) · [integration/E2E](react/12-testing/integration-testing/README.md) · [accessibility](react/13-accessibility/README.md).
- [ ] **Practice:** Timed: **Modal** (focus trap) + **Todo**. Write RTL tests for your own Todo.
- [ ] **DSA:** LC 42 Trapping Rain Water · LC 36 Valid Sudoku
- [ ] **Career:** Redo all 🔴/🟡 DSA so far.

### Day 14 — Mon 09 Nov · React 19 + advanced React
- [ ] **Learn:** [React 19](react/14-modern-react/react-19-actions/README.md) · [concurrent](react/15-advanced-react/concurrent-rendering/README.md) · [Suspense](react/15-advanced-react/suspense/README.md).
- [ ] **Practice:** Explain 'what's new in React 19' and concurrent rendering in 90 sec each.
- [ ] **DSA:** LC 643 Maximum Average Subarray I · LC 209 Minimum Size Subarray Sum
- [ ] **Career:** Apply 5+.


---

## Week 3 — Advanced React, architecture, migration story

### Day 15 — Tue 10 Nov · SSR, hydration, streaming, RSC
- [ ] **Learn:** [hydration](react/15-advanced-react/hydration/README.md) · [streaming](react/15-advanced-react/streaming/README.md) · [Server Components](react/15-advanced-react/server-components/README.md).
- [ ] **Practice:** Explain CSR vs SSR vs SSG vs RSC on a whiteboard; list 5 hydration-mismatch causes.
- [ ] **DSA:** LC 3 Longest Substring Without Repeating Characters · LC 424 Longest Repeating Character Replacement
- [ ] **Career:** Apply 5+.

### Day 16 — Wed 11 Nov · React architecture
- [ ] **Learn:** [components](react/16-architecture/component-architecture/README.md) · [feature folders](react/16-architecture/feature-based-architecture/README.md) · [design systems](react/16-architecture/design-systems/README.md) · [reusable](react/16-architecture/reusable-components/README.md) · [patterns](react/16-architecture/frontend-patterns/README.md).
- [ ] **Practice:** Draw the folder structure + component tree for a device-management app. Write a HOC and a compound component.
- [ ] **DSA:** LC 567 Permutation in String · LC 438 Find All Anagrams in a String
- [ ] **Career:** Apply 5+.

### Day 17 — Thu 12 Nov · React interview Q&A
- [ ] **Learn:** [50 questions + code-reading round](react/17-interview-questions/README.md).
- [ ] **Practice:** Answer all 50 out loud; mark ⚠️. Do the 8 code-reading questions without peeking.
- [ ] **DSA:** LC 724 Find Pivot Index · LC 303 Range Sum Query - Immutable
- [ ] **Career:** Apply 5+.

### Day 18 — Fri 13 Nov · React debugging case studies
- [ ] **Learn:** [depth](react/18-depth-and-interview-engineering/README.md) · [10 case studies](react/18-depth-and-interview-engineering/case-studies.md).
- [ ] **Practice:** Explain each case: symptom → cause → confirm → fix → prevent.
- [ ] **DSA:** LC 560 Subarray Sum Equals K · LC 76 Minimum Window Substring
- [ ] **Career:** Apply 5+. Follow up referrals.

### Day 19 — Sat 14 Nov · ⚡ Weekend: AngularJS/Angular + migration strategies
- [ ] **Learn:** [Migration notes](angularjs-to-react-migration/README.md) Parts A & B.
- [ ] **Practice:** Explain digest cycle, $scope inheritance, service/factory/provider, OnPush, switchMap. Write the React-in-AngularJS bridge from memory.
- [ ] **DSA:** LC 20 Valid Parentheses · LC 155 Min Stack · LC 232 Implement Queue using Stacks · LC 225 Implement Stack using Queues
- [ ] **Career:** Schedule 1–2 calibration interviews.

### Day 20 — Sun 15 Nov · ⚡ Weekend: your migration story + machine coding #3
- [ ] **Learn:** [Migration notes](angularjs-to-react-migration/README.md) Part C (STAR) + deep-dive questions.
- [ ] **Practice:** Write your STAR story with real numbers; record 2-min and 8-min versions. Timed: **Data table**.
- [ ] **DSA:** LC 150 Evaluate Reverse Polish Notation · LC 71 Simplify Path
- [ ] **Career:** Add migration bullets to resume. Post on LinkedIn about the migration.

### Day 21 — Mon 16 Nov · Tooling, Git, CI
- [ ] **Learn:** [Tooling notes](tooling/README.md).
- [ ] **Practice:** Explain Vite vs webpack, tree shaking, merge vs rebase, your CI pipeline.
- [ ] **DSA:** LC 394 Decode String · LC 496 Next Greater Element I
- [ ] **Career:** Apply 5+.


---

## Week 4 — Web platform + CSS + machine coding

### Day 22 — Tue 17 Nov · Browser: URL → page, rendering, events
- [ ] **Learn:** [Web platform sheet](web-platform/00-interview-revision-sheet/README.md) §1–2.
- [ ] **Practice:** Draw the critical rendering path; implement event delegation in plain JS.
- [ ] **DSA:** LC 739 Daily Temperatures · LC 735 Asteroid Collision
- [ ] **Career:** Apply 5+.

### Day 23 — Wed 18 Nov · Browser: storage, HTTP, caching, CORS
- [ ] **Learn:** [Web platform sheet](web-platform/00-interview-revision-sheet/README.md) §3–4.
- [ ] **Practice:** In DevTools Network find cache headers, a preflight, cookie flags on a real site.
- [ ] **DSA:** LC 704 Binary Search · LC 35 Search Insert Position
- [ ] **Career:** Apply 5+.

### Day 24 — Thu 19 Nov · Browser: security + Web Vitals
- [ ] **Learn:** [Web platform sheet](web-platform/00-interview-revision-sheet/README.md) §5–6.
- [ ] **Practice:** Lighthouse on a page of your project: note LCP/INP/CLS + 3 fixes.
- [ ] **DSA:** LC 278 First Bad Version · LC 34 Find First and Last Position of Element
- [ ] **Career:** Apply 5+.

### Day 25 — Fri 20 Nov · Browser: workers, PWA, real-time, a11y
- [ ] **Learn:** [Web platform sheet](web-platform/00-interview-revision-sheet/README.md) §7–8.
- [ ] **Practice:** WebSocket vs SSE vs polling with use-cases; run axe DevTools and fix 2 issues.
- [ ] **DSA:** LC 74 Search a 2D Matrix · LC 153 Find Minimum in Rotated Sorted Array
- [ ] **Career:** Apply 5+.

### Day 26 — Sat 21 Nov · ⚡ Weekend: CSS deep dive + machine coding #4
- [ ] **Learn:** [Web platform sheet](web-platform/00-interview-revision-sheet/README.md) §9 (CSS).
- [ ] **Practice:** Build a responsive dashboard layout with Grid (no framework). Timed: **Infinite scroll** + **Star rating**.
- [ ] **DSA:** LC 33 Search in Rotated Sorted Array · LC 875 Koko Eating Bananas · LC 206 Reverse Linked List · LC 21 Merge Two Sorted Lists
- [ ] **Career:** Calibration interview #1.

### Day 27 — Sun 22 Nov · ⚡ Weekend: machine coding #5 + mock #1
- [ ] **Learn:** [Machine coding](code/machine-coding/README.md).
- [ ] **Practice:** Timed: **OTP input** + **Tabs**. **Mock A** (JS + React) from [mocks](interview/03-rounds-mocks-final-revision.md).
- [ ] **DSA:** LC 141 Linked List Cycle · LC 876 Middle of the Linked List
- [ ] **Career:** Redo 🔴/🟡 DSA.

### Day 28 — Mon 23 Nov · TypeScript revision
- [ ] **Learn:** [TS revision sheet](typescript/35-interview-revision-sheet/README.md).
- [ ] **Practice:** Write 6 utility types from memory; type a custom hook + context.
- [ ] **DSA:** LC 234 Palindrome Linked List · LC 160 Intersection of Two Linked Lists
- [ ] **Career:** Apply 5+.


---

## Week 5 — System design + behavioral

### Day 29 — Tue 24 Nov · System design: RADIO + autocomplete
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) framework + design 1.
- [ ] **Practice:** 45-min design on paper before reading the solution.
- [ ] **DSA:** LC 19 Remove Nth Node From End of List · LC 2 Add Two Numbers
- [ ] **Career:** Apply 5+.

### Day 30 — Wed 25 Nov · System design: IoT / operations dashboard
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) design 2 (likely at Siemens/Honeywell/Schneider).
- [ ] **Practice:** Design it yourself first; relate it to dashboards in your Bosch project.
- [ ] **DSA:** LC 143 Reorder List · LC 146 LRU Cache
- [ ] **Career:** Apply 5+.

### Day 31 — Thu 26 Nov · System design: news feed + chat
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) designs 3–4.
- [ ] **Practice:** Cursor vs offset pagination; optimistic message sending.
- [ ] **DSA:** LC 94 Binary Tree Inorder Traversal · LC 104 Maximum Depth of Binary Tree
- [ ] **Career:** Apply 5+.

### Day 32 — Fri 27 Nov · System design: design system, forms, upload, micro-frontends
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) designs 5–8.
- [ ] **Practice:** Present your migration as a micro-frontend/strangler design (design 8).
- [ ] **DSA:** LC 100 Same Tree · LC 226 Invert Binary Tree
- [ ] **Career:** Apply 5+.

### Day 33 — Sat 28 Nov · ⚡ Weekend: behavioral prep
- [ ] **Learn:** [Behavioral guide](interview/02-behavioral-hr-negotiation.md).
- [ ] **Practice:** Write all 8 STAR stories in `interview/my-stories.md`. Record 'tell me about yourself' until smooth in 90 sec.
- [ ] **DSA:** LC 101 Symmetric Tree · LC 112 Path Sum · LC 543 Diameter of Binary Tree · LC 110 Balanced Binary Tree
- [ ] **Career:** Calibration interview #2.

### Day 34 — Sun 29 Nov · ⚡ Weekend: mock loop #2 + Kanban
- [ ] **Learn:** [Mocks](interview/03-rounds-mocks-final-revision.md).
- [ ] **Practice:** **Mock D** (system design prompt 6) + **Mock E** (managerial). Timed: **Kanban**.
- [ ] **DSA:** LC 572 Subtree of Another Tree · LC 102 Binary Tree Level Order Traversal
- [ ] **Career:** Redo 🔴/🟡 DSA.

### Day 35 — Mon 30 Nov · JS revision sheet
- [ ] **Learn:** [JS revision sheet](javascript/39-interview-revision-sheet/README.md) §1–8.
- [ ] **Practice:** Rewrite from memory: `deepClone`, `EventEmitter`, `promisePool`, `retry` → tests.
- [ ] **DSA:** LC 199 Binary Tree Right Side View · LC 235 Lowest Common Ancestor of a BST
- [ ] **Career:** Apply 5+.


---

## Week 6 — Revision + full mock loops

### Day 36 — Tue 01 Dec · JS revision sheet (part 2)
- [ ] **Learn:** [JS revision sheet](javascript/39-interview-revision-sheet/README.md) §9–15.
- [ ] **Practice:** Answer the 15 theory questions out loud.
- [ ] **DSA:** LC 236 Lowest Common Ancestor of a Binary Tree · LC 98 Validate Binary Search Tree
- [ ] **Career:** Apply 5+.

### Day 37 — Wed 02 Dec · React revision: hooks + rendering
- [ ] **Learn:** [Q&A](react/17-interview-questions/README.md) sections A–B.
- [ ] **Practice:** Re-answer every ⚠️ from day 17.
- [ ] **DSA:** LC 230 Kth Smallest Element in a BST · LC 105 Construct Binary Tree from Preorder and Inorder
- [ ] **Career:** Apply 5+.

### Day 38 — Thu 03 Dec · React revision: state, data, performance
- [ ] **Learn:** [Q&A](react/17-interview-questions/README.md) sections C–F.
- [ ] **Practice:** Performance story + state architecture explanation, recorded.
- [ ] **DSA:** LC 703 Kth Largest Element in a Stream · LC 1046 Last Stone Weight
- [ ] **Career:** Apply 5+.

### Day 39 — Fri 04 Dec · Machine coding: Autocomplete rebuild (45 min, no reference)
- [ ] **Learn:** —
- [ ] **Practice:** Debounce, abort, keyboard nav, loading/empty/error.
- [ ] **DSA:** LC 215 Kth Largest Element in an Array · LC 973 K Closest Points to Origin
- [ ] **Career:** Apply 5+.

### Day 40 — Sat 05 Dec · ⚡ Weekend: full mock loop #3
- [ ] **Learn:** [Mocks](interview/03-rounds-mocks-final-revision.md).
- [ ] **Practice:** **Mock A + Mock B** back to back. Score yourself.
- [ ] **DSA:** LC 56 Merge Intervals · LC 57 Insert Interval · LC 435 Non-overlapping Intervals · LC 55 Jump Game
- [ ] **Career:** Follow up on applications older than 7 days.

### Day 41 — Sun 06 Dec · ⚡ Weekend: full mock loop #4
- [ ] **Learn:** [Mocks](interview/03-rounds-mocks-final-revision.md).
- [ ] **Practice:** **Mock C + Mock D + Mock E**.
- [ ] **DSA:** LC 78 Subsets · LC 46 Permutations · LC 200 Number of Islands
- [ ] **Career:** Redo 🔴/🟡 DSA.

### Day 42 — Mon 07 Dec · Machine coding: Data table rebuild (45 min)
- [ ] **Learn:** —
- [ ] **Practice:** Search → sort → paginate + page reset.
- [ ] **DSA:** LC 994 Rotting Oranges · LC 207 Course Schedule
- [ ] **Career:** Apply 5+.


---

## Week 7 — Interview sprint

### Day 43 — Tue 08 Dec · System design: e-commerce listing
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) prompt 6.
- [ ] **Practice:** 45 min with RADIO, then self-review checklist.
- [ ] **DSA:** LC 70 Climbing Stairs · LC 198 House Robber
- [ ] **Career:** Prepare HR answers (CTC, notice, joining).

### Day 44 — Wed 09 Dec · System design: 100k-row data grid
- [ ] **Learn:** [Worked designs](system-design/27-worked-designs/README.md) prompt 11.
- [ ] **Practice:** Virtualization, server pagination, column state, a11y.
- [ ] **DSA:** LC 322 Coin Change · LC 139 Word Break

### Day 45 — Thu 10 Dec · Final revision: JS + TS
- [ ] **Learn:** [100 questions](interview/03-rounds-mocks-final-revision.md) JS + TS.
- [ ] **Practice:** ≤ 90 s per answer; mark ✅/⚠️.
- [ ] **DSA:** 2 ⭐ redo problems (timed)

### Day 46 — Fri 11 Dec · Final revision: React + browser
- [ ] **Learn:** [100 questions](interview/03-rounds-mocks-final-revision.md) React + Browser/CSS.
- [ ] **Practice:** Re-answer all ⚠️.
- [ ] **DSA:** 2 ⭐ redo problems (timed)

### Day 47 — Sat 12 Dec · ⚡ Weekend: final full mock
- [ ] **Learn:** [Mocks](interview/03-rounds-mocks-final-revision.md).
- [ ] **Practice:** One full loop (A + B + E).
- [ ] **DSA:** 3 mixed mediums (timed)

### Day 48 — Sun 13 Dec · ⚡ Weekend: migration + behavioral + negotiation
- [ ] **Learn:** [100 questions](interview/03-rounds-mocks-final-revision.md) Migration + Behavioral; [negotiation playbook](interview/02-behavioral-hr-negotiation.md).
- [ ] **Practice:** Rehearse the counter-offer script out loud.
- [ ] **DSA:** 2 ⭐ redo

### Day 49 — Mon 14 Dec · Weak areas from your interview log
- [ ] **Learn:** `interview/my-interview-log.md`.
- [ ] **Practice:** Fix your top 5 gaps.
- [ ] **DSA:** 2 ⭐ redo


---

## Week 8 — Final days

### Day 50 — Tue 15 Dec · Retrospective + next 30 days
- [ ] **Learn:** Review `tracker.md`: scores, gaps, interviews, offers.
- [ ] **Practice:** Keep going until you sign: 1 hr DSA/day, 1 machine-coding build + 1 system design per week, mocks before every interview.
- [ ] **DSA:** —
- [ ] **Career:** Negotiate offers using the playbook. Don't accept on the call.

---

**After Day 50:** keep interviewing — most people get offers between week 6 and week 12. Consistency wins.
