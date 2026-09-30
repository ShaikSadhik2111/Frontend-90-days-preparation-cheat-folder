# 26 — Monotonic Stack

A monotonic stack maintains elements in increasing or decreasing order so dominated candidates can be removed permanently.

The key proof:

> Once an element is dominated by the current element for the required query, it can never become the answer for a future position.

## Problem 1 — Daily Temperatures

```js
function dailyTemperatures(temperatures) {
  const answer = Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const j = stack.pop();
      answer[j] = i - j;
    }

    stack.push(i);
  }

  return answer;
}
```

Stack contains indices waiting for a warmer temperature.

## Problem 2 — Next Greater Element

Keep unresolved indices/values. When current value exceeds the top, current is the first greater value for that popped element.

## Problem 3 — Stock Span

Maintain a decreasing stack of indices. Pop prices that are less than or equal to today's price; the remaining top determines the previous greater boundary.

## Problem 4 — Largest Rectangle in Histogram

Use an increasing stack. When a lower bar appears, pop bars and compute their maximal width using the new stack top as the previous smaller boundary.

## Problem 5 — Trapping Rain Water

Can be solved with prefix maxima or a two-pointer approach; a monotonic stack provides another derivation based on bounded valleys.

## Problem 6 — Sum of Subarray Minimums

For each element, calculate how many subarrays use it as their minimum by finding previous/next smaller boundaries.

## Complexity
Although loops contain nested while statements, each index is pushed and popped at most once, producing O(n) total stack operations.

## Pitfalls
Tie handling (< vs <=) changes duplicate-boundary behavior. Define whether equal values should remain or be popped.

## Recognition
Next greater/smaller, previous greater/smaller, nearest boundary, histogram, contribution of each element as min/max.

## Connection
This is a specialized evolution of the ordinary stack and often replaces repeated left/right scanning.
