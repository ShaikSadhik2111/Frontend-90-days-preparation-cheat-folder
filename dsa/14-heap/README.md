# 14 — Heap / Priority Queue

## Mental model
A min-heap keeps the smallest item at the root; a max-heap keeps the largest. It does not fully sort the data.

For zero-based arrays:
parent(i)=floor((i-1)/2)
left(i)=2i+1
right(i)=2i+2

## Operations
peek O(1), insert O(log n), extract root O(log n).

## Top K
Maintain a min-heap of size K. If a new value exceeds the root, remove the root and insert the new value. The heap contains the best K candidates.

Complexity O(n log k).

## JavaScript
There is no universal built-in general-purpose PriorityQueue API to rely on in interviews, so know how to implement a binary heap.

## Challenges
Implement MinHeap, Kth Largest, Top K Frequent, Merge K Sorted Lists.

## Next
Intervals combine sorting with overlap invariants.