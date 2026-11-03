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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]])); // → [[1,6],[8,10],[15,18]]
console.log(merge([[1, 4], [4, 5]])); // → [[1,5]]
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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(insert([[1, 3], [6, 9]], [2, 5])); // → [[1,5],[6,9]]
console.log(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])); // → [[1,2],[3,10],[12,16]]
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

---

## Full solutions — code, complexity, LeetCode

Almost every interval problem starts with **sorting by start (or by end for greedy selection)**, then one linear scan.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Meeting Rooms II (minimum rooms) — [LeetCode 253](https://leetcode.com/problems/meeting-rooms-ii/)

**Idea:** Sort starts and ends separately. Sweep through starts: if the earliest ending meeting has finished, reuse its room; otherwise open a new room. (LeetCode Premium — free version: LintCode 919.)

```js
function minMeetingRooms(intervals) {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
  let rooms = 0, endPtr = 0;
  for (const start of starts) {
    if (start >= ends[endPtr]) endPtr++;   // a meeting ended → reuse its room
    else rooms++;                           // all rooms busy → new room
  }
  return rooms;
}
```

**Try it:**

```js
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // → 2
console.log(minMeetingRooms([[7,10],[2,4]])); // → 1
console.log(minMeetingRooms([[1,5],[5,8]])); // → 1
```

**Complexity:** Time O(n log n) · Space O(n).  
**Edge cases:** Back-to-back meetings [1,5],[5,8] share a room (start ≥ end).

### Meeting Rooms (can attend all?) — [LeetCode 252](https://leetcode.com/problems/meeting-rooms/)

**Idea:** Sort by start; if any meeting starts before the previous one ends, there's a conflict. (Premium — LintCode 920.)

```js
function canAttendMeetings(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < sorted[i - 1][1]) return false;
  }
  return true;
}
```

**Try it:**

```js
console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // → false
console.log(canAttendMeetings([[7,10],[2,4]])); // → true
```

**Complexity:** Time O(n log n) · Space O(n) for the copy.  
**Edge cases:** Empty list → true.

### Non-overlapping Intervals — [LeetCode 435](https://leetcode.com/problems/non-overlapping-intervals/)

**Idea:** Greedy: **sort by end** and keep the interval that ends first — it leaves the most room for the rest. Count the ones you must remove.

```js
function eraseOverlapIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let removed = 0, prevEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= prevEnd) prevEnd = end;   // keep it
    else removed++;                         // overlaps → remove this one (it ends later)
  }
  return removed;
}
```

**Try it:**

```js
console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // → 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // → 2
console.log(eraseOverlapIntervals([[1,2],[2,3]])); // → 0
```

**Complexity:** Time O(n log n) · Space O(n).  
**Edge cases:** Touching intervals [1,2],[2,3] don't overlap.

### Minimum Number of Arrows to Burst Balloons — [LeetCode 452](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)

**Idea:** Same greedy as above: sort by end, shoot an arrow at the first end; every balloon starting at or before that point is burst.

```js
function findMinArrowShots(points) {
  const sorted = [...points].sort((a, b) => a[1] - b[1]);
  let arrows = 0, arrowAt = -Infinity;
  for (const [start, end] of sorted) {
    if (start > arrowAt) { arrows++; arrowAt = end; }   // touching counts as burst, so strict >
  }
  return arrows;
}
```

**Try it:**

```js
console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // → 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])); // → 4
console.log(findMinArrowShots([[1,2],[2,3],[3,4],[4,5]])); // → 2
```

**Complexity:** Time O(n log n) · Space O(n).  
**Edge cases:** Values can be large negatives — don't use 0 as the initial position.
