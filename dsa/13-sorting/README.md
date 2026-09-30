# 13 — Sorting

## Why sort
Sorting is often preprocessing, not the final answer. It exposes ordering that enables scans, two pointers, interval merging, and binary search.

## Know
Bubble/selection/insertion for fundamentals; merge sort, quicksort, and heap sort for algorithmic reasoning.

Merge sort: O(n log n) time, O(n) auxiliary array space.
Quick sort: average O(n log n), worst O(n²) depending on partitioning.
Insertion sort: O(n²) worst, useful when nearly sorted.

## JavaScript
~~~js
nums.sort((a, b) => a - b);
~~~
The comparator is necessary for numeric ascending order. sort mutates the array.

## Interview questions
Why sort? Does sorting destroy required indices? Is mutation allowed? Could a heap avoid full sorting?

## Challenges
Merge Intervals, 3Sum, Meeting Rooms, Kth Largest.

## Next
If you need only the next minimum/maximum repeatedly, a heap can be cheaper than complete sorting.