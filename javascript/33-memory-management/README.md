# 33 — Memory Management

JavaScript memory management is largely automatic. The key frontend skill is understanding reachability and unintended retention.

## Lifecycle
    allocate → use → become unreachable → garbage collection

Objects can remain reachable through globals, active execution contexts, event listeners, timers, closures and caches.

## Common retention problems
### Event listeners
    element.addEventListener("click", handler);
    element.removeEventListener("click", handler);

### Timers
Clear long-lived intervals/timeouts when their work is no longer needed.

### Caches
An unbounded Map cache can retain data indefinitely. Use an eviction policy when necessary.

### Closures
A long-lived closure can retain objects it references.

## Frontend use case
Single-page applications can remain open for hours. A small retention problem repeated across route changes can grow into significant memory usage.

## Debugging
Browser DevTools can help with heap snapshots, allocation timelines and retained-size analysis.

**Interview distinction:** a JavaScript memory leak usually means unintended retention. Garbage collection cannot reclaim reachable objects.

**Next:** garbage collection explains reclamation.