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
