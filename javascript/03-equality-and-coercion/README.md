# Equality and Coercion

## Strict equality
`===` compares without the usual type coercion.

## Loose equality
`==` applies a defined coercion algorithm. It is predictable but complex.

## Object equality
Two separate objects are not equal merely because their contents match:

```js
{} === {}; // false
```

Both references point to different objects.

## Object.is
`Object.is` differs from `===` for special numeric cases:
- `Object.is(NaN, NaN)` is true
- `Object.is(-0, 0)` is false

## Interview advice
Prefer `===` unless you have a specific reason to use coercion. When asked about `==`, explain the conversion rules rather than calling it simply "bad."
