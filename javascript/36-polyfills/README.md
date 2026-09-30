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