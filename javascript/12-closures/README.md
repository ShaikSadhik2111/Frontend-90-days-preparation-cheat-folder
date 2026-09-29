# Closures

A closure occurs when a function retains access to variables from its lexical environment after the outer function has returned.

```js
function counter() {
  let value = 0;
  return () => ++value;
}

const next = counter();
next(); // 1
next(); // 2
```

## Why closures matter
They enable:
- Data privacy
- Function factories
- Callbacks
- Memoization
- Custom hooks and React patterns
- Encapsulation

## Common loop issue
Use block-scoped bindings when creating per-iteration closures:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

## Memory
A closure can keep referenced objects reachable. Long-lived closures can therefore contribute to memory retention if they unnecessarily capture large structures.

## Interview answer
"Closure is the ability of a function to retain access to its lexical environment even after the outer function has finished executing."
