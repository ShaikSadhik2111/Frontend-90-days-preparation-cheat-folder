# 21 — Graphs

## First classify
Directed/undirected? Weighted/unweighted? Cyclic/acyclic? Sparse/dense? Need reachability, shortest path, ordering, or connectivity?

## Adjacency list
~~~js
const graph = new Map();
graph.set("A", ["B", "C"]);
~~~

For sparse graphs, adjacency lists usually use O(V+E) storage.

## BFS
Shortest path in an unweighted graph can be found by exploring level by level.

## DFS
Useful for components, cycle detection, and exhaustive traversal.

## Weighted graphs
Dijkstra handles non-negative edge weights. Negative edges require other algorithms.

## Topological sorting
Valid for directed acyclic graphs and dependency ordering.

## Pitfalls
Not marking visited, marking too late, treating directed edges as undirected, and using Dijkstra where negative weights exist.

## Challenges
Number of Islands, Clone Graph, Course Schedule, connected components, shortest unweighted path, topological sort.

## Next
Union-Find is specialized for repeated component merging.