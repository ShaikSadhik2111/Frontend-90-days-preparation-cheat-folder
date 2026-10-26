# Reconciliation

> Reconciliation is how React **compares the previous and next element trees** to decide which DOM nodes and component instances to keep, update or destroy. It uses **type** and **key** to identify elements.

## The diffing heuristics (make it O(n) instead of O(n³))
1. **Different type at the same position → replace the whole subtree.**
   `<div>` → `<section>`, or `<UserForm>` → `<AdminForm>`: old DOM and **all state below is destroyed**; new tree mounted.
2. **Same type → keep the instance/DOM node, update props, recurse into children.**
   `<div className="a">` → `<div className="b">`: only the attribute changes.
3. **Lists → match children by `key`.** Without keys React matches by index.

```tsx
// State is preserved — same type at same position
{isEditing ? <Field label="Name" /> : <Field label="Full name" />}

// State is reset — different types
{isEditing ? <input /> : <textarea />}

// Force a reset on purpose with key
<ProfileForm key={userId} userId={userId} />
```

## Fiber (what's under the hood)
- **Fiber** is React's internal unit of work: one fiber per element, linked as a tree (child/sibling/return pointers). It stores state (hooks list), props, effects.
- Two trees: **current** (on screen) and **work-in-progress**. React builds the WIP tree during render and swaps it on commit (double buffering).
- Because work is split into fibers, React can **pause, prioritise and resume** rendering (concurrent features: `useTransition`, Suspense). The **commit phase is always synchronous**.

## Interview questions
1. **What is reconciliation?** The diff between old and new element trees using type and key.
2. **What happens when the element type changes?** Unmount old subtree (state lost), mount new.
3. **What is Fiber and why was it introduced?** Re-architecture (React 16) making rendering incremental and interruptible; enables concurrency, Suspense, error boundaries.
4. **Is the virtual DOM diff the same as Fiber?** Diffing is the algorithm; Fiber is the data structure/scheduler executing it.

## Practice
Build a list of 5 rows with an input in each. Insert a row at the top using index keys, type text, and observe the bug. Switch to stable ids and explain the difference in terms of reconciliation.

Next → [Virtual DOM](../virtual-dom/README.md)
