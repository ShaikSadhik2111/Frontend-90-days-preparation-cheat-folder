# 18 — Backtracking

Backtracking explores a decision tree and undoes a choice before trying the next option.

Template:

```js
function backtrack(state) {
  if (isComplete(state)) {
    result.push(copy(state));
    return;
  }

  for (const choice of choices(state)) {
    apply(choice);
    backtrack(state);
    undo(choice);
  }
}
```

The undo step restores the state for the next branch.

## Problem 1 — Subsets

```js
function subsets(nums) {
  const result = [];
  const path = [];

  function dfs(i) {
    if (i === nums.length) {
      result.push([...path]);
      return;
    }

    dfs(i + 1);

    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }

  dfs(0);
  return result;
}
```

Each element creates a take/skip decision.

## Problem 2 — Permutations

Choose an unused element at each level. Mark it, recurse, then unmark it.

## Problem 3 — Combination Sum

Continue choosing candidates while the remaining target is non-negative. The candidate index controls whether reuse is allowed.

## Problem 4 — Generate Parentheses

Only add ')' when closing count is less than opening count. This is constraint pruning.

## Problem 5 — N-Queens

Place one queen per row and reject columns/diagonals already occupied.

## Problem 6 — Word Search

Move through grid neighbors, mark the current cell, recurse, then restore it.

## Recognition
Look for all combinations/permutations, choose/explore/undo, constraint satisfaction, or "return all valid configurations."

## Complexity
Often exponential because the algorithm explores a decision tree. Pruning reduces practical work but should not be claimed as a different asymptotic bound without proof.

## Pitfalls
Mutating result references, forgetting undo, incorrect duplicate handling, and insufficient pruning.

## Connection
Backtracking explores explicit choices. **Trees** provide a natural recursive structure that can be traversed with the same state reasoning.
