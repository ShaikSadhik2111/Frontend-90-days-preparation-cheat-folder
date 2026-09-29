# Polyfills

A polyfill provides an implementation of a platform feature when the target environment does not provide it.

Interview practice often asks you to recreate behavior such as:
- map
- filter
- reduce
- bind
- Promise.all
- debounce
- throttle

## Example: map-like implementation
```js
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}
```

Real polyfills must consider specification details such as sparse arrays, receiver coercion, callback validation and property semantics.

## Interview goal
Show that you understand the behavior and edge cases, not just the happy-path loop.
