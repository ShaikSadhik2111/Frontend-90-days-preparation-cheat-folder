# Rendering model

> **Trigger → Render → Commit.** React calls your components to compute the next UI (render), then applies the minimal DOM changes (commit), then runs effects. "Re-render" ≠ "DOM update".

## The three steps
1. **Trigger** — initial `root.render()`, or a state update (`setState`, `dispatch`, context change, external store change).
2. **Render** — React calls the component that changed **and all its descendants** (by default) to get a new element tree. Pure, can be interrupted in concurrent mode, may run twice in Strict Mode.
3. **Commit** — React diffs old vs new tree and touches only DOM nodes that changed. Then `useLayoutEffect` (before paint), browser paints, then `useEffect`.

## What causes a component to re-render?
| Cause | Notes |
|---|---|
| Its own state changes | Bails out if `Object.is(old, new)` |
| **Its parent re-renders** | Default behaviour — even if props are identical |
| A context it reads changes | Every consumer of that context re-renders |
| Its external store changes | via `useSyncExternalStore` (Redux, Zustand) |
**Props changing is not itself a trigger** — props only change because the parent re-rendered.

## Re-render is usually cheap
A re-render runs your function and diffs objects. The expensive part is DOM work, and React skips unchanged DOM. Optimise only when the Profiler shows a problem:
- **Move state down** (colocate) so fewer components re-render.
- **Lift content up** — pass expensive parts as `children`.
- `React.memo` + stable props for heavy subtrees.
- Split contexts; select slices from stores.

## Purity in practice
```tsx
// ❌ impure: mutates a variable outside render
let guests = 0;
function Cup() { guests++; return <p>Guest #{guests}</p>; }   // Strict Mode double-render shows the bug
// ✅ pure: derive from props
function Cup({ guest }: { guest: number }) { return <p>Guest #{guest}</p>; }
```
Strict Mode (dev only) renders components twice and runs effects setup → cleanup → setup to expose impurities and missing cleanups.

## Interview questions
1. **When does a component re-render?** Own state, parent render, context, external store.
2. **Does every re-render update the DOM?** No — commit only applies differences.
3. **Render phase vs commit phase?** Render: compute tree (pure, interruptible). Commit: apply DOM changes + run layout effects (sync), then passive effects.
4. **Why does my component render twice in development?** Strict Mode intentionally double-invokes to find impure code.

## Practice
Turn on React DevTools → Settings → "Highlight updates when components render". Type in a search box on any page of your project and list every component that re-renders. Remove one unnecessary re-render by moving state down.

Next → [Render cycle](../render-cycle/README.md)
