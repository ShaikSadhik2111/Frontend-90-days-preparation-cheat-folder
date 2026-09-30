# 07 — Destructuring, Spread and Rest

These features make object/array manipulation concise, especially in React, Angular and API-heavy frontend code.

## 1. Object destructuring

```js
const user = {
  name: "Sam",
  age: 25
};

const { name, age } = user;
```

### Rename and defaults

```js
const { name: displayName, city = "Unknown" } = user;
```

### Frontend use case

React props:

```js
function UserCard({ name, role }) {
  return `${name} — ${role}`;
}
```

## 2. Array destructuring

```js
const colors = ["red", "green", "blue"];

const [first, second] = colors;
```

Skip values:

```js
const [, , third] = colors;
```

Swap variables:

```js
let a = 1;
let b = 2;

[a, b] = [b, a];
```

## 3. Rest

Rest collects remaining values.

```js
const [first, ...remaining] = [10, 20, 30];

console.log(first);     // 10
console.log(remaining); // [20, 30]
```

Function parameters:

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
```

## 4. Spread

Array spread:

```js
const a = [1, 2];
const b = [3, 4];

const combined = [...a, ...b];
```

Object spread:

```js
const defaults = { page: 1, limit: 20 };
const userOptions = { limit: 50 };

const options = { ...defaults, ...userOptions };
```

Later properties overwrite earlier properties.

## 5. Shallow-copy warning

```js
const original = {
  profile: { name: "Sam" }
};

const copy = { ...original };

copy.profile.name = "Alex";

console.log(original.profile.name); // Alex
```

Spread does not deep-clone nested values.

## 6. Real frontend use case: immutable state

```js
setUser(previous => ({
  ...previous,
  profile: {
    ...previous.profile,
    city: "Hyderabad"
  }
}));
```

## 7. Function argument spread

```js
const numbers = [10, 20, 30];

Math.max(...numbers); // 30
```

For very large arrays, avoid blindly spreading into APIs with argument-count limits.

## Interview checklist

- object vs array destructuring
- default values
- renaming
- rest parameters
- spread syntax
- property overwrite order
- shallow-copy semantics

**Next:** functions explain how these values can be passed, returned and composed.