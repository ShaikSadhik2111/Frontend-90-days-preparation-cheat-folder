# 16 — Matrix

## Mental model
A matrix is an indexed grid. Many problems are graph problems disguised as arrays.

Coordinates are row and column. Validate bounds before accessing neighbors.

## Four directions
~~~js
const directions = [[1,0], [-1,0], [0,1], [0,-1]];
~~~

For each cell, add direction offsets to find neighbors.

## Traversal
Number of Islands can be solved by DFS/BFS: when land is found, traverse the entire connected component and mark it visited.

## Common bugs
Row/column reversal, boundary errors, revisiting cells, modifying input unexpectedly, and assuming rectangular dimensions without constraints.

## Challenges
Spiral Matrix, Set Matrix Zeroes, Number of Islands, Rotting Oranges, Flood Fill.

## Next
Recursion provides the foundation for tree traversal, DFS, and backtracking.