# 12 — Binary Search

## Invariant
If the target exists, it remains inside [left, right].

~~~js
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
~~~

Each comparison eliminates about half the remaining search space, giving O(log n).

## Variants
First/last occurrence, lower bound, upper bound, rotated arrays, binary search on answer.

## Binary search on answer
The data itself need not be sorted. What matters is a monotonic predicate such as false false false true true.

## Pitfalls
Wrong boundaries, infinite loops, duplicate handling, and applying binary search without monotonic structure.

## Challenges
Lower Bound, Search Rotated Array, First/Last Position, Koko Eating Bananas.

## Next
Sorting can create the order required by binary search and pointer techniques.