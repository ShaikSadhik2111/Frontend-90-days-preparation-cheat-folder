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
