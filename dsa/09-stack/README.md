# 09 — Stack

## Mental model
LIFO: last in, first out.

Use Array push/pop for an efficient stack.

## Parentheses
~~~js
function isValid(s) {
  const stack = [];
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ]);

  for (const char of s) {
    if (pairs.has(char)) {
      if (stack.pop() !== pairs.get(char)) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
~~~

When a closer appears, pop returns the most recent unmatched opener. The final empty check catches leftover openers.

## Applications
Expression parsing, undo/history, DFS, next greater element, monotonic stack.

## Pitfall
Do not use shift for queue behavior in a performance-sensitive loop; it generally moves remaining elements.

## Challenges
Min Stack, Evaluate Reverse Polish Notation, Daily Temperatures, Next Greater Element.

## Next
FIFO processing is modeled by a queue.