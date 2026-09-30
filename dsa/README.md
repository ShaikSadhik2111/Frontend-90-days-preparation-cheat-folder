# DSA — Interview Backbone

DSA is the algorithmic backbone of this preparation. This section is JavaScript-first and is designed for deep understanding rather than solution memorization.

## 01 → 27 progression

01-problem-solving-framework
02-complexity
03-arrays
04-strings
05-hashing
06-two-pointers
07-sliding-window
08-prefix-sum
09-stack
10-queue
11-linked-list
12-binary-search
13-sorting
14-heap
15-intervals
16-matrix
17-recursion
18-backtracking
19-trees
20-trie
21-graphs
22-union-find
23-greedy
24-dynamic-programming
25-bit-manipulation
26-monotonic-stack
27-patterns

## Learning standard

Every important problem must be understood at four levels:

**1. Syntax** — what every keyword, operator, method, and variable does.

**2. State** — what each variable represents at every point.

**3. Invariant** — what remains true after each iteration/recursive step.

**4. Complexity** — why the runtime and memory scale the way they do.

## Interview method

Clarify → constraints → brute force → bottleneck → observation → data structure/pattern → invariant → implementation → dry run → complexity → edge cases → trade-offs.

## JavaScript DSA behavior to know

Array indexing, push/pop, shift/unshift, Map, Set, object lookup, string immutability, numeric sort comparators, recursion call stack, references/mutation, Number vs BigInt where relevant.

## Future-ready principle

The durable knowledge is the algorithmic reasoning: complexity, invariants, search-space reduction, pointer movement, state modeling, graph traversal, and optimization. JavaScript APIs and interview platforms may change, but these principles remain fundamental.

## Study rule

For every problem:
1. Attempt it yourself.
2. Write brute force.
3. Identify the bottleneck.
4. Derive the optimized approach.
5. Code without copying.
6. Trace every line.
7. Intentionally break it.
8. Debug it.
9. Explain it aloud.
10. Solve a variation.

This is the standard required for the DSA section to support serious interview preparation.


## End-to-end coverage contract

A DSA topic is **not complete** when it only contains definitions or a list of patterns. Every major pattern must be taught through multiple implementations.

For each important pattern, the learning sequence is:

**What → Why → Recognition signals → Brute force → Bottleneck → Optimized idea → Invariant/state → JavaScript implementation → line-by-line explanation → dry run → complexity → edge cases → common bugs → variation → interview questions.**

### Minimum coding coverage

Each major pattern must have **at least 2–3 coding problems**, with additional problems for patterns that commonly appear in interviews.

Problems should progress from:
1. Basic implementation
2. Standard interview problem
3. Variation / harder problem

### Coverage checklist

The DSA roadmap must cover, where applicable:

- JavaScript array/string operations and their complexity
- Traversal and in-place techniques
- Hashing, Map and Set
- Two pointers
- Sliding window
- Prefix/suffix and prefix-sum techniques
- Stack, queue, deque and monotonic structures
- Linked-list pointer manipulation
- Binary search and search-on-answer
- Sorting algorithms and sorting-based problem solving
- Heap / priority queue and Top-K problems
- Intervals and sweep-line reasoning
- Matrix/grid traversal
- Recursion and call-stack reasoning
- Backtracking and pruning
- Trees: DFS, BFS, BST and path/state problems
- Trie and prefix problems
- Graphs: BFS, DFS, components, cycles, topological sort, shortest paths and bipartite graphs
- Union-Find / DSU
- Greedy reasoning and proof intuition
- Dynamic programming: 1D, 2D, grid, knapsack, subsequence, string, state-machine and interval DP
- Bit manipulation
- Monotonic stack/deque
- Mixed pattern recognition and interview revision

### Completion rule

A problem list alone does **not** count as completion. The corresponding topic README must contain enough worked examples for the learner to derive the solution rather than memorize it.

The final goal is:

**Recognize the pattern → derive brute force → identify the bottleneck → choose the data structure/technique → state the invariant → implement → trace every line → prove complexity → handle edge cases → solve a variation.**
