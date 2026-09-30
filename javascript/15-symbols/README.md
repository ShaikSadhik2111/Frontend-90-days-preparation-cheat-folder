# 15 — Symbols

## Core idea

A Symbol is a unique primitive value.

```js
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b); // false
```

The description is only for debugging; it does not make Symbols equal.

## 1. Unique property keys

```js
const id = Symbol("id");

const user = {
  name: "Sam",
  [id]: 101
};

console.log(user[id]); // 101
```

This avoids accidental collision with normal string keys.

## 2. Why libraries use Symbols

Symbols can define extension points without requiring globally unique string property names.

## 3. Well-known Symbols

Important protocols include:

- `Symbol.iterator`
- `Symbol.asyncIterator`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`

### Example: custom iterable

```js
const range = {
  start: 1,
  end: 3,

  *[Symbol.iterator]() {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
};

console.log([...range]); // [1, 2, 3]
```

This connects Symbols directly to generators and iteration.

## 4. Frontend use cases

You may encounter Symbols in:

- framework/library internals
- custom iterables
- metadata-style APIs
- avoiding property-name collisions

They are less common than strings in normal application models.

## Interview checklist

- unique identity
- Symbol as property key
- well-known Symbols
- Symbol.iterator
- connection to iterators/generators

**Next:** higher-order functions build behavior by passing and returning functions.