# 05 — Events & event delegation

## Event flow
**Capture** (window → target) → **Target** → **Bubble** (target → window).
```js
el.addEventListener("click", handler);                     // bubble phase (default)
el.addEventListener("click", handler, { capture: true });  // capture phase
el.addEventListener("scroll", handler, { passive: true }); // promises not to preventDefault → smooth scrolling
el.addEventListener("click", handler, { once: true });     // auto-removed after first call
const controller = new AbortController();
el.addEventListener("click", handler, { signal: controller.signal }); controller.abort(); // remove many at once
```
- `e.target` — element where the event started. `e.currentTarget` — element the listener is attached to.
- `e.stopPropagation()` — stop moving through phases. `e.stopImmediatePropagation()` — also stop other listeners on the same element.
- `e.preventDefault()` — cancel the default action (link navigation, form submit, checkbox toggle). Not the same as stopping propagation!
- Events that don't bubble: `focus`/`blur` (use `focusin`/`focusout`), `mouseenter`/`mouseleave`, `load`, `scroll` on elements (bubbles on document).

## Event delegation
One listener on a common ancestor handles events for many (even future) children.
```js
document.querySelector("#device-list").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn || !e.currentTarget.contains(btn)) return;
  const id = btn.closest("li").dataset.id;
  if (btn.dataset.action === "delete") deleteDevice(id);
  if (btn.dataset.action === "ack") acknowledge(id);
});
```
✅ Fewer listeners (memory), works for dynamically added items, simpler cleanup. React uses delegation at the root container.

## Custom events
```js
el.dispatchEvent(new CustomEvent("device:selected", { detail: { id }, bubbles: true }));
el.addEventListener("device:selected", (e) => console.log(e.detail.id));
```
Useful for communication between micro-frontends / legacy (AngularJS) and React islands.

## Keyboard & pointer
Use `e.key` (`"Enter"`, `"Escape"`, `"ArrowDown"`) not deprecated `keyCode`. Pointer events (`pointerdown`, `pointermove`) unify mouse/touch/pen.

## High-frequency events
`scroll`, `resize`, `mousemove`, `input` → **throttle** or **debounce**, or use `requestAnimationFrame` to update at most once per frame; observers instead of scroll listeners where possible.

## Interview questions
1. Explain capture vs bubble. Which phase do listeners use by default?
2. `target` vs `currentTarget`?
3. `stopPropagation` vs `preventDefault`?
4. What is event delegation and why is it efficient? Implement it.
5. Which events don't bubble?
6. How do you remove an anonymous listener? (keep a reference, or use `AbortController` signal)

Next → [06 Rendering pipeline](../06-rendering-pipeline/README.md)
