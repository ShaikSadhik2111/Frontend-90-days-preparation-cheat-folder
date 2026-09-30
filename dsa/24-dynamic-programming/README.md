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
