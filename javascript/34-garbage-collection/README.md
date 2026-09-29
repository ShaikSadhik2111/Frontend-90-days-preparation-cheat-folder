# Garbage Collection

Garbage collection automatically reclaims memory that is no longer reachable.

Modern engines use sophisticated generational and incremental strategies; exact algorithms are engine-specific.

## Generational idea
Short-lived objects are common, so collectors often treat young and old objects differently.

## GC is not deterministic
Do not write application logic that depends on exactly when garbage collection happens.

## Weak references
`WeakMap` and `WeakSet` can associate data with objects without keeping those objects strongly reachable. `WeakRef` and `FinalizationRegistry` exist for specialized cases and require careful use.

## Pitfalls
- Thinking `delete` immediately frees memory
- Assuming GC prevents all memory leaks
- Holding unnecessary references in caches or listeners
