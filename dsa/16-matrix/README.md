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
