# 16 — Matrix and Grid

A matrix is usually an array of arrays. Grid problems combine indexing with boundary checks and often transition into BFS/DFS.

## Problem 1 — Transpose

```js
function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({length: cols}, () => Array(rows));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      result[c][r] = matrix[r][c];
    }
  }

  return result;
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(transpose([[1, 2, 3], [4, 5, 6]])); // → [[1,4],[2,5],[3,6]]
```

## Problem 2 — Spiral Matrix

Maintain top, bottom, left, right boundaries and shrink them after completing each edge.

Invariant: everything outside the four boundaries has already been emitted.

## Problem 3 — Rotate Image

Transpose then reverse every row for a square matrix.

```js
function rotate(matrix) {
  const n = matrix.length;

  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  for (const row of matrix) row.reverse();
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
rotate(m);
console.log(m); // → [[7,4,1],[8,5,2],[9,6,3]]
```

This is in-place O(1) auxiliary space excluding the matrix itself.

## Problem 4 — Set Matrix Zeroes

Track which rows and columns contain zero, then perform a second pass. Advanced version uses first row/column as marker storage.

## Grid traversal bridge
Treat cells as graph nodes with up/down/left/right neighbors.

Problems:
- Flood Fill
- Number of Islands
- Word Search
- Rotting Oranges

## Pitfalls
Boundary errors, accidentally revisiting cells, mutating while still needing original values.

## Connection
**Matrix → Graphs**: a grid is an implicit graph.

---

## Full solutions — code, complexity, LeetCode

Matrix problems are mostly about **index bookkeeping**: boundaries, directions and doing work in place.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Spiral Matrix — [LeetCode 54](https://leetcode.com/problems/spiral-matrix/)

**Idea:** Keep four boundaries (top, bottom, left, right). Walk right → down → left → up, shrinking a boundary after each side. Check boundaries again before the last two sides (single row/column).

```js
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) result.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) result.push(matrix[r][left]); left++; }
  }
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))); // → [1,2,3,6,9,8,7,4,5]
console.log(JSON.stringify(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))); // → [1,2,3,4,8,12,11,10,9,5,6,7]
console.log(JSON.stringify(spiralOrder([[1],[2],[3]]))); // → [1,2,3]
```

**Complexity:** Time O(m·n) · Space O(1) besides output.  
**Edge cases:** Single row, single column, non-square.

### Set Matrix Zeroes — [LeetCode 73](https://leetcode.com/problems/set-matrix-zeroes/)

**Idea:** Use the **first row and first column as markers** for which rows/columns to clear. Remember separately whether the first row/column themselves had a zero. O(1) extra space.

```js
function setZeroes(m) {
  const rows = m.length, cols = m[0].length;
  const firstRowZero = m[0].some((v) => v === 0);
  const firstColZero = m.some((row) => row[0] === 0);

  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (m[r][c] === 0) { m[r][0] = 0; m[0][c] = 0; }      // mark

  for (let r = 1; r < rows; r++)
    for (let c = 1; c < cols; c++)
      if (m[r][0] === 0 || m[0][c] === 0) m[r][c] = 0;       // apply

  if (firstRowZero) for (let c = 0; c < cols; c++) m[0][c] = 0;
  if (firstColZero) for (let r = 0; r < rows; r++) m[r][0] = 0;
  return m;
}
```

**Try it:**

```js
console.log(JSON.stringify(setZeroes([[1,1,1],[1,0,1],[1,1,1]]))); // → [[1,0,1],[0,0,0],[1,0,1]]
console.log(JSON.stringify(setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]]))); // → [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

**Complexity:** Time O(m·n) · Space O(1).  
**Edge cases:** Zero in the first row/column; whole matrix zero.

### Flood Fill — [LeetCode 733](https://leetcode.com/problems/flood-fill/)

**Idea:** DFS from the start cell, recolouring cells that have the original colour. Return early if the new colour equals the old one (otherwise infinite recursion).

```js
function floodFill(image, sr, sc, color) {
  const original = image[sr][sc];
  if (original === color) return image;
  const fill = (r, c) => {
    if (r < 0 || c < 0 || r >= image.length || c >= image[0].length || image[r][c] !== original) return;
    image[r][c] = color;
    fill(r + 1, c); fill(r - 1, c); fill(r, c + 1); fill(r, c - 1);
  };
  fill(sr, sc);
  return image;
}
```

**Try it:**

```js
console.log(JSON.stringify(floodFill([[1,1,1],[1,1,0],[1,0,1]],1,1,2))); // → [[2,2,2],[2,2,0],[2,0,1]]
console.log(JSON.stringify(floodFill([[0,0,0],[0,0,0]],0,0,0))); // → [[0,0,0],[0,0,0]]
```

**Complexity:** Time O(m·n) · Space O(m·n) recursion in the worst case.  
**Edge cases:** New colour equals old colour.

### Rotting Oranges — [LeetCode 994](https://leetcode.com/problems/rotting-oranges/)

**Idea:** **Multi-source BFS**: start with every rotten orange in the queue at minute 0 and spread level by level. If fresh oranges remain, return -1.

```js
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  let queue = [], fresh = 0, minutes = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue)
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; next.push([nr, nc]);
        }
      }
    queue = next; minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
```

**Try it:**

```js
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // → 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // → -1
console.log(orangesRotting([[0,2]])); // → 0
```

**Complexity:** Time O(m·n) · Space O(m·n).  
**Edge cases:** No fresh oranges → 0; unreachable fresh orange → -1.
