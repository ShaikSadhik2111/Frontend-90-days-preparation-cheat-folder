# 09 — Stack

A stack is LIFO: the most recently added item is processed first.

JavaScript arrays are normally sufficient:

```js
const stack = [];
stack.push(value);
const top = stack.pop();
```

Avoid `shift()` for stack behavior; it is unnecessary work.

## Problem 1 — Valid Parentheses

```js
function isValid(s) {
  const stack = [];
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (const char of s) {
    if (!pairs.has(char)) {
      stack.push(char);
      continue;
    }

    if (stack.pop() !== pairs.get(char)) return false;
  }

  return stack.length === 0;
}
```

Invariant: stack contains unmatched opening brackets in nesting order.

## Problem 2 — Min Stack

Store the minimum associated with each stack state.

```js
class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }

  push(value) {
    this.stack.push(value);
    const currentMin = this.mins.length === 0
      ? value
      : Math.min(value, this.mins[this.mins.length - 1]);
    this.mins.push(currentMin);
  }

  pop() {
    this.mins.pop();
    return this.stack.pop();
  }

  getMin() {
    return this.mins[this.mins.length - 1];
  }
}
```

All main operations are O(1).

## Problem 3 — Evaluate Reverse Polish Notation

```js
function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (!["+", "-", "*", "/"].includes(token)) {
      stack.push(Number(token));
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();

    if (token === "+") stack.push(a + b);
    if (token === "-") stack.push(a - b);
    if (token === "*") stack.push(a * b);
    if (token === "/") stack.push(Math.trunc(a / b));
  }

  return stack.pop();
}
```

Order matters for subtraction and division.

## Monotonic-stack bridge
A stack can maintain increasing/decreasing order instead of only LIFO order.

Problems:
- Daily Temperatures
- Next Greater Element
- Stock Span
- Largest Rectangle in Histogram

### Daily Temperatures

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

The stack stores unresolved indices whose next warmer day has not been found.

## Additional problems
- Backspace String Compare
- Simplify Path
- Decode String
- Largest Rectangle in Histogram

## Recognition
Look for nested structure, matching pairs, undo behavior, previous unresolved item, next greater/smaller, or expression evaluation.

## Pitfalls
Know whether the stack stores values or indices. For monotonic stacks, define exactly what remains unresolved.

## Connection
**Stack → Queue**: stack processes the newest unresolved item first; queues process the oldest first, which naturally supports BFS.
