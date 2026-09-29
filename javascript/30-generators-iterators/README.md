# Generators and Iterators

An iterator follows the protocol of exposing a `next()` method that returns objects such as `{ value, done }`.

A generator function (`function*`) creates an iterator and can pause at `yield`.

```js
function* ids() {
  yield 1;
  yield 2;
}
const iterator = ids();
iterator.next();
```

## Why useful
- Lazy sequences
- Custom iteration
- Streaming-style workflows
- Controlling incremental computation

Objects implementing `Symbol.iterator` can be consumed by `for...of`, spread and other iteration constructs.

## Pitfall
A generator is not automatically asynchronous. Async generators use `async function*` and work with `for await...of`.
