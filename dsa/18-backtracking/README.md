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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(subsets([1, 2, 3])); // → [[],[3],[2],[2,3],[1],[1,3],[1,2],[1,2,3]]
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

---

## Full solutions — code, complexity, LeetCode

Template: **choose → explore → un-choose**. Prune as early as possible; copy the path (`[...path]`) when you save it.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Permutations — [LeetCode 46](https://leetcode.com/problems/permutations/)

**Idea:** Build the permutation position by position; a `used` array stops reusing a number.

```js
function permute(nums) {
  const result = [], path = [], used = Array(nums.length).fill(false);
  const backtrack = () => {
    if (path.length === nums.length) { result.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);       // choose
      backtrack();                              // explore
      path.pop(); used[i] = false;              // un-choose
    }
  };
  backtrack();
  return result;
}
```

**Try it:**

```js
console.log(permute([1,2,3]).length); // → 6
console.log(JSON.stringify(permute([0,1]))); // → [[0,1],[1,0]]
```

**Complexity:** Time O(n · n!) · Space O(n) besides output.  
**Edge cases:** Single element.

### Combination Sum — [LeetCode 39](https://leetcode.com/problems/combination-sum/)

**Idea:** Each candidate can be reused, so recurse with the **same index** after choosing it. Start from `start` to avoid duplicate orderings; sort to prune when the sum overshoots.

```js
function combinationSum(candidates, target) {
  const nums = [...candidates].sort((a, b) => a - b);
  const result = [], path = [];
  const backtrack = (start, remaining) => {
    if (remaining === 0) { result.push([...path]); return; }
    for (let i = start; i < nums.length; i++) {
      if (nums[i] > remaining) break;           // sorted → no later number fits either
      path.push(nums[i]);
      backtrack(i, remaining - nums[i]);        // i, not i + 1: reuse allowed
      path.pop();
    }
  };
  backtrack(0, target);
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(combinationSum([2,3,6,7],7))); // → [[2,2,3],[7]]
console.log(JSON.stringify(combinationSum([2],1))); // → []
```

**Complexity:** Time exponential, roughly O(N^(T/M)) (T target, M min value) · Space O(T/M) depth.  
**Edge cases:** No combination → [].

### Generate Parentheses — [LeetCode 22](https://leetcode.com/problems/generate-parentheses/)

**Idea:** Add `(` while you still have opens left; add `)` only if it won't exceed the opens used so far.

```js
function generateParenthesis(n) {
  const result = [];
  const backtrack = (s, open, close) => {
    if (s.length === 2 * n) { result.push(s); return; }
    if (open < n) backtrack(s + "(", open + 1, close);
    if (close < open) backtrack(s + ")", open, close + 1);
  };
  backtrack("", 0, 0);
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(generateParenthesis(3))); // → ["((()))","(()())","(())()","()(())","()()()"]
console.log(JSON.stringify(generateParenthesis(1))); // → ["()"]
```

**Complexity:** Time O(4ⁿ/√n) (Catalan number of results) · Space O(n).  
**Edge cases:** n = 1 → ["()"].

### N-Queens — [LeetCode 51](https://leetcode.com/problems/n-queens/)

**Idea:** Place one queen per row. Track used columns and both diagonals in Sets: `r - c` is constant on one diagonal, `r + c` on the other.

```js
function solveNQueens(n) {
  const result = [], cols = new Set(), diag = new Set(), anti = new Set();
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const place = (r) => {
    if (r === n) { result.push(board.map((row) => row.join(""))); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c); diag.add(r - c); anti.add(r + c); board[r][c] = "Q";
      place(r + 1);
      cols.delete(c); diag.delete(r - c); anti.delete(r + c); board[r][c] = ".";
    }
  };
  place(0);
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(solveNQueens(4))); // → [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
console.log(JSON.stringify(solveNQueens(1))); // → [["Q"]]
console.log(JSON.stringify(solveNQueens(3))); // → []
```

**Complexity:** Time O(n!) · Space O(n²) for the board.  
**Edge cases:** n = 2 and n = 3 have no solutions.

### Word Search — [LeetCode 79](https://leetcode.com/problems/word-search/)

**Idea:** DFS from every cell; mark a cell as visited **temporarily** (replace with `#`) and restore it when backtracking.

```js
function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;
    const saved = board[r][c];
    board[r][c] = "#";                                      // mark visited
    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = saved;                                    // restore
    return found;
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}
```

**Try it:**

```js
const B=()=>[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
console.log(exist(B(),"ABCCED")); // → true
console.log(exist(B(),"SEE")); // → true
console.log(exist(B(),"ABCB")); // → false
```

**Complexity:** Time O(m·n·4^L) (L = word length) · Space O(L).  
**Edge cases:** Can't reuse a cell ("ABCB").
