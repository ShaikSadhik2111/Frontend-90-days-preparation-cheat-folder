# Mixed Interview Sets — Unknown Pattern Recognition

In a real interview nobody tells you "this is a sliding window problem". These sets mix patterns so you practise **recognising** them.

## How to use
1. Do one set per sitting, **45 minutes per 2 problems** (like a real round).
2. Before coding, write: brute force → its complexity → the repeated work → the pattern you'll use.
3. Only then open the hint. Mark each problem 🟢 / 🟡 / 🔴 in the DSA tab of your tracker.

Process: `Understand → constraints → brute force → bottleneck → observation → candidate patterns → invariant/state → implementation → dry run → complexity → edge cases → trade-offs`

Don't start by asking "which LeetCode pattern is this?". Ask what repeated work, structure, invariant or constraint the problem exposes.

---

## Set 1 — Warm-up (easy/medium)
| # | Problem | Hint |
|---|---|---|
| 1 | [Valid Anagram (242)](https://leetcode.com/problems/valid-anagram/) | <details><summary>pattern</summary>Hashing — count characters</details> |
| 2 | [Best Time to Buy and Sell Stock (121)](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | <details><summary>pattern</summary>One pass — track minimum price so far</details> |
| 3 | [Valid Parentheses (20)](https://leetcode.com/problems/valid-parentheses/) | <details><summary>pattern</summary>Stack</details> |
| 4 | [Merge Two Sorted Lists (21)](https://leetcode.com/problems/merge-two-sorted-lists/) | <details><summary>pattern</summary>Linked list + dummy head</details> |
| 5 | [Binary Search (704)](https://leetcode.com/problems/binary-search/) | <details><summary>pattern</summary>Binary search</details> |
| 6 | [Maximum Depth of Binary Tree (104)](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | <details><summary>pattern</summary>Tree DFS — return height</details> |

## Set 2 — Core mediums
| # | Problem | Hint |
|---|---|---|
| 1 | [Product of Array Except Self (238)](https://leetcode.com/problems/product-of-array-except-self/) | <details><summary>pattern</summary>Prefix and suffix products</details> |
| 2 | [Longest Repeating Character Replacement (424)](https://leetcode.com/problems/longest-repeating-character-replacement/) | <details><summary>pattern</summary>Sliding window — window size minus most frequent char ≤ k</details> |
| 3 | [Container With Most Water (11)](https://leetcode.com/problems/container-with-most-water/) | <details><summary>pattern</summary>Two pointers — move the shorter side</details> |
| 4 | [Find Minimum in Rotated Sorted Array (153)](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | <details><summary>pattern</summary>Binary search — compare mid with right end</details> |
| 5 | [Binary Tree Right Side View (199)](https://leetcode.com/problems/binary-tree-right-side-view/) | <details><summary>pattern</summary>BFS by level — last node per level</details> |
| 6 | [Top K Frequent Elements (347)](https://leetcode.com/problems/top-k-frequent-elements/) | <details><summary>pattern</summary>Hashing + bucket sort (or heap)</details> |

## Set 3 — Frontend-company favourites
| # | Problem | Hint |
|---|---|---|
| 1 | [LRU Cache (146)](https://leetcode.com/problems/lru-cache/) | <details><summary>pattern</summary>Map keeps insertion order — delete and re-insert on access</details> |
| 2 | [Merge Intervals (56)](https://leetcode.com/problems/merge-intervals/) | <details><summary>pattern</summary>Sort by start, then merge in one pass</details> |
| 3 | [Group Anagrams (49)](https://leetcode.com/problems/group-anagrams/) | <details><summary>pattern</summary>Hashing — sorted word or letter counts as the key</details> |
| 4 | [Decode String (394)](https://leetcode.com/problems/decode-string/) | <details><summary>pattern</summary>Stack of (count, string so far)</details> |
| 5 | [Number of Islands (200)](https://leetcode.com/problems/number-of-islands/) | <details><summary>pattern</summary>Grid DFS/BFS — sink each island</details> |
| 6 | [Subarray Sum Equals K (560)](https://leetcode.com/problems/subarray-sum-equals-k/) | <details><summary>pattern</summary>Prefix sum + Map of counts (negatives break sliding window)</details> |

## Set 4 — Harder mix
| # | Problem | Hint |
|---|---|---|
| 1 | [Course Schedule (207)](https://leetcode.com/problems/course-schedule/) | <details><summary>pattern</summary>Graph — topological sort / cycle detection</details> |
| 2 | [Coin Change (322)](https://leetcode.com/problems/coin-change/) | <details><summary>pattern</summary>DP — dp[amount] = min coins</details> |
| 3 | [Daily Temperatures (739)](https://leetcode.com/problems/daily-temperatures/) | <details><summary>pattern</summary>Monotonic decreasing stack of indices</details> |
| 4 | [Kth Largest Element in an Array (215)](https://leetcode.com/problems/kth-largest-element-in-an-array/) | <details><summary>pattern</summary>Min-heap of size k</details> |
| 5 | [Word Search (79)](https://leetcode.com/problems/word-search/) | <details><summary>pattern</summary>Backtracking DFS with visited marking</details> |
| 6 | [Lowest Common Ancestor of a Binary Tree (236)](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | <details><summary>pattern</summary>Tree DFS — return found node upward</details> |

## Set 5 — Mock interview (pick 2, 45 minutes, no hints)
[3Sum (15)](https://leetcode.com/problems/3sum/) · [Minimum Window Substring (76)](https://leetcode.com/problems/minimum-window-substring/) · [Search in Rotated Sorted Array (33)](https://leetcode.com/problems/search-in-rotated-sorted-array/) · [Rotting Oranges (994)](https://leetcode.com/problems/rotting-oranges/) · [Longest Increasing Subsequence (300)](https://leetcode.com/problems/longest-increasing-subsequence/) · [Merge k Sorted Lists (23)](https://leetcode.com/problems/merge-k-sorted-lists/) · [Word Break (139)](https://leetcode.com/problems/word-break/) · [Largest Rectangle in Histogram (84)](https://leetcode.com/problems/largest-rectangle-in-histogram/)

Solutions for most of these are in the topic folders (each has a **Full solutions** section or worked problems with **Try it** examples).
