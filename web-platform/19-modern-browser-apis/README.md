# 19 — Modern browser APIs worth knowing

| API | What | Typical use |
|---|---|---|
| `IntersectionObserver` | element visibility | lazy loading, infinite scroll, impressions |
| `ResizeObserver` | element size | responsive charts/components |
| `MutationObserver` | DOM changes | integrating third-party/legacy widgets |
| `AbortController` / `AbortSignal.timeout()` | cancellation | fetch, event listeners, custom async work |
| `structuredClone()` | deep copy (Map, Set, Date, cycles) | immutable updates, worker messages |
| `BroadcastChannel` | messaging between tabs of the same origin | sync logout/theme across tabs |
| `postMessage` | cross-window/iframe messaging | micro-frontends, embedded apps (check `origin`!) |
| `Intl.*` (`DateTimeFormat`, `NumberFormat`, `RelativeTimeFormat`, `PluralRules`, `Collator`) | i18n formatting | dates, currency, units, sorting by locale |
| `URL`, `URLSearchParams` | parse/build URLs | filters in query strings |
| `navigator.clipboard` | read/write clipboard (permission) | copy buttons |
| History API (`pushState`, `popstate`) | SPA routing | routers |
| Page Visibility (`document.visibilityState`) | tab hidden/visible | pause polling, close sockets |
| `requestIdleCallback` / `scheduler.postTask` / `scheduler.yield` | scheduling | non-urgent work, breaking long tasks (check support) |
| View Transitions API | animated transitions between DOM states/pages | smooth navigation |
| `<dialog>` + Popover API (`popover` attribute) | native modals and popovers | fewer custom implementations |
| Web Storage / IndexedDB / Cache API | storage | see 07 |
| Geolocation, Notifications, Push, Web Share | device features | mobile-like web apps |
| Web Serial / WebUSB / WebHID / Web Bluetooth (Chromium) | talk to hardware from the browser | industrial/IoT device configuration tools |
| Performance APIs (`PerformanceObserver`, User Timing `performance.mark/measure`) | measurements | RUM, custom metrics |

```js
// Intl examples
new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(2500000);   // ₹25,00,000.00
new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date());
new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-1, "day");                  // "yesterday"

// URLSearchParams
const params = new URLSearchParams(location.search);
params.set("status", "online");
history.replaceState(null, "", `?${params}`);

// pause polling when tab hidden
document.addEventListener("visibilitychange", () => (document.hidden ? stopPolling() : startPolling()));
```
Always check support on **caniuse.com** / MDN compatibility tables and feature-detect (`if ("IntersectionObserver" in window)`).

Next → [20 Interview drills](../20-interview-drills/README.md)
