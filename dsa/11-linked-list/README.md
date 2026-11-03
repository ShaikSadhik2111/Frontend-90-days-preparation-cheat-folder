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

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
console.log(toArray(reverseList(toList([1, 2, 3, 4, 5])))); // → [5,4,3,2,1]
console.log(toArray(reverseList(null))); // → []
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

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
console.log(middleNode(toList([1, 2, 3, 4, 5])).val); // → 3
console.log(middleNode(toList([1, 2, 3, 4, 5, 6])).val); // → 4
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

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
const cyclic = toList([3, 2, 0, -4]); cyclic.next.next.next.next = cyclic.next; // tail points back to node 2
console.log(hasCycle(cyclic)); // → true
console.log(hasCycle(toList([1]))); // → false
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

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
console.log(toArray(removeNthFromEnd(toList([1, 2, 3, 4, 5]), 2))); // → [1,2,3,5]
console.log(toArray(removeNthFromEnd(toList([1]), 1))); // → []
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

**Try it** (run with `node file.js` or in the browser console):

```js
const toList = (arr) => arr.reduceRight((next, val) => ({ val, next }), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };
console.log(toArray(mergeTwoLists(toList([1, 2, 4]), toList([1, 3, 4])))); // → [1,1,2,3,4,4]
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

---

## More solutions — code, complexity, LeetCode

> **How to run:** copy a function and its **Try it** lines into `practice.js` and run `node practice.js` (or paste into the browser console). The expected output is after `// →`.

### Palindrome Linked List — [LeetCode 234](https://leetcode.com/problems/palindrome-linked-list/)

**Idea:** Find the middle (slow/fast), **reverse the second half**, compare both halves node by node. O(1) extra space.

```js
function isPalindromeList(head) {
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }
  let prev = null;                                   // reverse second half
  while (slow) { const next = slow.next; slow.next = prev; prev = slow; slow = next; }
  let a = head, b = prev;
  while (b) {
    if (a.val !== b.val) return false;
    a = a.next; b = b.next;
  }
  return true;
}
```

**Try it:**

```js
const toList=(arr)=>arr.reduceRight((next,val)=>({val,next}),null);
console.log(isPalindromeList(toList([1,2,2,1]))); // → true
console.log(isPalindromeList(toList([1,2]))); // → false
console.log(isPalindromeList(toList([1,2,3,2,1]))); // → true
```

**Complexity:** Time O(n) · Space O(1). (Simple alternative: copy values to an array and use two pointers — O(n) space.)  
**Edge cases:** Single node → true; even and odd lengths.

### LRU Cache — [LeetCode 146](https://leetcode.com/problems/lru-cache/)

**Idea:** A JS `Map` remembers insertion order. On `get`, delete and re-insert the key to mark it most recent; on overflow, delete the **first** key (least recently used). Interviewers may ask for the classic version: hash map + doubly linked list.

```js
class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key); this.map.set(key, value);       // move to most recent
    return value;
  }
  put(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) this.map.delete(this.map.keys().next().value);  // evict oldest
  }
}
```

**Try it:**

```js
const c=new LRUCache(2);
c.put(1,1);
c.put(2,2);
console.log(c.get(1)); // → 1
c.put(3,3);
console.log(c.get(2)); // → -1
c.put(4,4);
console.log(c.get(1)); // → -1
console.log(c.get(3)); // → 3
console.log(c.get(4)); // → 4
```

**Complexity:** get/put O(1) · Space O(capacity).  
**Edge cases:** Updating an existing key also makes it most recent.
