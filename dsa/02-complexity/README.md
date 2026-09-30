# 02 — Complexity Analysis

Complexity describes how resource usage grows as input size n grows.

## Common classes

| Complexity | Typical example |
|---|---|
| O(1) | array index access |
| O(log n) | binary search |
| O(n) | one scan |
| O(n log n) | merge sort |
| O(n²) | pair comparison |
| O(2^n) | many subset/backtracking trees |
| O(n!) | permutations |

## Problem 1 — Analyze loops

```js
for (let i = 0; i < n; i++) {
  console.log(i);
}
```

O(n).

Nested independent loops:

```js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {}
}
```

O(n²).

Sequential loops add:

O(n) + O(n) = O(n).

## Problem 2 — Logarithmic reduction

```js
while (n > 1) {
  n = Math.floor(n / 2);
}
```

Each iteration halves n, so O(log n).

## Problem 3 — Hidden nested loop

Sliding-window algorithms often contain a for loop and while loop. Do not automatically call them O(n²).

If left and right each move only forward n times total, total work is O(n).

## Problem 4 — Recursion

For binary search, one recursive branch is explored and the problem halves:

O(log n) time and O(log n) call-stack space.

For naive Fibonacci:

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

There are exponentially many repeated subproblems.

## Space categories

Distinguish:
- input space
- auxiliary space
- output space
- call-stack space

If an algorithm returns a new array of size n, that output is not automatically counted as auxiliary space.

## Amortized complexity

Dynamic arrays may occasionally resize, but repeated push operations are typically amortized O(1).

## Expected vs worst case

Hash Map/Set lookup is generally expected O(1), not an unconditional guarantee.

## JavaScript-specific complexity traps

- `shift()` / `unshift()`: typically O(n)
- `push()` / `pop()`: amortized O(1)
- `sort()`: implementation-dependent complexity; do not blindly claim a specific internal algorithm
- `includes()`: O(n)
- `Map.has/get/set`: expected O(1)
- string operations can depend on string length

## Interview drill

For every solution state:

**Time:** what operations repeat as n grows?

**Space:** what additional state grows with n?

Then identify whether the bound is worst-case, average/expected, or amortized.
