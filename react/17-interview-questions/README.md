# React interview questions — with model answers

> Cover the answer, say yours out loud (60–90 s), then compare. Mark ✅ / ⚠️ in your tracker and revisit ⚠️ ones.

## A. Fundamentals & rendering
1. **What happens when you call `setState`?**
   React queues the update and schedules a re-render. The current render's variable doesn't change (snapshot). Updates in the same tick are batched. On re-render React computes the new tree, reconciles, commits DOM changes, then runs effects.
2. **When does a component re-render?** Own state change, parent re-render, consumed context change, subscribed external store change. Props don't trigger by themselves.
3. **What is reconciliation?** Diffing old/new element trees: different type → replace subtree; same type → update props and recurse; lists matched by key.
4. **Why keys? Why not index?** Keys give identity across renders. Index keys break when items are inserted/removed/reordered → state/DOM attached to the wrong item.
5. **What is Fiber?** React's internal unit of work and architecture since v16 enabling incremental, interruptible, prioritised rendering.
6. **Virtual DOM — is it faster than the DOM?** It's a tree of JS objects used to compute minimal DOM updates; not inherently faster than targeted DOM code, but enables declarative UI with good performance.
7. **Controlled vs uncontrolled components?** State in React (`value`+`onChange`) vs state in the DOM (`defaultValue` + ref/FormData). Trade-off: control vs simplicity/performance.
8. **Why must render be pure?** React may render multiple times, pause or discard work (Strict Mode, concurrency); side effects in render would be unpredictable.
9. **What is Strict Mode doing?** Dev-only: double-invokes renders, runs effect setup/cleanup/setup, warns on deprecated APIs.
10. **What is lifting state up?** Moving shared state to the closest common parent; children get props + callbacks.

## B. Hooks
11. **Rules of Hooks and why?** Top level only, only in components/hooks — React matches hook state by call order.
12. **useEffect vs useLayoutEffect?** After paint (non-blocking) vs before paint (blocks, for measuring layout to avoid flicker).
13. **When does effect cleanup run?** Before the effect re-runs (deps changed) and on unmount.
14. **What is a stale closure? Example + fix.** A callback captured old state (e.g. interval with `[]` deps reading `count`). Fix: updater function, correct deps, or a ref to the latest value.
15. **useMemo vs useCallback vs React.memo?** Cache value vs cache function vs skip component re-render on equal props. Only useful together with something that depends on reference equality.
16. **useRef vs useState?** Ref: mutable, no re-render, for DOM/timers/latest values. State: triggers re-render, for UI.
17. **When do you choose useReducer?** Related state, many transitions, next state depends on previous; testable pure reducer; stable `dispatch`.
18. **How does Context cause re-renders and how do you optimise it?** All consumers re-render on value change. Memoize value, split contexts, separate dispatch, use a selector store for hot data.
19. **What is a custom hook? Do components share its state?** Function using hooks to reuse logic; each call has independent state.
20. **How do you fetch data in useEffect without race conditions?** AbortController (or ignore flag) in cleanup; check `res.ok`; handle loading/error/empty. In production, TanStack Query.
21. **useTransition vs useDeferredValue vs debounce?** Transition marks your setter as non-urgent; deferred value lags a value you receive; debounce delays work by time (good for network).
22. **What is useSyncExternalStore for?** Subscribing to external stores safely in concurrent rendering (no tearing).
23. **Why does my effect run twice in development?** Strict Mode checks that cleanup is correct.

## C. State, data, architecture
24. **Server state vs client state?** Remote cached data (staleness, dedupe, invalidation) vs UI-owned data. Use a query library for server state.
25. **Context vs Redux vs Zustand?** DI without selectors vs structured store with middleware/devtools vs minimal selector-based store. Choose by scale, update frequency and team conventions.
26. **Explain Redux flow / RTK.** dispatch(action) → middleware → pure reducer → new state → selectors re-render subscribers. RTK: `createSlice` (Immer), `configureStore`, thunks, RTK Query.
27. **How do you handle optimistic updates?** Snapshot → update UI → send → rollback on error → refetch/invalidate on settle; temp ids.
28. **How do you structure a large React app?** Feature folders with public APIs, shared UI kit, API layer, hooks, lazy routes, lint-enforced boundaries.
29. **Where do you keep filters/pagination state?** URL search params.
30. **How do you prevent prop drilling?** Composition, context, store.

## D. Performance
31. **How do you find performance problems?** React Profiler (why did this render), Chrome Performance, Lighthouse/Web Vitals, bundle analyzer. Measure before/after.
32. **Techniques to optimise?** Colocate state, lift content up, memo with stable props, virtualization, code splitting, transitions/deferred values, debounce, web workers, smaller bundles.
33. **Why might React.memo not work?** New object/function/children props each render, context change, own state change.
34. **What is code splitting and how in React?** Dynamic `import()` → `React.lazy` + Suspense, per route and heavy widgets; error boundary for chunk failures.
35. **How do you render 100k rows?** Virtualization (+ server pagination/filtering), memoized rows, stable keys.
36. **What are Core Web Vitals?** LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — and how React apps affect each.

## E. Advanced / modern
37. **What is Suspense?** Declarative loading boundary for lazy code and Suspense-enabled data; pairs with transitions and error boundaries.
38. **SSR vs CSR vs SSG vs ISR?** Server per request vs browser vs build time vs build + periodic revalidation.
39. **What is hydration and a hydration mismatch?** Attaching React to server HTML; mismatch when first client render differs (dates, random, window checks).
40. **What are React Server Components?** Server-only components with zero client JS and direct data access; `"use client"` marks interactive boundaries.
41. **What's new in React 19?** Actions, `useActionState`, `useFormStatus`, `useOptimistic`, `use`, ref as prop, metadata hoisting, Context as provider, RSC stable.
42. **What is concurrent rendering?** Interruptible prioritised rendering (React 18) powering transitions and Suspense.
43. **What do error boundaries not catch?** Event handlers, async code, SSR, the boundary's own errors.
44. **How do portals handle events?** Events bubble through the React tree to React ancestors.

## F. Testing, a11y, security
45. **How do you test React components?** RTL: query by role/label, userEvent, findBy for async, MSW for network; unit-test reducers/hooks; few E2E.
46. **How do you make a modal accessible?** `role="dialog"`, `aria-modal`, labelled by title, focus moves in, Tab trapped, Escape closes, focus returns.
47. **Is React safe from XSS?** Text is escaped; risks: `dangerouslySetInnerHTML`, `javascript:` URLs, unsafe third-party HTML → sanitize, CSP.
48. **Where do you store tokens?** httpOnly Secure SameSite cookie preferred; explain localStorage XSS risk.

## G. Your experience (prepare personal answers)
49. **Tell me about the AngularJS → React migration.** (STAR — see migration notes)
50. **A difficult React bug you fixed.** (Symptom → investigation → root cause → fix → prevention)

---

## Code-reading round — what's wrong?
```tsx
// 1
function Search() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => { fetch(`/api?q=${q}`).then((r) => r.json()).then(setResults); }, [q]);
  return <input value={q} onChange={(e) => setQ(e.target.value)} />;
}
```
<details><summary>Answer</summary>Request per keystroke (no debounce), race condition (no abort/ignore → older response can win), no `res.ok` check, no loading/error state, `q` not encoded (`encodeURIComponent`).</details>

```tsx
// 2
function Profile({ user }) {
  const [name, setName] = useState(user.name);
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```
<details><summary>Answer</summary>Copies a prop into state; switching to another user keeps the old name. Fix: `<Profile key={user.id} user={user} />` or make it controlled by the parent.</details>

```tsx
// 3
const value = { user, setUser };
return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
```
<details><summary>Answer</summary>New object every render → every consumer re-renders whenever the provider renders. Wrap in `useMemo`.</details>

```tsx
// 4
{items.map((item, i) => <EditableRow key={i} item={item} />)}
```
<details><summary>Answer</summary>Index keys with stateful rows → state moves to wrong row on insert/delete/sort. Use `item.id`.</details>

```tsx
// 5
useEffect(() => {
  window.addEventListener("resize", () => setWidth(window.innerWidth));
}, []);
```
<details><summary>Answer</summary>No cleanup → listener leak (and duplicate listeners in Strict Mode). Keep a named handler and remove it in cleanup.</details>

```tsx
// 6
function List() {
  const [items, setItems] = useState<string[]>([]);
  const add = () => { items.push("x"); setItems(items); };
}
```
<details><summary>Answer</summary>Mutation + same reference → no re-render. `setItems((p) => [...p, "x"])`.</details>

```tsx
// 7
function Parent() {
  function Child() { return <input />; }
  const [n, setN] = useState(0);
  return <><Child /><button onClick={() => setN(n + 1)}>{n}</button></>;
}
```
<details><summary>Answer</summary>Component defined inside a component → new type every render → Child remounts, input loses its value/focus. Move it outside.</details>

```tsx
// 8 — what does it log after one click?
const [c, setC] = useState(0);
const onClick = () => { setC(c + 1); setC((x) => x + 1); console.log(c); };
```
<details><summary>Answer</summary>Logs 0; after the render `c` is 2 (first sets 1, updater adds 1).</details>
