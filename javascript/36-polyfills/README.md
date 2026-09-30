# 36 — Polyfills

A polyfill supplies a runtime implementation for a platform feature that is unavailable in the target environment.

Polyfill vs transpiler: a polyfill adds runtime behavior; a transpiler transforms source syntax.

## Simplified map implementation
    function myMap(array, callback) {
      const result = [];
      for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
      }
      return result;
    }

Usage:
    myMap([1, 2, 3], n => n * 2); // [2, 4, 6]

## Why simplified?
A specification-accurate Array.prototype.map polyfill must consider receiver coercion, callback validation, sparse arrays, property existence, thisArg and property creation semantics.

## Interview exercises
- map
- filter
- reduce
- bind
- Promise.all
- debounce
- throttle
- memoize

## Promise.all design
A correct conceptual implementation should accept iterable input, use Promise.resolve, preserve original order, track remaining fulfillments, reject on failure and resolve after all fulfill.

## Frontend relevance
Polyfill knowledge helps with browser compatibility, legacy applications, Babel/core-js understanding and coding interviews.

Do not casually patch built-in prototypes in application code.

## Deeper learning standard

### Polyfill vs transpiler

```text
Polyfill   → supplies missing runtime behavior
Transpiler → transforms source syntax
```

A polyfill is about runtime capability, while Babel or another transpiler can transform syntax for a target environment.

### Interview implementation standard

A simplified map implementation is useful for learning iteration:

```js
function myMap(array, callback) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }

  return result;
}
```

A specification-accurate Array.prototype.map implementation has additional edge cases involving receiver coercion, callback validation, sparse arrays and property semantics.

### High-value interview polyfills

- map
- filter
- reduce
- bind
- Promise.all
- debounce
- throttle
- memoize

### Promise.all reasoning

A robust implementation needs to accept an iterable, normalize values with Promise.resolve, preserve original indexes, count fulfillments, reject on failure and resolve only when all inputs fulfill.

### Practical rule

Do not casually patch built-in prototypes in production application code. Polyfill exercises are primarily for understanding language behavior and compatibility tooling.

**What this unlocks:** the final interview folder connects these concepts into output prediction, implementation and senior frontend scenarios.
