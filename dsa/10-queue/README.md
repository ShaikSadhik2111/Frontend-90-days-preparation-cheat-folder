# 10 — Queue

## Mental model
FIFO: first in, first out.

Avoid repeated Array.shift on large queues.

## Efficient index-based queue
~~~js
const queue = [];
let head = 0;

queue.push("A");
queue.push("B");

const first = queue[head++];
~~~

head identifies the next unread item. Incrementing it avoids physically moving every remaining item.

## BFS
Start with a node, dequeue the oldest item, inspect it, and enqueue unvisited neighbors.

## Common bugs
No visited tracking, accidentally using stack order, mixing queue state with visited state, and shift-based O(n) dequeue in a large traversal.

## Challenges
Implement a queue, Binary Tree Level Order Traversal, BFS Number of Islands, and shortest path in an unweighted graph.

## Next
Linked lists teach direct pointer/reference manipulation.