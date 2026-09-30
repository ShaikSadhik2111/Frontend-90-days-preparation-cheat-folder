# 02 — Complexity Analysis

## Why it matters
The same correct answer can be unusable at scale. Complexity measures how runtime and memory grow with input size.

## Core classes
O(1), O(log n), O(n), O(n log n), O(n²), O(2^n), O(n!).

## Read code mechanically
Ask how many times each loop can execute and what each operation inside costs.

Two sequential O(n) loops are O(n). A nested loop is not automatically O(n²); if two pointers each move only forward, total movement can still be O(n).

## JavaScript costs
- Array index: O(1)
- push/pop: amortized O(1)
- shift/unshift: typically O(n)
- Array includes/indexOf: O(n)
- Map/Set lookup: expected O(1)
- sorting: O(n log n) is a common bound, but do not rely on undocumented implementation details
- recursion: add call-stack space

## Example
~~~js
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {}
}
~~~
The inner loop runs n times for each of n outer iterations: O(n²).

## Space
Separate output space from auxiliary space. If an algorithm creates a Map containing n entries, that is O(n) auxiliary memory.

## Amortized analysis
An occasional expensive dynamic-array resize does not make every append O(n); append is commonly O(1) amortized.

## Interview habit
Always state worst-case complexity unless the problem asks otherwise, then mention average/amortized behavior when relevant.

## Next
Arrays are the basic sequence structure from which many patterns are derived.