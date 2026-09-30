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

## Deeper learning standard

### Why throttle works

Throttle limits how often a function can execute during continuous activity.

```text
continuous events
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  ↓     ↓     ↓
execution execution execution
```

### Common use cases

- scroll position tracking
- pointer movement
- resize handling
- drag interactions
- analytics events

### Debounce vs throttle

| Debounce | Throttle |
|---|---|
| waits for inactivity | limits frequency during activity |
| useful for search | useful for scroll |
| latest call often matters | periodic execution often matters |

Production implementations should explicitly define leading and trailing behavior.

### Interview challenge

Implement a throttle that supports both leading and trailing execution. Then explain which behavior is appropriate for scroll tracking versus final-value validation.

**What this unlocks:** high-frequency callbacks can also create retention and cleanup problems, leading into memory management.
