# Render cycle and timing

> Know **exactly** what runs when: render body → DOM commit → `useLayoutEffect` → paint → `useEffect`. And how cleanup ordering works.

## Order of operations on mount
```tsx
function Demo() {
  console.log("1 render");
  useLayoutEffect(() => { console.log("2 layout effect (DOM ready, before paint)"); return () => console.log("layout cleanup"); });
  useEffect(() => { console.log("3 effect (after paint)"); return () => console.log("effect cleanup"); });
  return <div ref={(el) => el && console.log("ref attached (during commit)")}>hi</div>;
}
// render → ref attached → layout effect → (browser paints) → effect
```
On an update: render → (commit) → previous **layout cleanup** → new layout effect → paint → previous **effect cleanup** → new effect.
On unmount: cleanups run.

## Parent/child ordering
- Render goes **top-down** (parent function runs before children).
- Effects run **bottom-up** (children's effects before the parent's), because a parent's effect may rely on children being mounted.

## Batching & scheduling
```tsx
function handle() {
  setA(1); setB(2); setC(3);     // one render (automatic batching, React 18+)
}
setTimeout(() => { setA(1); setB(2); }, 0);   // also one render in React 18 (was two in React 17)
import { flushSync } from "react-dom";
flushSync(() => setA(1));          // force a synchronous render now (rare: measure DOM right after)
```
- Updates inside `startTransition` are **non-urgent** and can be interrupted by urgent ones (typing).
- React processes **urgent** updates (clicks, typing) before transitions.

## useEffect vs useLayoutEffect
| `useEffect` | `useLayoutEffect` |
|---|---|
| After paint, non-blocking | After DOM mutation, **before paint**, blocks paint |
| Data sync, subscriptions, logging | Measure layout (tooltip position), avoid visual flicker |
| Default choice | Only when you see flicker; doesn't run on server (SSR warning) |

## Interview questions
1. **In what order do effects run for parent and child?** Child first, then parent.
2. **When does cleanup run?** Before the effect re-runs (deps changed) and on unmount.
3. **What is automatic batching?** Multiple updates in any context → one render (React 18).
4. **When would you use `flushSync`?** When you must read the updated DOM synchronously (e.g. scroll to a newly added item) — rarely.

## Practice
Paste the `Demo` component above into a sandbox with a parent that toggles it and a child inside it. Predict the full console order for mount, update and unmount, then verify.

Next → [Reconciliation](../reconciliation/README.md)
