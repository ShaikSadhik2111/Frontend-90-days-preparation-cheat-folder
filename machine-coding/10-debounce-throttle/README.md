# 10 — Debounce & throttle

| | Debounce | Throttle |
|---|---|---|
| Runs | after calls **stop** for N ms | at most once per N ms |
| Use for | search input, autosave, resize end, validation | scroll, mousemove, drag, resize during, telemetry rendering |
| Options | leading/trailing, cancel, flush, maxWait | leading/trailing |

## Implementations (write from memory)
```js
function debounce(fn, wait) {
  let timer;
  const debounced = function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

function throttle(fn, wait) {
  let last = null, timer = null, pendingArgs, pendingThis;
  return function (...args) {
    const now = Date.now();
    const remaining = last === null ? 0 : wait - (now - last);
    if (remaining <= 0) { clearTimeout(timer); timer = null; last = now; fn.apply(this, args); }
    else { pendingArgs = args; pendingThis = this;
      if (!timer) timer = setTimeout(() => { last = Date.now(); timer = null; fn.apply(pendingThis, pendingArgs); }, remaining); }
  };
}
```
Tested versions: [code/polyfills/src/function-utils.js](../../code/polyfills/src/function-utils.js).

## In React
- Debounce a **value** with `useDebounce(value, 300)` (effect + timeout + cleanup) — simplest and safe.
- Debouncing a **function**: create it once (`useMemo(() => debounce(fn, 300), [])`) and call `.cancel()` on unmount; keep the latest callback in a ref to avoid stale closures.
- Don't create `debounce(...)` inline in render — a new debounced function each render never fires correctly.

## Testing
Fake timers: `vi.useFakeTimers()` → call 3 times → `vi.advanceTimersByTime(299)` (not called) → `advanceTimersByTime(1)` (called once with last args).

Next → [11 Cancellation & races](../11-cancellation-races/README.md)
