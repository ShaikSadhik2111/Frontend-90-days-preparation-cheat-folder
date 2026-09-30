# 11 — Linked Lists

Linked-list problems test pointer reasoning rather than indexing.

A node stores a value and a reference to another node.

## Traversal

```js
let current = head;
while (current) {
  console.log(current.val);
  current = current.next;
}
```

The key is to understand what each pointer represents before changing any links.

## Problem 1 — Reverse Linked List

```js
function reverseList(head) {
  let previous = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}
```

Invariant: `previous` is the fully reversed prefix; `current` is the first unresolved node. Save `next` before rewiring or the remaining list is lost.

O(n) time, O(1) extra space.

## Problem 2 — Middle of Linked List

Use slow/fast pointers.

```js
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

## Problem 3 — Cycle Detection

```js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
```

## Problem 4 — Remove Nth From End

Use a dummy node and keep a gap of n nodes between two pointers.

```js
function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i++) fast = fast.next;

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}
```

The dummy node removes special handling for deleting the original head.

## Problem 5 — Merge Two Sorted Lists

```js
function mergeTwoLists(a, b) {
  const dummy = { next: null };
  let tail = dummy;

  while (a && b) {
    if (a.val <= b.val) {
      tail.next = a;
      a = a.next;
    } else {
      tail.next = b;
      b = b.next;
    }
    tail = tail.next;
  }

  tail.next = a || b;
  return dummy.next;
}
```

## Additional problems
- Reorder List
- Add Two Numbers
- Intersection of Two Linked Lists
- Copy List with Random Pointer

## Core patterns
Traversal, reversal, dummy node, fast/slow, pointer rewiring, merge.

## Pitfalls
Never overwrite `current.next` before saving the old next pointer. Distinguish node identity from node value.

## Interview drill
For every pointer mutation, state what links exist before and after the assignment.

## Connection
Linked lists lead naturally into **binary search**, where the opposite skill is reasoning about an ordered search space rather than pointer rewiring.
