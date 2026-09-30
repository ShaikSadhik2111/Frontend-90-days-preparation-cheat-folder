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
