# 22 — Union-Find / DSU

Disjoint Set Union maintains connected components under repeated union operations.

Each element points toward a representative parent.

## Core operations

- find(x): locate component representative
- union(a,b): merge components

### Path compression

During find, point visited nodes directly toward the root.

### Union by size/rank

Attach the smaller tree beneath the larger tree.

Together these make operations extremely close to constant amortized time: O(alpha(n)).

## Implementation

```js
class DSU {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.size = Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    let ra = this.find(a);
    let rb = this.find(b);

    if (ra === rb) return false;

    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];

    this.parent[rb] = ra;
    this.size[ra] += this.size[rb];
    return true;
  }
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const dsu = new DSU(4);
dsu.union(0, 1); dsu.union(2, 3);
console.log(dsu.find(1) === dsu.find(0)); // → true
console.log(dsu.union(1, 0)); // → false
console.log(dsu.find(0) === dsu.find(3)); // → false
```

## Problem 1 — Number of Provinces

Union every connected city pair, then count distinct representatives.

## Problem 2 — Redundant Connection

Process edges. If union(a,b) returns false, a and b were already connected, so that edge creates a cycle.

## Problem 3 — Connected Components

Start with n components. Each successful union decreases the count by one.

## Problem 4 — Accounts Merge

Treat emails as nodes and union emails belonging to the same account.

## Problem 5 — Kruskal's MST

Sort edges by weight and union endpoints. Accept an edge only when it connects different components.

## When NOT to use DSU

DSU is poor for questions requiring actual traversal paths, distances, or ordered neighbor exploration.

## Recognition
Repeated connectivity queries, merging groups, cycle detection in undirected edge sets, minimum spanning tree.

## Connection
DSU complements graph traversal: it answers connectivity efficiently without constructing traversal state.

---

## Full solutions — code, complexity, LeetCode

Union-Find (Disjoint Set Union) tracks which items are connected. With **path compression + union by size**, each operation is almost O(1) (inverse Ackermann).

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Helper used below

```js
class UnionFind {
  constructor(n) { this.parent = Array.from({ length: n }, (_, i) => i); this.size = Array(n).fill(1); this.count = n; }
  find(x) {
    while (this.parent[x] !== x) { this.parent[x] = this.parent[this.parent[x]]; x = this.parent[x]; } // path compression
    return x;
  }
  union(a, b) {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;                       // already connected
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra; this.size[ra] += this.size[rb]; this.count--;
    return true;
  }
}
```

### Number of Provinces — [LeetCode 547](https://leetcode.com/problems/number-of-provinces/)

**Idea:** Union every pair of connected cities; the number of remaining components is the answer.

```js
function findCircleNum(isConnected) {
  const n = isConnected.length, uf = new UnionFind(n);
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if (isConnected[i][j]) uf.union(i, j);
  return uf.count;
}
```

**Try it:**

```js
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // → 2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // → 3
```

**Complexity:** Time O(n² · α(n)) · Space O(n).  
**Edge cases:** No connections → n provinces.

### Redundant Connection — [LeetCode 684](https://leetcode.com/problems/redundant-connection/)

**Idea:** Add edges one by one; the first edge whose two ends are **already connected** creates the cycle.

```js
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);     // nodes are 1..n
  for (const [a, b] of edges) if (!uf.union(a, b)) return [a, b];
  return [];
}
```

**Try it:**

```js
console.log(JSON.stringify(findRedundantConnection([[1,2],[1,3],[2,3]]))); // → [2,3]
console.log(JSON.stringify(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]]))); // → [1,4]
```

**Complexity:** Time O(n · α(n)) · Space O(n).  
**Edge cases:** Nodes are 1-indexed.

### Number of Connected Components in an Undirected Graph — [LeetCode 323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

**Idea:** Union every edge; the component count is what's left. (LeetCode Premium — free version: LintCode 3651.)

```js
function countComponents(n, edges) {
  const uf = new UnionFind(n);
  for (const [a, b] of edges) uf.union(a, b);
  return uf.count;
}
```

**Try it:**

```js
console.log(countComponents(5,[[0,1],[1,2],[3,4]])); // → 2
console.log(countComponents(5,[[0,1],[1,2],[2,3],[3,4]])); // → 1
```

**Complexity:** Time O(E · α(n)) · Space O(n).  
**Edge cases:** Isolated nodes each count as a component.

### Accounts Merge — [LeetCode 721](https://leetcode.com/problems/accounts-merge/)

**Idea:** Give each email an id; union all emails in the same account. Then group emails by their root and sort them.

```js
function accountsMerge(accounts) {
  const id = new Map(), owner = new Map();
  for (const [name, ...emails] of accounts)
    for (const e of emails) { if (!id.has(e)) id.set(e, id.size); owner.set(e, name); }
  const uf = new UnionFind(id.size);
  for (const [, first, ...rest] of accounts)
    for (const e of rest) uf.union(id.get(first), id.get(e));
  const groups = new Map();
  for (const [email, i] of id) {
    const root = uf.find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }
  return [...groups.values()].map((emails) => [owner.get(emails[0]), ...emails.sort()]);
}
```

**Try it:**

```js
const r=accountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]).map(a=>a.join("|")).sort();
console.log(JSON.stringify(r)); // → ["John|john00@mail.com|john_newyork@mail.com|johnsmith@mail.com","John|johnnybravo@mail.com","Mary|mary@mail.com"]
```

**Complexity:** Time O(N log N) for sorting emails · Space O(N).  
**Edge cases:** Same name but different people (no shared email) stay separate.

### Kruskal's MST — Min Cost to Connect All Points — [LeetCode 1584](https://leetcode.com/problems/min-cost-to-connect-all-points/)

**Idea:** Sort all edges by weight; add an edge if it connects two different components (Union-Find). Stop after n − 1 edges.

```js
function minCostConnectPoints(points) {
  const n = points.length, edges = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      edges.push([Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]), i, j]);
  edges.sort((a, b) => a[0] - b[0]);
  const uf = new UnionFind(n);
  let cost = 0, used = 0;
  for (const [w, a, b] of edges) {
    if (uf.union(a, b)) { cost += w; if (++used === n - 1) break; }
  }
  return cost;
}
```

**Try it:**

```js
console.log(minCostConnectPoints([[0,0],[2,2],[3,10],[5,2],[7,0]])); // → 20
console.log(minCostConnectPoints([[3,12],[-2,5],[-4,1]])); // → 18
console.log(minCostConnectPoints([[0,0]])); // → 0
```

**Complexity:** Time O(n² log n) (all pairs) · Space O(n²). Prim's with a heap is the alternative.  
**Edge cases:** Single point → 0.
