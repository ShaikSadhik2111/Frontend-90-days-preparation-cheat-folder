# Memory Management

JavaScript engines automatically manage memory.

## Conceptual lifecycle
1. Allocate values/objects
2. Use them
3. Make unreachable objects collectible
4. Garbage collector reclaims memory

## Reachability
An object remains eligible for collection only when it is no longer reachable from roots such as active execution contexts and global references.

## Common retention sources
- Long-lived global references
- Event listeners not removed
- Timers
- Closures retaining large objects
- Caches without eviction
- Detached DOM structures retained by JavaScript

## Practical rule
Prefer clear ownership and cleanup for long-lived resources.

## Interview distinction
Memory leak in JavaScript usually means unintended retention, not that the garbage collector is absent.
