# 06 — Rendering Pipeline and Browser Lifecycle

**Connection:** JavaScript and DOM/CSS changes eventually become pixels.

**Learn:** style calculation, layout/reflow, paint, compositing, frames, requestAnimationFrame, long tasks and layout thrashing.

**Example**
```js
requestAnimationFrame(() => {
  box.style.transform = `translateX(${x}px)`;
});
```

**Production:** animation, drag/drop, scrolling and performance debugging.

**Pitfalls:** forced synchronous layout, huge DOMs, long synchronous tasks and animating layout-heavy properties.

**Interview:** reflow vs repaint vs compositing? What does requestAnimationFrame do? Why can layout thrashing occur? Why doesn't a Worker manipulate DOM?

**Challenge:** diagnose a janky animation using DevTools Performance.

**Next:** storage.