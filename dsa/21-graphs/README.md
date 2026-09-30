# 21 — Graphs

Graphs model arbitrary relationships. A grid, dependency graph, social network, route map, and service topology can all be graphs.

## Representations

Adjacency list is usually efficient for sparse graphs:

```js
const graph = Array.from({length: n}, () => []);
graph[u].push(v);
```

## Problem 1 — BFS

```js
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  let head = 0;
  const order = [];

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return order;
}
```

Mark visited when enqueueing to avoid duplicates.

## Problem 2 — DFS / Connected Components

```js
function countComponents(n, edges) {
  const graph = Array.from({length: n}, () => []);

  for (const [a,b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = new Set();
  let count = 0;

  function dfs(node) {
    if (visited.has(node)) return;
    visited.add(node);

    for (const next of graph[node]) dfs(next);
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      count++;
      dfs(i);
    }
  }

  return count;
}
```

## Problem 3 — Number of Islands

Treat each land cell as a graph node. DFS/BFS visits its four neighbors.

## Problem 4 — Cycle Detection

For undirected graphs, track the parent during DFS/BFS. For directed graphs, track the recursion/visiting state.

## Problem 5 — Topological Sort

Use indegrees and a queue (Kahn's algorithm), or DFS with three-state visitation.

Applications: build dependencies, course prerequisites, package order.

## Problem 6 — Course Schedule

A valid course ordering exists iff the directed prerequisite graph has no cycle.

## Problem 7 — Shortest Unweighted Path

BFS finds the minimum number of edges because nodes are discovered in nondecreasing distance.

## Problem 8 — Dijkstra

For non-negative weighted edges, repeatedly finalize the closest unsettled node using a min-heap.

## Problem 9 — Bipartite Graph

Color nodes with two colors. If an edge connects equal colors, the graph is not bipartite.

## Problem 10 — Word Ladder

BFS over implicit word-neighbor relationships.

## Recognition
Relationship/dependency, reachability, connectivity, shortest unweighted path, ordering dependencies, cycles.

## Pitfalls
Visited timing, directed vs undirected edges, disconnected graphs, recursion depth, and confusing BFS shortest path with weighted shortest path.

## Connection
Graphs lead to **Union-Find** when the main question is dynamic connectivity rather than traversal.
