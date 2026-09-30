# 14 — Map, Set, WeakMap and WeakSet

## 1. Map

A `Map` stores key/value pairs and supports keys of any value type.

```js
const cache = new Map();

cache.set("user:1", { name: "Sam" });
cache.set(101, "order");

console.log(cache.get("user:1"));
console.log(cache.has(101));
console.log(cache.size);
```

### Use cases

- API/cache lookup
- grouping by object identity
- counters
- lookup tables where keys are not strings
- preserving insertion order

## 2. Set

A `Set` stores unique values.

```js
const roles = new Set(["admin", "user", "admin"]);

console.log([...roles]); // ["admin", "user"]
```

### Frontend use cases

- selected IDs
- deduplicating tags
- tracking expanded rows
- membership checks

```js
const selectedIds = new Set([101, 103]);

if (selectedIds.has(103)) {
  console.log("selected");
}
```

## 3. WeakMap

WeakMap keys must be objects and are weakly held.

```js
const metadata = new WeakMap();

let element = {};
metadata.set(element, {
  createdAt: Date.now()
});

element = null;
```

The metadata entry does not itself keep the original object strongly reachable.

### Use case

Associate private metadata with objects without maintaining a separate lifetime manually.

## 4. WeakSet

WeakSet stores objects weakly.

A practical use is tracking whether object instances have already been processed:

```js
const processed = new WeakSet();

function process(node) {
  if (processed.has(node)) return;

  processed.add(node);
  // process node
}
```

## 5. Map vs Object

Use an Object for record-like domain data:

```js
const user = { id: 1, name: "Sam" };
```

Use Map for a collection with explicit key/value semantics:

```js
const cache = new Map();
```

Map gives you `size`, iteration APIs and arbitrary key types.

## 6. Weak collection limitation

WeakMap/WeakSet are not normal iterable collections. You cannot inspect every key because that would expose garbage-collection behavior.

## Interview checklist

- Map vs Object
- Set uniqueness
- object keys in WeakMap
- weak reachability
- iteration differences
- practical cache/selection use cases

**Next:** Symbols provide unique property keys and language protocols.