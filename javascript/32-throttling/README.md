# 32 — Throttling

Throttling limits how often a function executes during a burst of calls.

## Basic implementation
    function throttle(fn, interval) {
      let lastTime = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
          lastTime = now;
          fn.apply(this, args);
        }
      };
    }

## Use cases
- scroll handlers
- pointer movement
- resize
- analytics events
- drag interactions

Example:
    window.addEventListener("scroll", throttle(updateScrollPosition, 100));

## Debounce vs throttle
- Debounce: wait for inactivity.
- Throttle: limit frequency while activity continues.

A production throttle should define leading/trailing behavior: first call, last call, or both.

**Next:** memory management explains object lifetime and retention.