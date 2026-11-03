# 12 — Binary Search

Binary search repeatedly discards half of an ordered search space.

## Core invariant

Maintain a range [left, right] that still contains every possible answer.

## Problem 1 — Exact Search

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // → 4
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 2)); // → -1
```

Every iteration proves one half cannot contain the target.

## Problem 2 — First Position / Lower Bound

```js
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(lowerBound([1, 3, 5, 6], 5)); // → 2
console.log(lowerBound([1, 3, 5, 6], 2)); // → 1
console.log(lowerBound([1, 3, 5, 6], 7)); // → 4
```

Here the answer is an insertion boundary, not necessarily an existing value.

## Problem 3 — Search Rotated Sorted Array

```js
function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }

  return -1;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // → 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // → -1
```

At least one side remains sorted. Determine which side and whether target lies there.

## Problem 4 — Binary Search on Answer

For Koko Eating Bananas, the search space is possible eating speeds rather than array indices.

```js
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  const canFinish = speed => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / speed);
    }
    return hours <= h;
  };

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (canFinish(mid)) right = mid;
    else left = mid + 1;
  }

  return left;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(minEatingSpeed([3, 6, 7, 11], 8)); // → 4
console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // → 30
```

The key property is monotonic feasibility: if speed x works, every larger speed also works.

## Additional problems
- Search Insert Position
- First and Last Position
- Find Minimum in Rotated Sorted Array
- Find Peak Element
- Capacity to Ship Packages
- Split Array Largest Sum

## Pitfalls
Off-by-one boundaries, wrong loop condition, integer midpoint mistakes, and applying binary search without a monotonic property.

## Interview drill
State exactly what [left, right] means. Then explain why the discarded half cannot contain the answer.

## Connection
Binary search introduces ordered search-space reduction. Sorting provides the ordering used by many of these algorithms.

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### First Bad Version — [LeetCode 278](https://leetcode.com/problems/first-bad-version/)

**Idea:** Versions go good…good, bad…bad — a **monotonic** condition. Binary search for the first `true` (lower bound).

```js
function solution(isBadVersion) {
  return function firstBadVersion(n) {
    let lo = 1, hi = n;
    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);    // avoids overflow in other languages
      if (isBadVersion(mid)) hi = mid;               // mid could be the first bad one
      else lo = mid + 1;
    }
    return lo;
  };
}
```

**Try it:**

```js
console.log(solution((v)=>v>=4)(5)); // → 4
console.log(solution((v)=>v>=1)(1)); // → 1
console.log(solution((v)=>v>=10)(10)); // → 10
```

**Complexity:** Time O(log n) · Space O(1).  
**Edge cases:** First version is bad; last version is the only bad one.
