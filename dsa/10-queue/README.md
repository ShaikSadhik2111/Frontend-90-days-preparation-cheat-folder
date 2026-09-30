# 10 — Queue, Deque and BFS

A queue is FIFO. For JavaScript DSA, avoid repeatedly calling `shift()` on large queues because shifting requires moving elements.

## Problem 1 — Efficient queue with head index

```js
class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.head === this.items.length) return undefined;
    return this.items[this.head++];
  }

  size() {
    return this.items.length - this.head;
  }
}
```

The head index advances instead of physically removing the first array element.

## Problem 2 — Number of Recent Calls

A queue naturally removes expired requests from the front.

```js
class RecentCounter {
  constructor() {
    this.queue = [];
    this.head = 0;
  }

  ping(t) {
    this.queue.push(t);

    while (this.queue[this.head] < t - 3000) {
      this.head++;
    }

    return this.queue.length - this.head;
  }
}
```

Invariant: all retained timestamps belong to [t - 3000, t].

## Problem 3 — Binary Tree Level Order Traversal

Queue is the natural data structure for BFS.

```js
function levelOrder(root) {
  if (!root) return [];

  const queue = [root];
  let head = 0;
  const result = [];

  while (head < queue.length) {
    const levelSize = queue.length - head;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

Capture the current queue boundary before processing the level.

## Deque / sliding window bridge

A deque supports removing from both ends. It is useful for:

- Sliding Window Maximum
- BFS variants
- 0-1 BFS

### Sliding Window Maximum

Maintain indices in decreasing value order. The front is always the maximum candidate.

```js
function maxSlidingWindow(nums, k) {
  const deque = [];
  let head = 0;
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (head < deque.length && deque[head] <= i - k) head++;

    while (
      deque.length > head &&
      nums[deque[deque.length - 1]] <= nums[i]
    ) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) result.push(nums[deque[head]]);
  }

  return result;
}
```

Each index enters and leaves the deque at most once: O(n).

## Additional problems
- Design Circular Queue
- Rotting Oranges
- Number of Islands using BFS
- Open the Lock
- 0-1 BFS concept

## Queue recognition
Think queue when processing order is chronological/FIFO, or when BFS explores by distance/levels.

## Pitfalls
Do not use `shift()` in a performance-sensitive queue implementation. For BFS, mark visited at the correct time to avoid duplicate work.

## Connection
**Queue → Linked List**: linked lists provide constant-time pointer rewiring and become a natural structure for implementing queues and pointer-based problems.
