# DSA — pattern templates + the 120-problem list

> **Engineering MNCs** (Siemens, Honeywell, Continental, Schneider) usually ask easy–medium array/string/hashmap problems, often in JavaScript.
> **Product companies** (Walmart, Target, Atlassian, Adobe, Intuit, PayPal…) ask mediums, sometimes trees/graphs.
> You don't need DP-heavy competitive programming. You need **patterns + clean JS + explaining complexity**.

## The method for every problem (say this out loud in interviews)
1. Restate the problem + ask about constraints (size of n? negatives? duplicates? sorted? empty input?).
2. Give a **brute force** and its complexity.
3. Find the bottleneck → which **pattern** removes it?
4. Code it cleanly. Name variables well.
5. **Dry run** with a small example. Then edge cases: empty, one element, duplicates, negatives, very large.
6. State time & space complexity.

Tracker status: 🔴 couldn't solve · 🟡 solved with hint · 🟢 solved alone in < 25 min. Redo every 🔴/🟡 after 3 days and again after 7 days.

## Big-O cheat sheet
| Complexity | n = 10⁵ OK? | Typical cause |
|---|---|---|
| O(1), O(log n) | ✅ | hash lookup, binary search |
| O(n) | ✅ | single pass, two pointers, sliding window |
| O(n log n) | ✅ | sorting, heap operations |
| O(n²) | ❌ (10¹⁰) | nested loops — OK only for n ≤ ~3000 |
| O(2ⁿ), O(n!) | ❌ | subsets/permutations — only n ≤ 20 |

JS costs to remember: `array.includes/indexOf/shift/unshift/splice` are **O(n)**; `push/pop` O(1); `Map/Set` get/has/add O(1) average; `sort` O(n log n); string concatenation in a loop can be O(n²) → collect in an array and `join`.

---

## Pattern templates (JavaScript)

### 1. Hash map — frequency / seen-before
```js
// Two Sum (LC 1): value → index
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
// Frequency count
const freq = new Map();
for (const x of arr) freq.set(x, (freq.get(x) ?? 0) + 1);
```
**Signal:** "find a pair", "duplicates", "count", "anagram", "first unique". O(n) time, O(n) space.

### 2. Two pointers (sorted array or both ends)
```js
// Two Sum II (LC 167) — sorted input
function twoSumSorted(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++; else r--;
  }
  return [];
}
// Same-direction (slow/fast write pointer) — Move Zeroes (LC 283), Remove Duplicates (LC 26)
function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) [nums[write++], nums[read]] = [nums[read], nums[write]];
  }
}
```
**Signal:** sorted, palindrome, pair/triplet, in-place. O(n) time, O(1) space.

### 3. Sliding window (contiguous subarray/substring)
```js
// Variable window: longest substring without repeating chars (LC 3)
function lengthOfLongestSubstring(s) {
  const last = new Map();   // char → last index
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    if (last.has(s[right]) && last.get(s[right]) >= left) left = last.get(s[right]) + 1;
    last.set(s[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
// Generic: expand right; while (window invalid) shrink left; update answer
```
**Signal:** "longest/shortest/max sum **subarray/substring**", "at most K". O(n).

### 4. Prefix sum
```js
// Subarray Sum Equals K (LC 560) — works with negatives
function subarraySum(nums, k) {
  const count = new Map([[0, 1]]);
  let sum = 0, result = 0;
  for (const x of nums) {
    sum += x;
    result += count.get(sum - k) ?? 0;
    count.set(sum, (count.get(sum) ?? 0) + 1);
  }
  return result;
}
```
**Signal:** range sums, "subarray sum equals", many range queries.

### 5. Stack (and monotonic stack)
```js
// Valid Parentheses (LC 20)
function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch in pairs) { if (stack.pop() !== pairs[ch]) return false; }
    else stack.push(ch);
  }
  return stack.length === 0;
}
// Daily Temperatures (LC 739) — monotonic decreasing stack of indices
function dailyTemperatures(t) {
  const res = new Array(t.length).fill(0), stack = [];
  for (let i = 0; i < t.length; i++) {
    while (stack.length && t[i] > t[stack.at(-1)]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
```
**Signal:** matching brackets, "next greater/smaller", undo, parsing, browser history.

### 6. Binary search
```js
// Lower bound: first index where nums[i] >= target
function lowerBound(nums, target) {
  let lo = 0, hi = nums.length;          // [lo, hi)
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] < target) lo = mid + 1; else hi = mid;
  }
  return lo;
}
// "Binary search on the answer" (Koko LC 875): search smallest k where feasible(k) is true
```
**Signal:** sorted input, "minimum X such that…", O(log n) required.

### 7. Linked list
```js
function reverseList(head) {                 // LC 206
  let prev = null, cur = head;
  while (cur) { const next = cur.next; cur.next = prev; prev = cur; cur = next; }
  return prev;
}
function hasCycle(head) {                    // LC 141 — Floyd fast/slow
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; if (slow === fast) return true; }
  return false;
}
```
Use a **dummy head** node when the head may change (merge, remove).

### 8. Trees — DFS & BFS
```js
const maxDepth = (root) => (root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0); // LC 104

function levelOrder(root) {                  // LC 102 — BFS by level
  if (!root) return [];
  const result = [];
  let queue = [root];
  while (queue.length) {
    result.push(queue.map((n) => n.val));
    queue = queue.flatMap((n) => [n.left, n.right].filter(Boolean));
  }
  return result;
}
function isValidBST(node, min = -Infinity, max = Infinity) { // LC 98
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return isValidBST(node.left, min, node.val) && isValidBST(node.right, node.val, max);
}
```
**Frontend link:** the DOM is a tree. "Find all elements with class X", "get path from root to node", "serialize a component tree" are common FE twists.

### 9. Graphs — BFS/DFS on grid
```js
function numIslands(grid) {                  // LC 200
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === "1") { count++; dfs(r, c); }
  return count;
}
// Topological sort (Course Schedule LC 207): indegree array + queue (Kahn's algorithm)
```
**Frontend link:** dependency graphs (module bundling, task ordering) → topological sort.

### 10. Heap / Top-K
JS has no built-in heap. In interviews: (a) say "I'd use a min-heap of size k → O(n log k)", (b) for Top-K Frequent use **bucket sort** O(n), or (c) write a small heap if asked:
```js
class MinHeap {
  #a = [];
  get size() { return this.#a.length; }
  peek() { return this.#a[0]; }
  push(v) { const a = this.#a; a.push(v); let i = a.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (a[p] <= a[i]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } }
  pop() { const a = this.#a; const top = a[0]; const last = a.pop();
    if (a.length) { a[0] = last; let i = 0;
      for (;;) { const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < a.length && a[l] < a[m]) m = l; if (r < a.length && a[r] < a[m]) m = r;
        if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } }
    return top; }
}
```

### 11. Intervals
Sort by start, then merge if `cur.start <= last.end` (LC 56).

### 12. Backtracking
```js
function subsets(nums) {                     // LC 78
  const res = [];
  const path = [];
  const backtrack = (start) => {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]); backtrack(i + 1); path.pop();   // choose → explore → un-choose
    }
  };
  backtrack(0);
  return res;
}
```

### 13. Dynamic programming (basics only)
State → recurrence → base case → order. Climbing Stairs: `dp[i] = dp[i-1] + dp[i-2]`. House Robber: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Coin Change: `dp[a] = min(dp[a - coin] + 1)`. Start with memoized recursion, then convert to a table.

---

## The list (≈120 problems) — follow the order in [PLAN.md](../../PLAN.md)

Use the LeetCode number to find each. ⭐ = must-do.

**A. Arrays & hashing (Days 1–8):** 1 Two Sum⭐ · 217 Contains Duplicate · 242 Valid Anagram⭐ · 49 Group Anagrams⭐ · 347 Top K Frequent⭐ · 238 Product of Array Except Self⭐ · 128 Longest Consecutive Sequence⭐ · 36 Valid Sudoku · 121 Best Time to Buy and Sell Stock⭐ · 53 Maximum Subarray⭐ · 88 Merge Sorted Array · 26 Remove Duplicates · 27 Remove Element · 169 Majority Element · 189 Rotate Array · 283 Move Zeroes⭐ · 268 Missing Number · 448 Find All Numbers Disappeared · 387 First Unique Character · 383 Ransom Note · 205 Isomorphic Strings · 290 Word Pattern · 14 Longest Common Prefix

**B. Two pointers (Days 9–11):** 125 Valid Palindrome⭐ · 344 Reverse String · 167 Two Sum II⭐ · 977 Squares of a Sorted Array · 392 Is Subsequence · 680 Valid Palindrome II · 15 3Sum⭐ · 11 Container With Most Water⭐ · 42 Trapping Rain Water

**C. Sliding window & prefix sum (Days 12–16):** 643 Maximum Average Subarray I · 209 Minimum Size Subarray Sum⭐ · 3 Longest Substring Without Repeating⭐ · 424 Longest Repeating Character Replacement⭐ · 567 Permutation in String · 438 Find All Anagrams · 76 Minimum Window Substring · 724 Find Pivot Index · 303 Range Sum Query · 560 Subarray Sum Equals K⭐ · 239 Sliding Window Maximum

**D. Stack & queue (Days 17–20):** 20 Valid Parentheses⭐ · 155 Min Stack⭐ · 232 Queue using Stacks · 225 Stack using Queues · 150 Evaluate RPN · 71 Simplify Path · 394 Decode String⭐ · 496 Next Greater Element I · 739 Daily Temperatures⭐ · 735 Asteroid Collision

**E. Binary search (Days 21–24):** 704 Binary Search⭐ · 35 Search Insert Position · 278 First Bad Version · 34 First and Last Position⭐ · 74 Search a 2D Matrix · 153 Min in Rotated Sorted Array⭐ · 33 Search in Rotated Sorted Array⭐ · 875 Koko Eating Bananas

**F. Linked list (Days 25–28):** 206 Reverse Linked List⭐ · 21 Merge Two Sorted Lists⭐ · 141 Linked List Cycle⭐ · 876 Middle of the Linked List · 234 Palindrome Linked List · 160 Intersection of Two Lists · 19 Remove Nth Node From End⭐ · 2 Add Two Numbers · 143 Reorder List · 146 LRU Cache⭐ (frontend favourite — see `code/polyfills/src/LRUCache.js`)

**G. Trees (Days 29–36):** 94 Inorder Traversal · 104 Max Depth⭐ · 100 Same Tree · 226 Invert Binary Tree⭐ · 101 Symmetric Tree · 112 Path Sum · 543 Diameter⭐ · 110 Balanced Binary Tree · 572 Subtree of Another Tree · 102 Level Order⭐ · 199 Right Side View⭐ · 235 LCA of BST · 236 LCA of Binary Tree⭐ · 98 Validate BST⭐ · 230 Kth Smallest in BST · 105 Construct from Preorder & Inorder

**H. Heap, intervals, greedy (Days 37–40):** 703 Kth Largest in a Stream · 1046 Last Stone Weight · 215 Kth Largest Element⭐ · 973 K Closest Points · 56 Merge Intervals⭐ · 57 Insert Interval · 435 Non-overlapping Intervals · 55 Jump Game⭐ · 134 Gas Station

**I. Backtracking & graphs (Days 41–46):** 78 Subsets⭐ · 46 Permutations⭐ · 39 Combination Sum · 17 Letter Combinations · 22 Generate Parentheses⭐ · 79 Word Search · 733 Flood Fill · 200 Number of Islands⭐ · 695 Max Area of Island · 994 Rotting Oranges⭐ · 133 Clone Graph · 207 Course Schedule⭐

**J. DP basics (Days 47–50):** 70 Climbing Stairs⭐ · 746 Min Cost Climbing Stairs · 198 House Robber⭐ · 62 Unique Paths · 322 Coin Change⭐ · 300 Longest Increasing Subsequence · 1143 Longest Common Subsequence · 139 Word Break

**K. Frontend-flavoured JS problems (mix in from Day 20):** implement `debounce`, `throttle`, `Promise.all`, `deepClone`, `flatten`, `curry`, `EventEmitter`, `get`, `memoize`, `promisePool`, `getElementsByClassName` (DOM tree walk), `JSON.stringify` (simplified), `classNames`, `Array.prototype.reduce`. Reference + tests: [`code/polyfills`](../../code/polyfills). Extra practice sites: GreatFrontEnd, BFE.dev (BigFrontEnd), Frontend Mentor for UI.
