# Arrays

Arrays are indexed objects with specialized methods.

## Core methods
- `push`, `pop`
- `shift`, `unshift`
- `slice`, `splice`
- `map`, `filter`, `reduce`
- `find`, `findIndex`
- `some`, `every`
- `includes`
- `sort`

## map vs forEach
`map` returns a new array. `forEach` is intended for side effects and returns `undefined`.

## reduce
`reduce` transforms a collection into an accumulated result.

```js
const sum = [1, 2, 3].reduce((total, n) => total + n, 0);
```

## Sorting
Default `sort()` converts values to strings. For numeric sorting:

```js
[10, 2, 5].sort((a, b) => a - b);
```

## Complexity
Array lookup by index is typically O(1); searching is O(n). Insertion/removal near the front generally requires shifting elements.

## Pitfalls
- Mutating arrays accidentally
- Forgetting that `sort` mutates the array
- Using `map` without using its returned array
