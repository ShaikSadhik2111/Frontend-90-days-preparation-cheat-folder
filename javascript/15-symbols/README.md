# Symbols

A Symbol is a unique primitive value often used as a non-string property key.

```js
const id = Symbol("id");
const user = { [id]: 123 };
```

## Well-known symbols
Examples:
- `Symbol.iterator`
- `Symbol.asyncIterator`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`

They let objects customize language protocols.

## Interview connection
`Symbol.iterator` explains how custom objects become iterable with `for...of`.
