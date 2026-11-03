# 08 — Prefix Sum

Prefix sums turn repeated range aggregation into constant-time range calculations after O(n) preprocessing.

## Core formula

```
prefix[i] = sum of values before i
sum(l..r) = prefix[r + 1] - prefix[l]
```

The same idea extends to prefix XOR, prefix frequency, and prefix state + hashing.

## Problem 1 — Running Sum

```js
function runningSum(nums) {
  const result = [];
  let sum = 0;

  for (const num of nums) {
    sum += num;
    result.push(sum);
  }

  return result;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(runningSum([1, 2, 3, 4])); // → [1,3,6,10]
```

Invariant: sum equals the total of all processed values.

## Problem 2 — Pivot Index

```js
function pivotIndex(nums) {
  const total = nums.reduce((sum, n) => sum + n, 0);
  let left = 0;

  for (let i = 0; i < nums.length; i++) {
    const right = total - left - nums[i];
    if (left === right) return i;
    left += nums[i];
  }

  return -1;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // → 3
console.log(pivotIndex([1, 2, 3])); // → -1
```

The key observation is that right sum can be derived from total instead of rescanning.

## Problem 3 — Subarray Sum Equals K

```js
function subarraySum(nums, k) {
  const count = new Map([[0, 1]]);
  let prefix = 0;
  let answer = 0;

  for (const num of nums) {
    prefix += num;

    answer += count.get(prefix - k) ?? 0;
    count.set(prefix, (count.get(prefix) ?? 0) + 1);
  }

  return answer;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(subarraySum([1, 1, 1], 2)); // → 2
console.log(subarraySum([1, -1, 0], 0)); // → 3
```

Derivation:
prefixCurrent - prefixPrevious = k
therefore prefixPrevious = prefixCurrent - k.

The Map stores how many previous prefixes equal the required state.

## Difference arrays

For repeated range updates, a difference array marks where a change begins and ends, then a prefix sum reconstructs final values.

Example: add +5 to indices 2..4:

```js
diff[2] += 5;
diff[5] -= 5;
```

Prefixing diff applies the update to every position in the range.

## Additional problems
- Range Sum Query
- Contiguous Array
- Product of Array Except Self
- Corporate Flight Bookings / range updates

## Prefix variants
- prefix sum
- prefix XOR
- prefix frequency
- 2D prefix sum
- prefix + Set/Map

## Pitfalls
Define clearly whether prefix[i] includes nums[i]. The extra leading zero convention often prevents off-by-one errors.

## Interview drill
Given a range query, ask whether repeated aggregation can be replaced by cumulative state. For subarray-count problems, ask whether two prefix states have a required difference.

## Connection
**Prefix Sum → Stack**: prefix methods preserve cumulative state; stacks preserve unresolved order and allow reverse/last-in-first-out reasoning.

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### Range Sum Query - Immutable — [LeetCode 303](https://leetcode.com/problems/range-sum-query-immutable/)

**Idea:** Precompute `prefix[i]` = sum of the first i numbers. Then `sum(left..right) = prefix[right + 1] - prefix[left]` in O(1).

```js
class NumArray {
  constructor(nums) {
    this.prefix = [0];
    for (const n of nums) this.prefix.push(this.prefix[this.prefix.length - 1] + n);
  }
  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

**Try it:**

```js
const na=new NumArray([-2,0,3,-5,2,-1]);
console.log(na.sumRange(0,2)); // → 1
console.log(na.sumRange(2,5)); // → -1
console.log(na.sumRange(0,5)); // → -3
```

**Complexity:** Constructor O(n) · each query O(1) · Space O(n).  
**Edge cases:** left === right → single element.
