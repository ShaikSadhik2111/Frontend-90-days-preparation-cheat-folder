# 34 — Garbage Collection

Garbage collection automatically reclaims memory that is no longer reachable. Exact algorithms are engine-specific.

## Reachability
Conceptually, GC starts from roots and follows references. Objects outside the reachable graph become eligible for collection.

## Generational idea
Modern engines commonly exploit the fact that many objects are short-lived, so young and older objects can be handled differently.

## GC is nondeterministic
Never write application logic that depends on collection happening at an exact moment.

Setting a reference to null may make an object collectible if no other references remain, but it does not mean memory is immediately freed.

## Weak references
WeakMap and WeakSet can associate information with objects without strongly retaining those objects. WeakRef and FinalizationRegistry exist for specialized cases and should be used cautiously.

## Interview trap
Garbage collection does not prevent all memory leaks. If code accidentally retains an object through a listener, timer, global cache or closure, the object remains reachable.

**Next:** Proxy and Reflect cover metaprogramming and interception.