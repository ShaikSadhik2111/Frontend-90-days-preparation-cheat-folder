# 06 — Rendering pipeline & critical rendering path

## Pipeline per frame
**JavaScript → Style → Layout → Paint → Composite**
| Change | Triggers | Cost |
|---|---|---|
| `width`, `height`, `top`, `font-size`, adding DOM | Layout + paint + composite | High |
| `color`, `background`, `box-shadow`, `visibility` | Paint + composite | Medium |
| `transform`, `opacity` | Composite only (GPU layer) | Low → use for animations |
A 60 Hz screen gives **~16.7 ms per frame** for all of this. Tasks > 50 ms are **long tasks** (hurt INP).

## Critical rendering path (first paint)
HTML → DOM, CSS → CSSOM, combine → render tree → layout → paint.
Optimise it:
- Inline **critical CSS**, load the rest without blocking (`media` trick or `preload`).
- `defer` scripts; avoid large synchronous JS in `<head>`.
- `<link rel="preload">` hero image/fonts, `preconnect` to API/CDN origins.
- Fewer, smaller, compressed resources; HTTP/2 multiplexing; CDN.
- Server-render the important HTML (SSR/SSG) for fast LCP.

## requestAnimationFrame
```js
let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateStickyHeader(window.scrollY); ticking = false; }); // once per frame
}, { passive: true });
```
rAF callbacks run right before the browser paints the next frame. `requestIdleCallback` runs when the main thread is idle (non-urgent work).

## Layers & compositing
`transform`/`opacity` animations and `will-change: transform` can promote an element to its own layer → animated by the compositor thread even when the main thread is busy. Too many layers = memory cost; don't put `will-change` on everything.

## Debugging
Chrome DevTools → **Performance**: record, look for long tasks (red), "Recalculate Style", "Layout" (forced reflow warnings), "Paint". **Rendering** tab: paint flashing, layout shift regions, FPS meter.

## Interview questions
1. Reflow vs repaint vs composite?
2. Why animate `transform` instead of `left`?
3. What is the critical rendering path and how do you optimise it?
4. What does `requestAnimationFrame` do and when would you use it?
5. What is a long task and why does it matter?

Next → [07 Browser storage](../07-browser-storage/README.md)
