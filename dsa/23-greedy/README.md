# 23 — Greedy

Greedy algorithms make a locally optimal choice while maintaining a proof that the choice cannot prevent a global optimum.

Do not equate "greedy seems good" with correctness.

## Problem 1 — Assign Cookies

Sort both arrays. Give the smallest sufficient cookie to the least-demanding child. If a cookie cannot satisfy the current child, try a larger cookie.

## Problem 2 — Jump Game

Track the farthest reachable index.

```js
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
  }

  return true;
}
```

Invariant: farthest is the maximum index reachable using positions processed so far.

## Problem 3 — Jump Game II

Track the current reachable layer and the farthest next layer. When reaching the current layer boundary, increment jumps.

This is effectively BFS-level reasoning compressed into a greedy scan.

## Problem 4 — Gas Station

If total gas < total cost, no solution exists. When the current tank becomes negative, restart after the current index because none of the failed segment's starts can work.

## Problem 5 — Non-overlapping Intervals

Sort by end time and keep the interval ending earliest. An earlier finish leaves maximum room for future intervals.

## Problem 6 — Partition Labels

Record each character's last occurrence. Extend the current partition until every character inside has its last occurrence within the partition.

## Proof intuition
Common greedy proofs use:
- exchange argument
- staying-ahead argument
- cut/property argument

## Pitfalls
Greedy is not interchangeable with DP. If a local choice cannot be justified, look for DP, graph shortest path, or another pattern.

## Recognition
Earliest finish, maximum reach, scheduling, choose as many compatible items as possible, local choice with provable future flexibility.
