# Callbacks

A callback is a function supplied to another function to be invoked later or as part of an operation.

## Uses
- Array methods
- Event handlers
- Timers
- Node.js APIs
- Custom asynchronous abstractions

## Callback hell
Deeply nested callbacks can make control flow difficult to read and error handling difficult to compose.

Promises and async/await improve composability for many asynchronous workflows.

## Error-first Node callback
A historical Node pattern:

```js
fs.readFile("file.txt", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

## Pitfalls
- Losing error context
- Multiple callback invocation
- Callback never invoked
- Excessive nesting
- Accidentally passing a function call instead of a function reference
