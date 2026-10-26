# Virtual DOM

> The "virtual DOM" is the **tree of plain JS objects (React elements)** your components return. React diffs the new tree against the previous one and applies only the needed changes to the real DOM.

## What it is
```js
// <button className="primary">Save</button> becomes:
{ type: "button", props: { className: "primary", children: "Save" }, key: null }
```
Creating and comparing these objects is cheap compared with touching the real DOM (layout/paint).

## Why it exists
- Lets you write UI **declaratively** ("this is what the screen should look like for this state") instead of imperative DOM updates.
- React batches and minimises DOM writes.
- Same model works for other renderers: React Native, react-three-fiber, PDF renderers.

## Common misconceptions (good interview points)
- **"The virtual DOM is always faster than the DOM."** No — hand-written targeted DOM updates can be faster. VDOM gives *good-enough performance with a simpler programming model*.
- **"React re-renders the whole page on every change."** It re-runs component functions from the updated component down, but only changes DOM nodes that differ.
- Frameworks like Svelte and SolidJS skip the VDOM with compile-time or fine-grained reactivity; Angular uses change detection (Zone.js / Signals); AngularJS used dirty checking (digest cycle).

## AngularJS vs React (your migration angle)
| AngularJS | React |
|---|---|
| Two-way binding + watchers | One-way data flow |
| Digest loop checks every watcher until stable | Re-render from the changed component + VDOM diff |
| Cost grows with number of watchers | Cost grows with size of re-rendered subtree |

## Interview questions
1. **What is the virtual DOM?** An in-memory tree of element objects used to compute minimal DOM updates.
2. **Is it faster than direct DOM manipulation?** Not inherently; it's a trade-off for declarative code.
3. **How is it different from the shadow DOM?** Shadow DOM is a browser feature for style/DOM encapsulation in Web Components; VDOM is a React concept.

Next → [Keys](../keys/README.md)
