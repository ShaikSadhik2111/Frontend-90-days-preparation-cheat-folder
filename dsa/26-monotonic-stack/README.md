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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(dailyTemperatures([30, 40, 50, 60])); // → [1,1,1,0]
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // → [1,1,4,2,1,1,0,0]
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

---

## Full solutions — code, complexity, LeetCode

Store **indices** in the stack (you can always read the value). Each index is pushed and popped once → O(n).

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Next Greater Element I — [LeetCode 496](https://leetcode.com/problems/next-greater-element-i/)

**Idea:** Run a decreasing stack over `nums2` and record each number's next greater value in a Map; then answer for `nums1`.

```js
function nextGreaterElement(nums1, nums2) {
  const next = new Map(), stack = [];
  for (const x of nums2) {
    while (stack.length && stack[stack.length - 1] < x) next.set(stack.pop(), x);
    stack.push(x);
  }
  return nums1.map((x) => next.get(x) ?? -1);
}
```

**Try it:**

```js
console.log(JSON.stringify(nextGreaterElement([4,1,2],[1,3,4,2]))); // → [-1,3,-1]
console.log(JSON.stringify(nextGreaterElement([2,4],[1,2,3,4]))); // → [3,-1]
```

**Complexity:** Time O(n + m) · Space O(n).  
**Edge cases:** No greater element → -1.

### Next Greater Element II (circular) — [LeetCode 503](https://leetcode.com/problems/next-greater-element-ii/)

**Idea:** Loop twice over the array (`i % n`) so elements near the end can see elements at the start.

```js
function nextGreaterElements(nums) {
  const n = nums.length, result = Array(n).fill(-1), stack = [];
  for (let i = 0; i < 2 * n; i++) {
    const x = nums[i % n];
    while (stack.length && nums[stack[stack.length - 1]] < x) result[stack.pop()] = x;
    if (i < n) stack.push(i);
  }
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(nextGreaterElements([1,2,1]))); // → [2,-1,2]
console.log(JSON.stringify(nextGreaterElements([1,2,3,4,3]))); // → [2,3,4,-1,4]
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** The maximum element always gets -1.

### Online Stock Span — [LeetCode 901](https://leetcode.com/problems/online-stock-span/)

**Idea:** Keep a decreasing stack of `[price, span]`. Pop every price ≤ today's and add their spans.

```js
class StockSpanner {
  constructor() { this.stack = []; }          // [price, span]
  next(price) {
    let span = 1;
    while (this.stack.length && this.stack[this.stack.length - 1][0] <= price) span += this.stack.pop()[1];
    this.stack.push([price, span]);
    return span;
  }
}
```

**Try it:**

```js
const sp=new StockSpanner();
console.log(JSON.stringify([100,80,60,70,60,75,85].map(p=>sp.next(p)))); // → [1,1,1,2,1,4,6]
```

**Complexity:** Amortised O(1) per call · Space O(n).  
**Edge cases:** Equal prices are included in the span (≤).

### Largest Rectangle in Histogram — [LeetCode 84](https://leetcode.com/problems/largest-rectangle-in-histogram/)

**Idea:** Increasing stack of indices. When a shorter bar arrives, pop: the popped bar's rectangle extends from the new stack top + 1 to i − 1. A sentinel height 0 at the end flushes the stack.

```js
function largestRectangleArea(heights) {
  const stack = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];      // sentinel
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] + 1 : 0;
      best = Math.max(best, height * (i - left));
    }
    stack.push(i);
  }
  return best;
}
```

**Try it:**

```js
console.log(largestRectangleArea([2,1,5,6,2,3])); // → 10
console.log(largestRectangleArea([2,4])); // → 4
console.log(largestRectangleArea([3,3,3])); // → 9
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** All bars equal; strictly increasing bars.

### Trapping Rain Water — [LeetCode 42](https://leetcode.com/problems/trapping-rain-water/)

**Idea:** Two pointers (simplest): the side with the **lower max** decides the water level. Move that pointer inward, adding `max − height`. (Stack version: pop a valley when a taller bar arrives.)

```js
function trap(height) {
  let left = 0, right = height.length - 1, leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
```

**Try it:**

```js
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // → 6
console.log(trap([4,2,0,3,2,5])); // → 9
console.log(trap([1])); // → 0
```

**Complexity:** Time O(n) · Space O(1).  
**Edge cases:** Fewer than 3 bars → 0.

### Sum of Subarray Minimums — [LeetCode 907](https://leetcode.com/problems/sum-of-subarray-minimums/)

**Idea:** For each element, count subarrays where it is the minimum: `left[i]` × `right[i]` (distance to previous smaller and next smaller-or-equal). Use strict on one side and non-strict on the other to avoid double counting duplicates.

```js
function sumSubarrayMins(arr) {
  const MOD = 1_000_000_007, n = arr.length;
  const left = Array(n), right = Array(n);
  let stack = [];
  for (let i = 0; i < n; i++) {                       // previous strictly smaller
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) stack.pop();
    left[i] = stack.length ? i - stack[stack.length - 1] : i + 1;
    stack.push(i);
  }
  stack = [];
  for (let i = n - 1; i >= 0; i--) {                  // next smaller or equal
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) stack.pop();
    right[i] = stack.length ? stack[stack.length - 1] - i : n - i;
    stack.push(i);
  }
  let total = 0;
  for (let i = 0; i < n; i++) total = (total + arr[i] * left[i] * right[i]) % MOD;
  return total;
}
```

**Try it:**

```js
console.log(sumSubarrayMins([3,1,2,4])); // → 17
console.log(sumSubarrayMins([11,81,94,43,3])); // → 444
console.log(sumSubarrayMins([2,2])); // → 6
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** Duplicates — mix of `>` and `>=` prevents double counting. (For very large inputs use BigInt or split the multiplication to stay below 2⁵³.)
