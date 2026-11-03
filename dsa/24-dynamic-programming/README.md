# 24 — Dynamic Programming

DP is systematic reuse of overlapping subproblem results.

The core derivation is:

**state → transition → base case → iteration order → answer → complexity**

## Problem 1 — Climbing Stairs

```js
function climbStairs(n) {
  let prev2 = 1;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(climbStairs(2)); // → 2
console.log(climbStairs(5)); // → 8
```

State: ways to reach step i. Transition: dp[i] = dp[i-1] + dp[i-2].

## Problem 2 — House Robber

At each house choose skip or take.

```js
function rob(nums) {
  let prev2 = 0;
  let prev1 = 0;

  for (const money of nums) {
    const take = prev2 + money;
    const skip = prev1;
    const current = Math.max(take, skip);
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(rob([1, 2, 3, 1])); // → 4
console.log(rob([2, 7, 9, 3, 1])); // → 12
```

State depends only on the previous two positions, allowing O(1) space.

## Problem 3 — Coin Change

```js
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let value = 1; value <= amount; value++) {
    for (const coin of coins) {
      if (coin <= value) {
        dp[value] = Math.min(dp[value], dp[value - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(coinChange([1, 2, 5], 11)); // → 3
console.log(coinChange([2], 3)); // → -1
console.log(coinChange([1], 0)); // → 0
```

State: minimum coins for each amount.

## Problem 4 — Unique Paths

Grid DP: dp[r][c] = top + left.

## Problem 5 — Longest Common Subsequence

```
dp[i][j] = 1 + dp[i-1][j-1] if characters match
otherwise max(dp[i-1][j], dp[i][j-1])
```

This is a canonical 2D string DP.

## Problem 6 — 0/1 Knapsack

State includes how much capacity remains and which items have been considered. Iterative 1D optimization requires iterating capacity backwards so an item is not reused in the same iteration.

## Problem 7 — Longest Increasing Subsequence

Know both O(n²) DP and the O(n log n) tails/binary-search technique.

## Problem 8 — Partition Equal Subset Sum

Reduce to subset-sum target = total / 2.

## Problem 9 — Word Break

State whether prefix i can be segmented. Transition from an earlier reachable position when the substring is a dictionary word.

## Problem 10 — Decode Ways

State number of decodings up to i; transitions depend on valid one-digit and two-digit codes.

## Problem 11 — Edit Distance

2D state represents transforming prefixes. Operations: insert, delete, replace.

## Problem 12 — Stock with Cooldown

State-machine DP: hold, sold, rest. Explicit state modeling prevents ad-hoc transitions.

## DP recognition

Ask:
1. Are there overlapping subproblems?
2. Can a subproblem be represented by a small state?
3. Does the answer depend on smaller states?
4. Are choices repeated?
5. Can brute-force recursion be memoized?

## Memoization vs tabulation

Memoization: top-down, compute states as needed.

Tabulation: bottom-up, choose an order where dependencies are already computed.

## Common mistakes

- wrong state definition
- missing base case
- wrong iteration direction
- accidentally reusing an item
- optimizing space before understanding the full DP
- calling greedy when local optimality is unproven

## Interview requirement

For every DP problem, say the state in one sentence before coding. If you cannot define the state, do not start typing the recurrence.

---

## Full solutions — code, complexity, LeetCode

For every DP say: **state** (what `dp[i]` means) → **transition** → **base case** → **iteration order** → **answer**. Write the table version first; optimise space after.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Unique Paths — [LeetCode 62](https://leetcode.com/problems/unique-paths/)

**Idea:** `dp[c]` = ways to reach the current cell in column c. Each cell = ways from above (old `dp[c]`) + from the left (`dp[c-1]`).

```js
function uniquePaths(m, n) {
  const dp = Array(n).fill(1);              // first row: one way to each cell
  for (let r = 1; r < m; r++)
    for (let c = 1; c < n; c++) dp[c] += dp[c - 1];
  return dp[n - 1];
}
```

**Try it:**

```js
console.log(uniquePaths(3,7)); // → 28
console.log(uniquePaths(3,2)); // → 3
console.log(uniquePaths(1,1)); // → 1
```

**Complexity:** Time O(m·n) · Space O(n).  
**Edge cases:** 1×n or m×1 grid → 1.

### Longest Common Subsequence — [LeetCode 1143](https://leetcode.com/problems/longest-common-subsequence/)

**Idea:** `dp[i][j]` = LCS of `a[0..i)` and `b[0..j)`. Same characters → `1 + dp[i-1][j-1]`; otherwise `max(dp[i-1][j], dp[i][j-1])`.

```js
function longestCommonSubsequence(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length];
}
```

**Try it:**

```js
console.log(longestCommonSubsequence("abcde","ace")); // → 3
console.log(longestCommonSubsequence("abc","def")); // → 0
```

**Complexity:** Time O(m·n) · Space O(m·n) (O(n) with two rows).  
**Edge cases:** No common characters → 0.

### 0/1 Knapsack

**Idea:** `dp[w]` = best value with capacity w. For each item, loop capacity **downwards** so the item is used at most once (upwards would reuse it = unbounded knapsack).

```js
function knapsack(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i++)
    for (let w = capacity; w >= weights[i]; w--)      // downwards!
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
  return dp[capacity];
}
```

**Try it:**

```js
console.log(knapsack([1,3,4,5],[1,4,5,7],7)); // → 9
console.log(knapsack([5],[10],4)); // → 0
```

**Complexity:** Time O(n·W) · Space O(W).  
**Edge cases:** Item heavier than capacity is skipped automatically.

### Longest Increasing Subsequence — [LeetCode 300](https://leetcode.com/problems/longest-increasing-subsequence/)

**Idea:** O(n log n): `tails[k]` = smallest possible tail of an increasing subsequence of length k+1. For each number, binary-search its position in `tails` and replace (or append).

```js
function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {                       // first tail >= x
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1; else hi = mid;
    }
    tails[lo] = x;                          // replace or append
  }
  return tails.length;
}
```

**Try it:**

```js
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // → 4
console.log(lengthOfLIS([0,1,0,3,2,3])); // → 4
console.log(lengthOfLIS([7,7,7,7])); // → 1
```

**Complexity:** Time O(n log n) · Space O(n). (Simple DP: O(n²) with `dp[i] = 1 + max(dp[j])` for j < i, nums[j] < nums[i].)  
**Edge cases:** Strictly increasing required — equal numbers don't extend.

### Partition Equal Subset Sum — [LeetCode 416](https://leetcode.com/problems/partition-equal-subset-sum/)

**Idea:** Need a subset summing to `total / 2` — a 0/1 knapsack on booleans. `can[s]` = some subset sums to s; loop sums downwards.

```js
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const can = Array(target + 1).fill(false);
  can[0] = true;
  for (const n of nums)
    for (let s = target; s >= n; s--) can[s] = can[s] || can[s - n];
  return can[target];
}
```

**Try it:**

```js
console.log(canPartition([1,5,11,5])); // → true
console.log(canPartition([1,2,3,5])); // → false
```

**Complexity:** Time O(n · sum/2) · Space O(sum/2).  
**Edge cases:** Odd total → false immediately.

### Word Break — [LeetCode 139](https://leetcode.com/problems/word-break/)

**Idea:** `ok[i]` = the first i characters can be segmented. `ok[i]` is true if some `ok[j]` is true and `s.slice(j, i)` is a dictionary word.

```js
function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const ok = Array(s.length + 1).fill(false);
  ok[0] = true;
  for (let i = 1; i <= s.length; i++)
    for (let j = 0; j < i; j++)
      if (ok[j] && words.has(s.slice(j, i))) { ok[i] = true; break; }
  return ok[s.length];
}
```

**Try it:**

```js
console.log(wordBreak("leetcode",["leet","code"])); // → true
console.log(wordBreak("applepenapple",["apple","pen"])); // → true
console.log(wordBreak("catsandog",["cats","dog","sand","and","cat"])); // → false
```

**Complexity:** Time O(n²·L) for slicing · Space O(n).  
**Edge cases:** Words can be reused.

### Decode Ways — [LeetCode 91](https://leetcode.com/problems/decode-ways/)

**Idea:** `dp[i]` = ways to decode the first i digits. Add `dp[i-1]` if the last digit is 1–9; add `dp[i-2]` if the last two digits form 10–26. A `0` can't stand alone.

```js
function numDecodings(s) {
  let prev2 = 1, prev1 = s[0] === "0" ? 0 : 1;      // dp[0], dp[1]
  for (let i = 2; i <= s.length; i++) {
    let cur = 0;
    if (s[i - 1] !== "0") cur += prev1;
    const two = Number(s.slice(i - 2, i));
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1; prev1 = cur;
  }
  return prev1;
}
```

**Try it:**

```js
console.log(numDecodings("12")); // → 2
console.log(numDecodings("226")); // → 3
console.log(numDecodings("06")); // → 0
console.log(numDecodings("10")); // → 1
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Leading zero → 0; "06" is invalid; "10" → 1.

### Edit Distance — [LeetCode 72](https://leetcode.com/problems/edit-distance/)

**Idea:** `dp[i][j]` = edits to turn `a[0..i)` into `b[0..j)`. Same char → `dp[i-1][j-1]`; else `1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1])`.

```js
function minDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => Array(b.length + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}
```

**Try it:**

```js
console.log(minDistance("horse","ros")); // → 3
console.log(minDistance("intention","execution")); // → 5
console.log(minDistance("","abc")); // → 3
```

**Complexity:** Time O(m·n) · Space O(m·n).  
**Edge cases:** Empty string → length of the other.

### Best Time to Buy and Sell Stock with Cooldown — [LeetCode 309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

**Idea:** Three states per day: **hold** (own a stock), **sold** (just sold today), **rest** (no stock, free to buy). Transitions: hold = max(hold, rest − price); sold = hold + price; rest = max(rest, sold).

```js
function maxProfit(prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = hold + p;                    // sell today
    hold = Math.max(hold, rest - p);    // keep holding, or buy (only from rest)
    rest = Math.max(rest, prevSold);    // cooldown after selling
  }
  return Math.max(sold, rest);
}
```

**Try it:**

```js
console.log(maxProfit([1,2,3,0,2])); // → 3
console.log(maxProfit([1])); // → 0
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Single day → 0.
