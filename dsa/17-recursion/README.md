# 17 — Recursion

Recursion solves a problem by solving smaller instances of itself.

Every recursive function needs:
1. base case
2. progress toward base case
3. recursive call

## Problem 1 — Factorial

```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

Call stack stores each pending multiplication.

## Problem 2 — Sum Array

```js
function sum(nums, i = 0) {
  if (i === nums.length) return 0;
  return nums[i] + sum(nums, i + 1);
}
```

State is the current index.

## Problem 3 — Recursive Binary Search

```js
function search(nums, target, left = 0, right = nums.length - 1) {
  if (left > right) return -1;

  const mid = left + Math.floor((right - left) / 2);

  if (nums[mid] === target) return mid;
  if (nums[mid] < target) return search(nums, target, mid + 1, right);
  return search(nums, target, left, mid - 1);
}
```

## Problem 4 — Merge Sort

Recursion divides the array until size one, then combines sorted halves.

## Call-stack debugging
For recursion, write the call stack explicitly. Ask what value each frame is waiting to receive.

## Common mistakes
Missing base case, no state progress, accidental exponential branching, stack overflow.

## Connection
Recursion is the foundation for **backtracking and tree traversal**.
