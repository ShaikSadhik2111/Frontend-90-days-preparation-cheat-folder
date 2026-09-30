# 15 — Intervals

Interval problems become easier after sorting by start/end.

## Pattern 1 — Merge overlaps

```js
function merge(intervals) {
  intervals.sort((a,b) => a[0] - b[0]);
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
```

Invariant: result contains non-overlapping merged intervals for everything processed.

## Problem 2 — Insert Interval

```js
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i++]);
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  result.push(newInterval);

  while (i < intervals.length) result.push(intervals[i++]);
  return result;
}
```

## Problem 3 — Meeting Rooms II

Sort starts and ends separately. If the next meeting starts before the earliest meeting ends, another room is needed; otherwise release a room.

This is a sweep-line/two-pointer technique.

## Additional
- Non-overlapping Intervals
- Meeting Rooms
- Minimum Arrows to Burst Balloons
- Employee Free Time

## Recognition
Scheduling, overlapping ranges, merge/insert/remove intervals, minimum resources.

## Pitfalls
Clarify whether touching intervals overlap. Check whether intervals are closed [a,b] or use another convention.

## Connection
Intervals depend on sorting and naturally lead to greedy reasoning.
