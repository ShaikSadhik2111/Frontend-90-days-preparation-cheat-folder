# 26 — Monotonic Stack

## Mental model
The stack contains unresolved items and maintains increasing or decreasing order.

## Next greater example
~~~js
function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (
      stack.length > 0 &&
      nums[i] > nums[stack[stack.length - 1]]
    ) {
      const index = stack.pop();
      result[index] = nums[i];
    }

    stack.push(i);
  }

  return result;
}
~~~

Store indices because the answer must be written back to the original position. When the current value resolves a previous index, pop it and assign the current value.

Each index is pushed once and popped once: O(n) total stack operations.

## Uses
Next greater/smaller, Daily Temperatures, Stock Span, Histogram, some rain-water problems.

## Pitfalls
Wrong increasing/decreasing invariant, equality mistakes, storing values instead of indices, and misreading nested loops as automatically O(n²).

## Challenge
State the stack invariant before solving Daily Temperatures and Largest Rectangle in Histogram.

## Next
Pattern revision turns all these structures into fast interview recognition.