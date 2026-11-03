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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(isValid("()[]{}")); // → true
console.log(isValid("(]")); // → false
console.log(isValid("([)]")); // → false
console.log(isValid("{[]}")); // → true
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

**Try it** (run with `node file.js` or in the browser console):

```js
const s = new MinStack();
s.push(-2); s.push(0); s.push(-3);
console.log(s.getMin()); // → -3
console.log((s.pop(), s.getMin())); // → -2
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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(evalRPN(["2", "1", "+", "3", "*"])); // → 9
console.log(evalRPN(["4", "13", "5", "/", "+"])); // → 6
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

**Try it** (run with `node file.js` or in the browser console):

```js
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // → [1,1,4,2,1,1,0,0]
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

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### Implement Queue using Stacks — [LeetCode 232](https://leetcode.com/problems/implement-queue-using-stacks/)

**Idea:** Push into an `in` stack. To pop/peek, move everything to an `out` stack **only when `out` is empty** — that reverses the order once.

```js
class MyQueue {
  constructor() { this.in = []; this.out = []; }
  push(x) { this.in.push(x); }
  #move() { if (!this.out.length) while (this.in.length) this.out.push(this.in.pop()); }
  pop() { this.#move(); return this.out.pop(); }
  peek() { this.#move(); return this.out[this.out.length - 1]; }
  empty() { return !this.in.length && !this.out.length; }
}
```

**Try it:**

```js
const q=new MyQueue();
q.push(1);
q.push(2);
console.log(q.peek()); // → 1
console.log(q.pop()); // → 1
q.push(3);
console.log(q.pop()); // → 2
console.log(q.pop()); // → 3
console.log(q.empty()); // → true
```

**Complexity:** Amortised O(1) per operation (each item moves once) · Space O(n).  
**Edge cases:** Pop after mixed pushes keeps FIFO order.

### Implement Stack using Queues — [LeetCode 225](https://leetcode.com/problems/implement-stack-using-queues/)

**Idea:** With one queue: after pushing x, **rotate** the older items behind it so x is at the front. Only queue operations (push to back, take from front) are used.

```js
class MyStack {
  constructor() { this.q = []; }
  push(x) {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) this.q.push(this.q.shift());   // rotate
  }
  pop() { return this.q.shift(); }
  top() { return this.q[0]; }
  empty() { return this.q.length === 0; }
}
```

**Try it:**

```js
const st=new MyStack();
st.push(1);
st.push(2);
console.log(st.top()); // → 2
console.log(st.pop()); // → 2
console.log(st.empty()); // → false
console.log(st.pop()); // → 1
console.log(st.empty()); // → true
```

**Complexity:** push O(n) · pop/top O(1) · Space O(n). (JS `shift` is O(n) itself — fine to mention; the interview point is the rotation idea.)  
**Edge cases:** Single element.

### Asteroid Collision — [LeetCode 735](https://leetcode.com/problems/asteroid-collision/)

**Idea:** Stack of surviving asteroids. A collision only happens when the top moves right (positive) and the new one moves left (negative). Compare sizes until one side wins.

```js
function asteroidCollision(asteroids) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -a) stack.pop();                 // top explodes, keep checking
      else if (top === -a) { stack.pop(); alive = false; }   // both explode
      else alive = false;                         // new one explodes
    }
    if (alive) stack.push(a);
  }
  return stack;
}
```

**Try it:**

```js
console.log(JSON.stringify(asteroidCollision([5,10,-5]))); // → [5,10]
console.log(JSON.stringify(asteroidCollision([8,-8]))); // → []
console.log(JSON.stringify(asteroidCollision([10,2,-5]))); // → [10]
console.log(JSON.stringify(asteroidCollision([-2,-1,1,2]))); // → [-2,-1,1,2]
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** Left-moving first and right-moving later never meet ([-2, 1] stays).
