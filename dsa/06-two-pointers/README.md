# 06 — Two Pointers

## Recognition
Think two pointers for sorted pair problems, palindrome checks, in-place compaction, partitioning, and some same-direction scans.

## Sorted pair
~~~js
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }

  return [];
}
~~~

If sum is too small, increasing left is the only move that can increase it in a sorted array. If sum is too large, decrease right. Each move permanently discards impossible pairs.

Time O(n), space O(1).

## Critical question
Was the input sorted? If not, sorting may cost O(n log n) and can destroy original-index requirements.

## Challenges
Valid Palindrome, Container With Most Water, 3Sum, Remove Duplicates from Sorted Array.

## Next
A variable two-pointer range becomes a sliding window when the range itself represents a valid contiguous candidate.