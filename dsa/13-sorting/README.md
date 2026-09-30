# 13 — Sorting

Sorting is both an algorithm topic and a preprocessing technique.

Know what the common algorithms do, their complexity, stability, memory behavior, and when sorting simplifies a problem.

## JavaScript trap

```js
[10, 2, 5].sort();        // [10, 2, 5] as strings
[10, 2, 5].sort((a,b)=>a-b); // numeric
```

Always provide a numeric comparator for numeric sorting.

## Problem 1 — Insertion Sort

```js
function insertionSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    const value = nums[i];
    let j = i - 1;

    while (j >= 0 && nums[j] > value) {
      nums[j + 1] = nums[j];
      j--;
    }

    nums[j + 1] = value;
  }

  return nums;
}
```

Invariant: indices 0..i-1 are sorted before inserting nums[i].

Worst case O(n²), extra space O(1).

## Problem 2 — Merge Sort

```js
function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i), right.slice(j));
}
```

Divide into halves, sort each half, then merge two sorted sequences.

O(n log n) time; this implementation uses O(n) auxiliary memory plus recursion.

## Problem 3 — Quick Sort

Know partitioning deeply even if production JavaScript usually delegates sorting to the built-in implementation.

```js
function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left >= right) return nums;

  const pivot = nums[right];
  let partition = left;

  for (let i = left; i < right; i++) {
    if (nums[i] < pivot) {
      [nums[i], nums[partition]] = [nums[partition], nums[i]];
      partition++;
    }
  }

  [nums[partition], nums[right]] = [nums[right], nums[partition]];

  quickSort(nums, left, partition - 1);
  quickSort(nums, partition + 1, right);

  return nums;
}
```

Average O(n log n), worst O(n²) with poor pivot choices.

## Sorting as a problem-solving technique

### Problem 4 — Merge Intervals

Sort by start time, then compare each interval with the last merged interval.

```js
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];

  for (const interval of intervals) {
    const last = result[result.length - 1];

    if (!last || interval[0] > last[1]) {
      result.push([...interval]);
    } else {
      last[1] = Math.max(last[1], interval[1]);
    }
  }

  return result;
}
```

Sorting exposes the ordering that makes overlap decisions local.

## Additional problems
- Sort Colors
- Meeting Rooms
- Largest Number
- Kth Largest via sorting vs heap
- Top K Frequent via sorting vs hashing

## Algorithms to know
Bubble, selection, insertion, merge, quick, counting/bucket concepts, and the behavior of JavaScript's built-in sort.

## Interview drill
For every algorithm explain: best/average/worst time, extra space, stable/in-place characteristics, and why one might choose it.

## Connection
Sorting can create the ordering required by **heaps and intervals** while also serving as a preprocessing step for two pointers.
