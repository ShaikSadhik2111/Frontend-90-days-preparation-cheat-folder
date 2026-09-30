# 27 — DSA Pattern Recognition and Revision

The final skill is choosing the pattern before coding.

## Pattern decision tree

### Array/string
- Need frequency/membership? → Map/Set
- Sorted pair/triplet? → Two pointers
- Contiguous range with constraint? → Sliding window
- Range aggregation/subarray state? → Prefix sum + Map
- Next/previous greater/smaller? → Monotonic stack
- Need ordered priority? → Heap

### Search
- Sorted/monotonic answer space? → Binary search
- Search all valid configurations? → Backtracking
- Repeated overlapping states? → DP

### Structure
- LIFO/nesting? → Stack
- FIFO/levels? → Queue/BFS
- Pointer rewiring? → Linked list
- Hierarchical relationships? → Tree
- Arbitrary relationships/dependencies? → Graph
- Repeated connectivity merges? → Union-Find
- Prefix dictionary? → Trie

## Mixed practice problems

1. Two Sum — hashing
2. Two Sum II — two pointers
3. Longest Substring Without Repeating Characters — sliding window
4. Subarray Sum Equals K — prefix + hashing
5. Daily Temperatures — monotonic stack
6. Kth Largest — heap
7. Merge Intervals — sorting + interval scan
8. Number of Islands — graph/grid BFS/DFS
9. Course Schedule — graph + topological sort
10. Coin Change — DP
11. Combination Sum — backtracking
12. Search in Rotated Sorted Array — binary search
13. Lowest Common Ancestor — tree DFS
14. Longest Consecutive Sequence — hashing
15. 3Sum — sorting + two pointers

## Interview process

For every new problem:

1. Restate input/output.
2. Ask constraints.
3. Write brute force.
4. Identify the repeated work.
5. Ask what information could be remembered.
6. Choose the data structure/pattern.
7. State the invariant.
8. Code.
9. Dry-run a normal case.
10. Dry-run an edge case.
11. Give time/space complexity.
12. Explain a trade-off.
13. Solve one variation.

## Coverage audit

A topic is only considered complete when its README contains:
- mental model
- recognition signals
- at least 2–3 worked coding problems
- line-by-line reasoning for representative code
- complexity
- edge cases
- common bugs
- variations
- interview questions

This chapter is the final audit layer, not a substitute for the detailed topic chapters.

## 30-second recognition drill

Before coding, say:

> "The input has ___ structure. The output asks for ___. The repeated work is ___. The useful invariant/state is ___. Therefore I will use ___ because ___."

If you can say that accurately, you are solving rather than guessing.
