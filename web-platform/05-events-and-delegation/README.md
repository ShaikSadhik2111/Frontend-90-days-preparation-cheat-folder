# 05 — Browser Events and Event Delegation

**Connection:** DOM nodes are event targets.

**Learn:** capture → target → bubble, preventDefault, stopPropagation, target/currentTarget, passive listeners, pointer/keyboard events, focus, delegation and cleanup.

**Example**
```js
list.addEventListener("click", event => {
  const item = event.target.closest("[data-id]");
  if (!item) return;
  openItem(item.dataset.id);
});
```

**Production:** large lists, menus and dynamic content.

**Pitfalls:** stopping propagation to hide design problems, forgetting passive behavior, click-only controls and thousands of listeners.

**Interview:** explain bubbling/capturing; target vs currentTarget; delegation; preventDefault vs stopPropagation.

**Challenge:** accessible dropdown with keyboard navigation and outside-click handling.

**Next:** rendering.