# 01 — Problem Solving Framework

This is the method to use before writing interview code.

## Step 1 — Clarify

Identify:
- input type
- output
- constraints
- duplicates
- ordering
- mutation requirements
- empty input
- valid/invalid input assumptions

## Step 2 — Brute force

Write the simplest correct solution first.

Example: Two Sum.

```js
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}
```

The important observation is that the inner loop repeatedly searches for a complement.

## Step 3 — Identify the bottleneck

Ask what work is repeated.

For Two Sum, instead of searching the remainder of the array each time, remember values already seen.

## Step 4 — Optimize

```js
function twoSum(nums, target) {
  const indexByValue = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (indexByValue.has(needed)) {
      return [indexByValue.get(needed), i];
    }

    indexByValue.set(nums[i], i);
  }

  return [];
}
```

## Step 5 — State the invariant

> Before processing index i, the Map contains the values and indices from indices 0..i-1.

## Step 6 — Trace

Use a small input and write every state change.

## Step 7 — Complexity

Brute force: O(n²) time, O(1) auxiliary space.

Hashing: expected O(n) time, O(n) space.

## Step 8 — Break it deliberately

Try:
- empty input
- one item
- duplicate values
- negative values
- no solution
- multiple valid pairs

## Step 9 — Variation

Change the problem:
- return all pairs
- return values instead of indices
- input is sorted
- use constant extra space

The correct pattern may change.

## Core interview sequence

**Clarify → brute force → bottleneck → observation → pattern → invariant → implementation → dry run → complexity → edge cases → trade-off → variation.**

This sequence is more important than memorizing individual solutions.
