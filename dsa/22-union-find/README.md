# 22 — Union-Find

## Purpose
Track connected components while edges are added.

Operations:
find(x) → representative.
union(a,b) → merge components.

## Optimizations
Path compression makes find flatten paths. Union by size/rank keeps trees shallow. Together they give near-constant amortized complexity.

## Mental model
If find(a) === find(b), both belong to the same component.

## Uses
Dynamic connectivity, Kruskal MST, redundant connection, account merging, component grouping.

## Pitfalls
Incorrect parent initialization, merging non-roots, forgetting size/rank, confusing connectivity with traversal order.

## Challenge
Implement DSU from scratch with parent and size arrays. Then solve Number of Provinces and Redundant Connection.

## Next
Greedy algorithms make a locally optimal decision and require a proof that it is globally safe.