# 08 — Prefix Sum

## Core idea
Precompute cumulative values so a range query becomes a constant-time subtraction.

For prefix with leading zero:
range l..r = prefix[r + 1] - prefix[l].

## Example
~~~js
function buildPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}
~~~

The leading zero means index 0 has sum 0, eliminating a special case.

## Hash-map prefix pattern
For subarray sum K, if currentPrefix - oldPrefix = K, then the segment between those positions sums to K. Store frequencies of previous prefix sums because the same sum can occur multiple times.

## Pitfalls
Off-by-one boundaries, forgetting duplicate prefix sums, and using sliding window when negative values make its monotonic assumption invalid.

## Challenges
Range Sum Query, Subarray Sum Equals K, Pivot Index, Product Except Self.

## Next
A stack models unresolved work where the newest item must be handled first.