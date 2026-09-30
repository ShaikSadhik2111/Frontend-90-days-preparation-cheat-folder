# 15 — Intervals

## Core pattern
Sort by start time, then maintain the merged range.

~~~js
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];

  for (const [start, end] of intervals) {
    const last = result[result.length - 1];

    if (!last || start > last[1]) {
      result.push([start, end]);
    } else {
      last[1] = Math.max(last[1], end);
    }
  }

  return result;
}
~~~

Invariant: result contains merged non-overlapping intervals for everything processed so far.

Time O(n log n) from sorting.

## Watch
Endpoint semantics matter. Is [1,2] overlapping [2,3]? Usually yes for closed intervals, but always follow the problem's definition.

## Challenges
Merge Intervals, Insert Interval, Meeting Rooms II, Non-overlapping Intervals.

## Next
Matrices add coordinates and often turn into graph traversal.