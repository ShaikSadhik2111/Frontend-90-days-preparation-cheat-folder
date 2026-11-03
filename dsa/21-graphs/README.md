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

**Try it** (run with `node file.js` or in the browser console):

```js
const graph = [[1, 2], [0, 3], [0, 3], [1, 2]];   // adjacency list: node 0 connects to 1 and 2, …
console.log(bfs(graph, 0)); // → [0,1,2,3]
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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]])); // → 2
console.log(countComponents(4, [])); // → 4
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

---

## Full solutions — code, complexity, LeetCode

Build an **adjacency list** first (`Array.from({ length: n }, () => [])`). BFS = shortest path in unweighted graphs; DFS = explore/connectivity/cycles; Kahn's algorithm = topological order.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Helper used below

```js
const buildGraph = (n, edges, directed = false) => {
  const g = Array.from({ length: n }, () => []);
  for (const [a, b, w] of edges) { g[a].push([b, w]); if (!directed) g[b].push([a, w]); }
  return g;
};
```

### Number of Islands — [LeetCode 200](https://leetcode.com/problems/number-of-islands/)

**Idea:** Scan the grid; each unvisited land cell starts a DFS that sinks the whole island. Count how many DFS calls you start.

```js
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  const sink = (r, c) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    sink(r + 1, c); sink(r - 1, c); sink(r, c + 1); sink(r, c - 1);
  };
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === "1") { count++; sink(r, c); }
  return count;
}
```

**Try it:**

```js
console.log(numIslands([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])); // → 3
```

**Complexity:** Time O(m·n) · Space O(m·n) worst-case recursion (use BFS for huge grids).  
**Edge cases:** Grid values are strings "1"/"0" on LeetCode.

### Cycle Detection (undirected & directed)

**Idea:** **Undirected:** DFS and skip the edge back to the parent; reaching any other visited node = cycle. **Directed:** 3 colours — 0 unvisited, 1 on the current path, 2 done. Reaching a node with colour 1 = cycle.

```js
function hasCycleUndirected(n, edges) {
  const g = buildGraph(n, edges);
  const visited = Array(n).fill(false);
  const dfs = (node, parent) => {
    visited[node] = true;
    for (const [next] of g[node]) {
      if (next === parent) continue;
      if (visited[next] || dfs(next, node)) return true;
    }
    return false;
  };
  for (let i = 0; i < n; i++) if (!visited[i] && dfs(i, -1)) return true;
  return false;
}

function hasCycleDirected(n, edges) {
  const g = buildGraph(n, edges, true);
  const color = Array(n).fill(0);            // 0 new, 1 visiting, 2 done
  const dfs = (node) => {
    color[node] = 1;
    for (const [next] of g[node]) {
      if (color[next] === 1) return true;    // back edge
      if (color[next] === 0 && dfs(next)) return true;
    }
    color[node] = 2;
    return false;
  };
  for (let i = 0; i < n; i++) if (color[i] === 0 && dfs(i)) return true;
  return false;
}
```

**Try it:**

```js
console.log(hasCycleUndirected(3,[[0,1],[1,2],[2,0]])); // → true
console.log(hasCycleUndirected(3,[[0,1],[1,2]])); // → false
console.log(hasCycleDirected(3,[[0,1],[1,2],[2,0]])); // → true
console.log(hasCycleDirected(3,[[0,1],[0,2],[1,2]])); // → false
```

**Complexity:** Time O(V + E) · Space O(V).  
**Edge cases:** Disconnected graphs — start DFS from every unvisited node.

### Course Schedule (topological sort, Kahn's algorithm) — [LeetCode 207](https://leetcode.com/problems/course-schedule/)

**Idea:** Count incoming edges (indegree). Start with all courses that have indegree 0; taking one decrements its neighbours. If you can take all n courses there is no cycle. The order you take them is a **topological order** (Course Schedule II, LC 210).

```js
function canFinish(numCourses, prerequisites) {
  return topoOrder(numCourses, prerequisites).length === numCourses;
}

function topoOrder(n, prerequisites) {        // also solves LC 210
  const g = Array.from({ length: n }, () => []);
  const indegree = Array(n).fill(0);
  for (const [course, pre] of prerequisites) { g[pre].push(course); indegree[course]++; }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order = [];
  for (let head = 0; head < queue.length; head++) {   // index pointer instead of shift()
    const node = queue[head];
    order.push(node);
    for (const next of g[node]) if (--indegree[next] === 0) queue.push(next);
  }
  return order.length === n ? order : [];
}
```

**Try it:**

```js
console.log(canFinish(2,[[1,0]])); // → true
console.log(canFinish(2,[[1,0],[0,1]])); // → false
console.log(JSON.stringify(topoOrder(4,[[1,0],[2,0],[3,1],[3,2]]))); // → [0,1,2,3]
```

**Complexity:** Time O(V + E) · Space O(V + E).  
**Edge cases:** No prerequisites → any order; self-loop → impossible.

### Shortest Path in an Unweighted Graph (BFS) — [LeetCode 1091](https://leetcode.com/problems/shortest-path-in-binary-matrix/)

**Idea:** BFS explores in rings of distance 1, 2, 3… so the first time you reach the target is the shortest path. Example: Shortest Path in Binary Matrix (8 directions).

```js
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const queue = [[0, 0, 1]];
  grid[0][0] = 1;                                        // mark visited
  for (let head = 0; head < queue.length; head++) {
    const [r, c, dist] = queue[head];
    if (r === n - 1 && c === n - 1) return dist;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nc >= 0 && nr < n && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1; queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}
```

**Try it:**

```js
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])); // → 2
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // → 4
console.log(shortestPathBinaryMatrix([[1,0,0],[1,1,0],[1,1,0]])); // → -1
```

**Complexity:** Time O(n²) · Space O(n²).  
**Edge cases:** Blocked start or end → -1; 1×1 grid → 1.

### Dijkstra — Network Delay Time — [LeetCode 743](https://leetcode.com/problems/network-delay-time/)

**Idea:** Weighted shortest paths with non-negative weights: always expand the **closest unfinished node** (min-heap). Skip stale heap entries.

```js
function networkDelayTime(times, n, k) {
  const g = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) g[u].push([v, w]);
  const dist = Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap = new MinHeapPairs();                 // [distance, node]
  heap.push([0, k]);
  while (heap.size) {
    const [d, node] = heap.pop();
    if (d > dist[node]) continue;                  // stale entry
    for (const [next, w] of g[node]) {
      if (d + w < dist[next]) { dist[next] = d + w; heap.push([dist[next], next]); }
    }
  }
  const worst = Math.max(...dist.slice(1));
  return worst === Infinity ? -1 : worst;
}

class MinHeapPairs {                               // min-heap ordered by pair[0]
  constructor() { this.a = []; }
  get size() { return this.a.length; }
  push(x) { const a = this.a; a.push(x); let i = a.length - 1;
    while (i > 0) { const p = (i - 1) >> 1; if (a[p][0] <= a[i][0]) break; [a[p], a[i]] = [a[i], a[p]]; i = p; } }
  pop() { const a = this.a; const top = a[0]; const last = a.pop();
    if (a.length) { a[0] = last; let i = 0;
      for (;;) { const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < a.length && a[l][0] < a[m][0]) m = l; if (r < a.length && a[r][0] < a[m][0]) m = r;
        if (m === i) break; [a[m], a[i]] = [a[i], a[m]]; i = m; } }
    return top; }
}
```

**Try it:**

```js
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]],4,2)); // → 2
console.log(networkDelayTime([[1,2,1]],2,2)); // → -1
console.log(networkDelayTime([[1,2,1],[2,3,2],[1,3,4]],3,1)); // → 3
```

**Complexity:** Time O((V + E) log V) · Space O(V + E).  
**Edge cases:** Unreachable node → -1. Negative weights need Bellman-Ford instead.

### Is Graph Bipartite? — [LeetCode 785](https://leetcode.com/problems/is-graph-bipartite/)

**Idea:** Colour nodes with BFS/DFS alternating 0/1. If an edge connects two nodes of the same colour, it's not bipartite. Check every component.

```js
function isBipartite(graph) {
  const color = Array(graph.length).fill(-1);
  for (let start = 0; start < graph.length; start++) {
    if (color[start] !== -1) continue;
    color[start] = 0;
    const queue = [start];
    for (let head = 0; head < queue.length; head++) {
      const node = queue[head];
      for (const next of graph[node]) {
        if (color[next] === -1) { color[next] = 1 - color[node]; queue.push(next); }
        else if (color[next] === color[node]) return false;
      }
    }
  }
  return true;
}
```

**Try it:**

```js
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])); // → false
console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]])); // → true
```

**Complexity:** Time O(V + E) · Space O(V).  
**Edge cases:** Disconnected graph; isolated nodes.

### Word Ladder — [LeetCode 127](https://leetcode.com/problems/word-ladder/)

**Idea:** Each word is a node; neighbours differ by one letter. BFS from `beginWord`. Generate neighbours by changing each position to a–z and checking a Set; delete words from the Set when visited.

```js
function ladderLength(beginWord, endWord, wordList) {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;
  let queue = [beginWord], steps = 1;
  while (queue.length) {
    const next = [];
    for (const word of queue) {
      if (word === endWord) return steps;
      for (let i = 0; i < word.length; i++) {
        for (let code = 97; code <= 122; code++) {
          const candidate = word.slice(0, i) + String.fromCharCode(code) + word.slice(i + 1);
          if (words.has(candidate)) { words.delete(candidate); next.push(candidate); }
        }
      }
    }
    queue = next; steps++;
  }
  return 0;
}
```

**Try it:**

```js
console.log(ladderLength("hit","cog",["hot","dot","dog","lot","log","cog"])); // → 5
console.log(ladderLength("hit","cog",["hot","dot","dog","lot","log"])); // → 0
```

**Complexity:** Time O(N · L · 26) (N words, L length; string building adds a factor of L) · Space O(N).  
**Edge cases:** endWord missing from the list → 0.
