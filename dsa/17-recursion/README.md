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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(factorial(5)); // → 120
console.log(factorial(0)); // → 1
```

Call stack stores each pending multiplication.

## Problem 2 — Sum Array

```js
function sum(nums, i = 0) {
  if (i === nums.length) return 0;
  return nums[i] + sum(nums, i + 1);
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(sum([1, 2, 3, 4])); // → 10
console.log(sum([])); // → 0
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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(search([1, 3, 5, 7, 9], 7)); // → 3
console.log(search([1, 3, 5, 7, 9], 4)); // → -1
```

## Problem 4 — Merge Sort

Recursion divides the array until size one, then combines sorted halves.

## Call-stack debugging
For recursion, write the call stack explicitly. Ask what value each frame is waiting to receive.

## Common mistakes
Missing base case, no state progress, accidental exponential branching, stack overflow.

## Connection
Recursion is the foundation for **backtracking and tree traversal**.

---

## Full solutions — code, complexity, LeetCode

Every recursive solution needs: **base case → smaller subproblem → combine**. Say all three out loud.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Merge Sort — [LeetCode 912](https://leetcode.com/problems/sort-an-array/)

**Idea:** Split the array in half, sort each half recursively, then **merge two sorted arrays** with two pointers. Stable and always O(n log n).

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;                       // base case
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));             // subproblems
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);                             // combine
}

function merge(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]); // <= keeps it stable
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
```

**Try it:**

```js
console.log(JSON.stringify(mergeSort([5,2,3,1]))); // → [1,2,3,5]
console.log(JSON.stringify(mergeSort([5,1,1,2,0,0]))); // → [0,0,1,1,2,5]
console.log(JSON.stringify(mergeSort([]))); // → []
```

**Complexity:** Time O(n log n) — log n levels, O(n) merge work per level · Space O(n).  
**Edge cases:** Empty array, one element, duplicates, already sorted.

### Pow(x, n) — fast exponentiation — [LeetCode 50](https://leetcode.com/problems/powx-n/)

**Idea:** x^n = (x^(n/2))² — halve the problem each step. Handle negative n with 1/x.

```js
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) return 1 / myPow(x, -n);
  const half = myPow(x, Math.floor(n / 2));
  return n % 2 === 0 ? half * half : half * half * x;
}
```

**Try it:**

```js
console.log(myPow(2,10)); // → 1024
console.log(myPow(2,-2)); // → 0.25
console.log(Math.round(myPow(2.1,3)*1000)/1000); // → 9.261
```

**Complexity:** Time O(log n) · Space O(log n) recursion.  
**Edge cases:** n = 0, negative n, x = 0.
