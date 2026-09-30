# 03 — Arrays

## Mental model
An array is an indexed sequence. Index access is O(1), while searching is generally O(n).

## Core operations
Access/update O(1); scan O(n); push/pop amortized O(1); shift/unshift typically O(n).

## In-place reversal
~~~js
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
~~~

### Trace
left identifies the first unresolved position; right identifies the last. Swap both values, then move inward. Once left >= right, every position is resolved.

Time O(n), auxiliary space O(1).

## Important patterns
Traversal, frequency counting, two pointers, sliding window, prefix/suffix accumulation, sorting + scan, monotonic stack.

## Pitfalls
Off-by-one errors, confusing index/value, accidental mutation, nested scans when hashing would work, and ignoring empty input.

## Interview challenge
Implement reverse, rotate, move zeroes, remove duplicates from sorted array, maximum subarray, and product except self. For each, explain why each pointer/variable exists.

## Next
Strings use sequence reasoning but introduce immutability and Unicode details.