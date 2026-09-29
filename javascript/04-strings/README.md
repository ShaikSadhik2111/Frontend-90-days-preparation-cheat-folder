# Strings

Strings are immutable sequences of UTF-16 code units.

## Common operations
- `length`
- `slice`
- `substring`
- `includes`
- `startsWith`
- `endsWith`
- `split`
- `replace`
- `replaceAll`
- `trim`
- `toLowerCase` / `toUpperCase`

## Template literals
Use backticks for interpolation and multiline strings.

```js
const message = `Hello, ${name}`;
```

## Unicode
A JavaScript string's `length` counts UTF-16 code units, not necessarily user-perceived characters. For Unicode-aware iteration, `for...of` iterates code points.

## Pitfalls
Do not assume `str.length` equals the number of visible characters for every Unicode string.
