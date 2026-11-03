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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(canJump([2, 3, 1, 1, 4])); // → true
console.log(canJump([3, 2, 1, 0, 4])); // → false
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

---

## Full solutions — code, complexity, LeetCode

Greedy = make the locally best choice and **prove it never hurts** (exchange argument or "stays ahead"). If you can't argue it, try DP.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Assign Cookies — [LeetCode 455](https://leetcode.com/problems/assign-cookies/)

**Idea:** Sort both. Give the smallest cookie that satisfies the least greedy child — never waste a big cookie on a small appetite.

```js
function findContentChildren(greed, cookies) {
  const g = [...greed].sort((a, b) => a - b), s = [...cookies].sort((a, b) => a - b);
  let child = 0;
  for (let i = 0; i < s.length && child < g.length; i++) {
    if (s[i] >= g[child]) child++;       // cookie satisfies this child
  }
  return child;
}
```

**Try it:**

```js
console.log(findContentChildren([1,2,3],[1,1])); // → 1
console.log(findContentChildren([1,2],[1,2,3])); // → 2
```

**Complexity:** Time O(n log n + m log m) · Space O(n + m) for copies.  
**Edge cases:** No cookies → 0.

### Jump Game II — [LeetCode 45](https://leetcode.com/problems/jump-game-ii/)

**Idea:** BFS by ranges: `end` is the farthest index reachable with the current number of jumps. When you reach `end`, jump once more and extend to the farthest index seen.

```js
function jump(nums) {
  let jumps = 0, end = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === end) { jumps++; end = farthest; }
  }
  return jumps;
}
```

**Try it:**

```js
console.log(jump([2,3,1,1,4])); // → 2
console.log(jump([2,3,0,1,4])); // → 2
console.log(jump([0])); // → 0
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Single element → 0 jumps.

### Gas Station — [LeetCode 134](https://leetcode.com/problems/gas-station/)

**Idea:** If total gas < total cost, impossible. Otherwise, whenever the running tank goes negative, no station up to here can be the start — **restart from the next station**.

```js
function canCompleteCircuit(gas, cost) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff; tank += diff;
    if (tank < 0) { start = i + 1; tank = 0; }
  }
  return total >= 0 ? start : -1;
}
```

**Try it:**

```js
console.log(canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])); // → 3
console.log(canCompleteCircuit([2,3,4],[3,4,3])); // → -1
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Answer is unique when it exists.

### Partition Labels — [LeetCode 763](https://leetcode.com/problems/partition-labels/)

**Idea:** Record the last index of each letter. Extend the current part's end to the last occurrence of every letter you see; when `i` reaches the end, cut.

```js
function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const sizes = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) { sizes.push(end - start + 1); start = i + 1; }
  }
  return sizes;
}
```

**Try it:**

```js
console.log(JSON.stringify(partitionLabels("ababcbacadefegdehijhklij"))); // → [9,7,8]
console.log(JSON.stringify(partitionLabels("eccbbbbdec"))); // → [10]
```

**Complexity:** Time O(n) · Space O(1) (26 letters).  
**Edge cases:** All letters distinct → every part has size 1.

Non-overlapping Intervals (LC 435) is solved in [15 — Intervals](../15-intervals/README.md#full-solutions--code-complexity-leetcode).
