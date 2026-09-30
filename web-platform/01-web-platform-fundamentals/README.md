# 01 — Web Platform Fundamentals

**Connection:** JavaScript becomes useful in the browser because the browser supplies host capabilities: DOM, events, networking, storage, rendering and security boundaries.

**Learn:** Window, Document, Navigator, Location, origin, main thread, event loop, browser lifecycle, and ECMAScript vs Web APIs.

**Example**
```js
console.log(location.href);
console.log(document.title);
queueMicrotask(() => console.log("microtask"));
setTimeout(() => console.log("timer"), 0);
```
Predict the order before running it.

**Production:** feature detection, URL state, locale detection and coordinating framework lifecycle with browser APIs.

**Pitfalls:** confusing browser APIs with language features, assuming timers run at exact times, accessing window/document during SSR, treating capability checks as security.

**Interview:** What does the browser provide? Why can async code freeze UI? What is an origin? Why does SSR require care around window/document?

**Challenge:** build a capability panel that safely detects browser features.

**Next:** semantic HTML.