# Map, Set, WeakMap and WeakSet

## Map
Stores key/value pairs and allows keys of any value type.

## Set
Stores unique values.

## WeakMap
Keys must be objects and are weakly held, allowing associated entries to become collectible when the key is otherwise unreachable.

## WeakSet
Stores objects weakly and supports membership checks.

## When to use
- Map: keyed lookup where keys are not limited to strings.
- Set: uniqueness and membership.
- WeakMap: metadata associated with object lifetimes.
- WeakSet: weak object membership tracking.

## Pitfall
Weak collections are not iterable in the same way as Map/Set because their weak references are intentionally not exposed as enumerable collections.
