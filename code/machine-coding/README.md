# Machine coding practice (React + TypeScript)

10 problems that cover ~90% of frontend machine-coding rounds, each with tests.

```bash
cd code/machine-coding
npm install
npm run dev     # open the demo app (all problems in tabs)
npm test        # run Vitest + React Testing Library tests
```

## How to practise (important)
1. **Don't read the solution first.** Create `src/practice/<Problem>.tsx`, set a 45–60 min timer, and build it from the requirements below.
2. Talk out loud while coding (interviewers grade communication): clarify → plan components/state → build the happy path → edge cases → a11y → tests.
3. Then compare with the reference solution and the test file. Note what you missed in your tracker.
4. Rebuild the same problem 3–4 days later from scratch. Repetition is what makes it fast.

## The 5-step answer framework (use for every problem)
1. **Clarify (3–5 min):** data source? sync/async? how many items? mobile? a11y? which browsers? any libraries allowed?
2. **Design (5 min):** component tree, state (what, where, derived vs stored), props API, data flow.
3. **Build happy path (20–25 min):** working feature first, clean names.
4. **Edge cases (10 min):** loading/empty/error, race conditions, large data, keyboard, focus.
5. **Wrap up (5 min):** what you'd add with more time — tests, memoization, virtualization, caching, i18n.

---

## Problems

| # | Problem | Key concepts | Reference |
|---|---|---|---|
| 1 | **Autocomplete / typeahead** | debounce, AbortController, race conditions, keyboard nav, ARIA combobox, generics | `components/Autocomplete` |
| 2 | **Data table** (search, sort, paginate) | derived state with `useMemo`, immutable sort, page reset, `aria-sort` | `components/DataTable` |
| 3 | **Infinite scroll** | IntersectionObserver, cursor pagination, in-flight guard via ref, retry | `components/InfiniteList` |
| 4 | **Todo app** | `useReducer`, discriminated-union actions, filter as derived data, inline edit, localStorage | `components/TodoApp` |
| 5 | **Modal / dialog** | portal, focus trap, Escape, return focus, scroll lock | `components/Modal` |
| 6 | **Tabs** | compound components + context, controlled/uncontrolled, roving tabindex | `components/Tabs` |
| 7 | **Star rating** | hover preview, controlled/uncontrolled, radio-group a11y | `components/StarRating` |
| 8 | **OTP input** | array of refs, auto-advance, backspace, paste | `components/OtpInput` |
| 9 | **Accordion** | single vs multiple open (Set in state — always create a new Set) | `components/Accordion` |
| 10 | **Kanban board** | HTML5 drag & drop, keyboard fallback | `components/Kanban` |

Custom hooks: `useDebounce`, `useFetch`, `useLocalStorage`, `usePrevious`, `useOnClickOutside`, `useIntersectionObserver` in `src/hooks`.

### Requirements to build from (read these, not the code)

1. **Autocomplete:** Input searches users from `searchUsers(q, signal)` (random 100–500ms latency). Show max 8 suggestions with the match highlighted. Debounce 300ms. Show loading, empty and error states. ↑/↓ moves, Enter selects, Escape closes, outside click closes. An older slow response must never overwrite a newer one. *Follow-ups:* caching previous queries (Map/LRU), min chars, recent searches, virtualized list for 10k results.
2. **Data table:** 200 users. Columns: ID, Name, Email, Role, Age. Sort by clicking headers (asc → desc → none). Global search. 10 rows/page with Prev/Next. Search resets to page 1. *Follow-ups:* server-side sort/pagination via URL params, column filters, row selection with "select all", sticky header, virtualization.
3. **Infinite scroll:** load 20 users per request using a cursor; load more when the user nears the bottom; no duplicate requests; show "end of list"; error with retry. *Follow-ups:* virtualization, scroll restoration, bidirectional loading.
4. **Todo:** add (trim, ignore empty), toggle, edit by double-click (Enter saves, Escape cancels), delete, filter all/active/done, "N items left", clear completed, persist in localStorage.
5. **Modal:** opens from a button; closes on ✕, Escape and backdrop click (not when clicking inside); traps focus; returns focus to the opener; locks body scroll; accessible name from the title.
6. **Tabs:** `<Tabs><Tabs.List><Tabs.Tab/></Tabs.List><Tabs.Panel/></Tabs>`; works controlled and uncontrolled; ←/→/Home/End keyboard support.
7. **Star rating:** 5 stars; hover previews; click selects; clicking the selected star clears; arrow keys change; read-only mode.
8. **OTP:** 6 boxes, digits only, auto-advance, Backspace moves back, paste "123456" fills all, `onComplete(code)`.
9. **Accordion:** list of sections; prop decides single or multiple open; correct `aria-expanded`/`aria-controls`.
10. **Kanban:** 3 columns; drag cards between columns; buttons to move left/right for keyboard users. *Follow-ups:* reorder inside a column, persist, optimistic update with rollback.

### More problems to practise (no reference — build them yourself)
Progress bar with queue · Countdown/stopwatch · Image carousel (auto-play, pause on hover) · Nested comments (recursive component) · File explorer tree (expand/collapse, add folder) · Multi-step form with validation · Toast notification system (portal + queue + auto-dismiss) · Tic-tac-toe with winner check & undo · Pagination component with ellipsis (1 … 4 5 6 … 20) · Debounced search + URL sync · Dark-mode toggle with CSS variables · Chips/tag input · Poll widget · Traffic light · Grid light-up game · Transfer list · Virtualized list from scratch (fixed row height: `startIndex = Math.floor(scrollTop / rowHeight)`).
