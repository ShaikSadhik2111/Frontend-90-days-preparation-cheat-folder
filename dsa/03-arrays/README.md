# 03 — Arrays

Arrays are indexed sequences and the most common starting point for DSA interviews.

## JavaScript operations

| Operation | Typical complexity |
|---|---|
| nums[i] | O(1) |
| nums[i] = x | O(1) |
| push/pop | amortized O(1) |
| shift/unshift | O(n) |
| includes/indexOf | O(n) |
| sort | implementation-dependent; comparator work also matters |
| slice | O(k) for copied elements |

## Problem 1 — Reverse in place

```js
function reverse(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  return nums;
}
```

Invariant: positions outside [left,right] are already correct.

## Problem 2 — Move Zeroes

Use a write pointer for the next non-zero position, then fill remaining positions with zero.

This teaches stable in-place partitioning.

## Problem 3 — Remove Duplicates from Sorted Array

Use read/write pointers. The sorted property makes it unnecessary to remember every prior value.

## Problem 4 — Rotate Array

Understand both reversal-based O(1)-space rotation and auxiliary-array rotation. Compare trade-offs.

## Problem 5 — Best Time to Buy/Sell Stock

Track the cheapest price seen so far and the best profit.

```js
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}
```

Invariant: minPrice is the cheapest valid buying price seen before/currently; best is the best profit discovered.

## Problem 6 — Maximum Subarray

Kadane's algorithm decides whether the current subarray should be extended or restarted.

```js
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}
```

State: current = best sum ending at the current index.

## Problem 7 — Product Except Self

Build prefix products from the left and suffix products from the right without division.

## Problem 8 — Majority Element

Know both frequency-map and Boyer-Moore approaches. The latter uses O(1) extra space under the majority-element guarantee.

## Problem 9 — Merge Sorted Arrays

Two sorted arrays can be merged with two pointers.

## Problem 10 — Sort Colors

Use three regions and the Dutch National Flag algorithm.

## Other important patterns

- frequency counting
- prefix/suffix accumulation
- partitioning
- sorting + scan
- binary-search-on-array
- monotonic techniques
- matrix transition

## Common mistakes

Confusing index and value, mutating caller-owned arrays, off-by-one boundaries, using `shift()` in loops, forgetting empty input, and using default JavaScript `sort()` for numbers.

## Interview drill

For every array problem explain:
- what each pointer means
- what part is processed
- what invariant holds
- why the algorithm terminates
- complexity
- whether input is mutated

## Practice ladder

Foundation: reverse, move zeroes, remove duplicates.

Intermediate: stock profit, rotate array, merge arrays, maximum subarray.

Advanced: product except self, majority element, sort colors.

## Connection

Arrays → Strings because strings are also sequences, but strings introduce immutability and Unicode behavior.
