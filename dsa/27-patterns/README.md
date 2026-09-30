# 27 — DSA Patterns and Interview Revision

## Recognition table

| Signal | Pattern |
|---|---|
| repeated membership/frequency | Map / Set |
| sorted pair/triplet | Two pointers |
| contiguous range | Sliding window |
| repeated range sum | Prefix sum |
| newest unresolved item | Stack |
| oldest unresolved item | Queue |
| monotonic search space | Binary search |
| repeated top K/min/max | Heap |
| overlapping ranges | Sort + intervals |
| hierarchy | Tree DFS/BFS |
| arbitrary relationships | Graph |
| component merging | Union-Find |
| all combinations | Backtracking |
| overlapping subproblems | DP |
| provably safe local choice | Greedy |
| next greater/smaller | Monotonic stack |
| prefix matching | Trie |
| compact boolean state | Bits |

## Universal interview flow
Clarify → constraints → brute force → bottleneck → observation → pattern → invariant → code → dry run → complexity → edge cases → trade-off.

## Code tracing standard
For every function, identify:
- initial state
- purpose of every variable
- loop condition
- mutation
- invariant
- return condition
- complexity

Do not say "this loop processes the array." Say exactly what state changes on every iteration.

## Problem ladder

### Foundation
Two Sum, Contains Duplicate, Valid Anagram, Valid Parentheses, Binary Search, Reverse Linked List.

### Intermediate
3Sum, Longest Substring Without Repeating Characters, Product Except Self, Top K Frequent, Merge Intervals, Number of Islands, Validate BST, Coin Change.

### Advanced
Minimum Window Substring, Largest Rectangle, Word Search, Course Schedule, LRU Cache, Merge K Sorted Lists, LIS, Edit Distance, Serialize/Deserialize Tree.

## Revision record
For every solved problem store:
Problem → Pattern → Key observation → Invariant → Complexity → Edge cases → Mistake → Variation.

That turns problem solving into reusable knowledge rather than memorized code.

## Final standard
You are ready to move on only when you can:
1. derive the approach,
2. explain every line,
3. dry-run it without an IDE,
4. prove the complexity,
5. identify failure cases,
6. modify it for a variation.