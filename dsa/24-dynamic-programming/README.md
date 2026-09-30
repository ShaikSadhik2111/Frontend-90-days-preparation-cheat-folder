# 24 — Dynamic Programming

## Recognition
Look for overlapping subproblems and optimal substructure.

## Derivation
1. Define exactly what dp[state] means.
2. Derive the transition from smaller states.
3. Establish base cases.
4. Choose top-down memoization or bottom-up tabulation.
5. Check complexity.
6. Optimize space only after the state is correct.

## Example
For climbing stairs, dp[i] = number of ways to reach i.
dp[i] = dp[i-1] + dp[i-2].

~~~js
let prev2 = 1;
let prev1 = 1;

for (let i = 2; i <= n; i++) {
  const current = prev1 + prev2;
  prev2 = prev1;
  prev1 = current;
}
~~~

At each iteration prev1 is the previous state and prev2 is the state before it. current must be computed before variables shift.

## Families
1D, grid, knapsack, subsequence, interval, partition, state-machine, bitmask DP.

## Debugging
If DP is wrong, inspect the state definition before the code. Many DP failures are modeling errors.

## Challenges
Climbing Stairs, House Robber, Coin Change, LIS, Unique Paths, 0/1 Knapsack, Edit Distance.

## Next
Bit operations provide compact representations of boolean state.