# 14 — Heap / Priority Queue

A heap gives efficient access to the minimum or maximum element without fully sorting all elements.

For a zero-indexed binary heap:

- parent = Math.floor((i - 1) / 2)
- left = 2i + 1
- right = 2i + 2

## Min-heap implementation

```js
class MinHeap {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
    this.#up(this.data.length - 1);
  }

  #up(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  pop() {
    if (!this.data.length) return undefined;
    const root = this.data[0];
    const last = this.data.pop();

    if (this.data.length) {
      this.data[0] = last;
      this.#down(0);
    }

    return root;
  }

  #down(i) {
    while (true) {
      let smallest = i;
      const left = i * 2 + 1;
      const right = left + 1;

      if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
      if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
      if (smallest === i) break;

      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const h = new MinHeap();
[5, 3, 8, 1].forEach((x) => h.push(x));
console.log(h.pop()); // → 1
console.log(h.pop()); // → 3
```

Push/pop are O(log n), peek is O(1).

## Problem 1 — Kth Largest

Maintain a min-heap of size k. When it grows beyond k, remove the smallest. The root is then the kth largest.

## Problem 2 — Top K Frequent

Count frequencies with Map, then keep the k highest-frequency values in a heap. This combines hashing + heap.

## Problem 3 — Merge K Sorted Lists

Put the first node from each list into a min-heap. Repeatedly extract the smallest node and add its next node.

Complexity: O(N log k), where N is total nodes and k is number of lists.

## Problem 4 — K Closest Points

Maintain a heap ordered by distance. Decide whether to keep all k smallest distances or maintain a bounded max-heap of size k.

## Problem 5 — Median from Data Stream

Use two heaps:
- max-heap for lower half
- min-heap for upper half

Maintain their sizes within one element and keep every lower-half value <= every upper-half value.

## Recognition
Think heap when the problem says:
- repeatedly get smallest/largest
- top K
- priority
- scheduling
- streaming median
- merge many sorted sequences

## Pitfalls
A heap is not fully sorted. Only the root has the strongest priority. Do not claim arbitrary lookup is O(log n).

## Interview drill
Explain why maintaining only k elements can reduce O(n log n) sorting work to O(n log k).

## Connection
Heaps provide priority ordering. **Intervals** use explicit chronological ordering and overlap invariants.

---

## Full solutions — code, complexity, LeetCode

JavaScript has no built-in priority queue, so every heap solution below uses this small reusable class. In an interview, write it once at the top, or say "I'll assume a PriorityQueue class" if the interviewer allows it.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Helper used below

```js
class Heap {
  // compare(a, b) < 0 means a has higher priority (min-heap: (a, b) => a - b)
  constructor(compare = (a, b) => a - b) { this.data = []; this.compare = compare; }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(value) {
    const a = this.data; a.push(value);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.compare(a[i], a[p]) >= 0) break;
      [a[i], a[p]] = [a[p], a[i]]; i = p;
    }
  }
  pop() {
    const a = this.data; const top = a[0]; const last = a.pop();
    if (a.length) {
      a[0] = last; let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1; let best = i;
        if (l < a.length && this.compare(a[l], a[best]) < 0) best = l;
        if (r < a.length && this.compare(a[r], a[best]) < 0) best = r;
        if (best === i) break;
        [a[i], a[best]] = [a[best], a[i]]; i = best;
      }
    }
    return top;
  }
}
```

### Kth Largest Element in an Array — [LeetCode 215](https://leetcode.com/problems/kth-largest-element-in-an-array/)

**Idea:** Keep a **min-heap of size k**. The smallest of the k largest values sits on top, so after scanning everything the top is the kth largest.

```js
function findKthLargest(nums, k) {
  const heap = new Heap((a, b) => a - b);      // min-heap
  for (const n of nums) {
    heap.push(n);
    if (heap.size > k) heap.pop();             // drop the smallest → keep k largest
  }
  return heap.peek();
}
```

**Try it:**

```js
console.log(findKthLargest([3,2,1,5,6,4],2)); // → 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6],4)); // → 4
```

**Complexity:** Time O(n log k) · Space O(k). (Quickselect averages O(n) but is O(n²) worst case; sorting is O(n log n).)  
**Edge cases:** k = 1 (maximum), k = n (minimum), duplicates count separately.

### Top K Frequent Elements — [LeetCode 347](https://leetcode.com/problems/top-k-frequent-elements/)

**Idea:** Count frequencies with a Map, then **bucket sort by frequency** (index = count). Walk buckets from high to low until you have k numbers — no heap needed.

```js
function topKFrequent(nums, k) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, c] of count) buckets[c].push(n);

  const result = [];
  for (let c = buckets.length - 1; c > 0 && result.length < k; c--) {
    result.push(...buckets[c]);
  }
  return result.slice(0, k);
}
```

**Try it:**

```js
console.log(JSON.stringify(topKFrequent([1,1,1,2,2,3],2).sort((a,b)=>a-b))); // → [1,2]
console.log(JSON.stringify(topKFrequent([1],1))); // → [1]
```

**Complexity:** Time O(n) · Space O(n). Heap alternative: min-heap of size k by frequency → O(n log k).  
**Edge cases:** All elements equal; k equals number of distinct values.

### Merge k Sorted Lists — [LeetCode 23](https://leetcode.com/problems/merge-k-sorted-lists/)

**Idea:** Put the head of every list in a min-heap keyed by value. Pop the smallest, append it, push its `next`.

```js
function mergeKLists(lists) {
  const heap = new Heap((a, b) => a.val - b.val);
  for (const node of lists) if (node) heap.push(node);

  const dummy = { val: 0, next: null };
  let tail = dummy;
  while (heap.size) {
    const node = heap.pop();
    tail.next = node; tail = node;
    if (node.next) heap.push(node.next);
  }
  return dummy.next;
}
```

**Try it:**

```js
const L=(a)=>{let d={next:null},t=d;for(const v of a){t.next={val:v,next:null};t=t.next;}return d.next;};
const A=(n)=>{const r=[];while(n){r.push(n.val);n=n.next;}return r;};
console.log(JSON.stringify(A(mergeKLists([L([1,4,5]),L([1,3,4]),L([2,6])])))); // → [1,1,2,3,4,4,5,6]
console.log(JSON.stringify(A(mergeKLists([])))); // → []
console.log(JSON.stringify(A(mergeKLists([null])))); // → []
```

**Complexity:** Time O(N log k) where N = total nodes, k = lists · Space O(k).  
**Edge cases:** Empty array, lists containing null, one list.

### K Closest Points to Origin — [LeetCode 973](https://leetcode.com/problems/k-closest-points-to-origin/)

**Idea:** Keep a **max-heap of size k** by squared distance (no `Math.sqrt` needed). When it grows past k, remove the farthest.

```js
function kClosest(points, k) {
  const dist = ([x, y]) => x * x + y * y;
  const heap = new Heap((a, b) => dist(b) - dist(a));   // max-heap by distance
  for (const p of points) {
    heap.push(p);
    if (heap.size > k) heap.pop();
  }
  return heap.data;
}
```

**Try it:**

```js
console.log(JSON.stringify(kClosest([[1,3],[-2,2]],1))); // → [[-2,2]]
console.log(JSON.stringify(kClosest([[3,3],[5,-1],[-2,4]],2).map(p=>p.join()).sort())); // → ["-2,4","3,3"]
```

**Complexity:** Time O(n log k) · Space O(k).  
**Edge cases:** Ties in distance (any order accepted), k = n.

### Find Median from Data Stream — [LeetCode 295](https://leetcode.com/problems/find-median-from-data-stream/)

**Idea:** Two heaps: a **max-heap for the lower half** and a **min-heap for the upper half**. Keep sizes equal or lower bigger by one. Median = top of lower, or average of both tops.

```js
class MedianFinder {
  constructor() {
    this.low = new Heap((a, b) => b - a);    // max-heap
    this.high = new Heap((a, b) => a - b);   // min-heap
  }
  addNum(num) {
    this.low.push(num);
    this.high.push(this.low.pop());          // keep every low ≤ every high
    if (this.high.size > this.low.size) this.low.push(this.high.pop());
  }
  findMedian() {
    return this.low.size > this.high.size ? this.low.peek() : (this.low.peek() + this.high.peek()) / 2;
  }
}
```

**Try it:**

```js
const m=new MedianFinder();
m.addNum(1);
m.addNum(2);
console.log(m.findMedian()); // → 1.5
m.addNum(3);
console.log(m.findMedian()); // → 2
```

**Complexity:** addNum O(log n) · findMedian O(1) · Space O(n).  
**Edge cases:** Single number, negative numbers, duplicates.

### Kth Largest Element in a Stream — [LeetCode 703](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

**Idea:** Keep a **min-heap of size k** as numbers arrive; its top is always the kth largest.

```js
class KthLargest {
  constructor(k, nums) {
    this.k = k; this.heap = new Heap((a, b) => a - b);
    for (const n of nums) this.add(n);
  }
  add(val) {
    this.heap.push(val);
    if (this.heap.size > this.k) this.heap.pop();
    return this.heap.peek();
  }
}
```

**Try it:**

```js
const kl=new KthLargest(3,[4,5,8,2]);
console.log(JSON.stringify([3,5,10,9,4].map(v=>kl.add(v)))); // → [4,5,5,8,8]
```

**Complexity:** add O(log k) · Space O(k).  
**Edge cases:** Starts with fewer than k numbers.

### Last Stone Weight — [LeetCode 1046](https://leetcode.com/problems/last-stone-weight/)

**Idea:** Max-heap: repeatedly take the two heaviest stones, push back their difference if it isn't zero.

```js
function lastStoneWeight(stones) {
  const heap = new Heap((a, b) => b - a);    // max-heap
  for (const s of stones) heap.push(s);
  while (heap.size > 1) {
    const y = heap.pop(), x = heap.pop();
    if (y !== x) heap.push(y - x);
  }
  return heap.size ? heap.peek() : 0;
}
```

**Try it:**

```js
console.log(lastStoneWeight([2,7,4,1,8,1])); // → 1
console.log(lastStoneWeight([1])); // → 1
console.log(lastStoneWeight([2,2])); // → 0
```

**Complexity:** Time O(n log n) · Space O(n).  
**Edge cases:** All stones destroyed → 0.
