# 11 — Linked List

## Node
~~~js
class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
~~~

Each node stores a value and a reference to the next node.

## Reverse
~~~js
function reverse(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}
~~~

Save next before changing current.next or the remaining list becomes unreachable. Then reverse the pointer, advance prev, and advance current.

Invariant: everything before current has already been reversed and is headed by prev.

Time O(n), auxiliary space O(1).

## Patterns
Fast/slow pointers, cycle detection, dummy nodes, merging, reversal, pointer reconnection.

## Challenges
Reverse List, Merge Two Sorted Lists, Linked List Cycle, Remove Nth From End, Reorder List.

## Next
Sorted search spaces allow logarithmic elimination.