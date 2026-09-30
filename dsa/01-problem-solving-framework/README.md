# 01 — Problem Solving Framework

## Goal
DSA interviews test whether you can derive an algorithm, not whether you remember a solution.

## Interview loop
1. Clarify input, output, constraints, duplicates, ordering, and edge cases.
2. Build the simplest correct brute-force solution.
3. Identify repeated work.
4. Look for structure: sortedness, frequency, contiguity, monotonicity, graph connectivity, overlapping subproblems.
5. Choose a data structure/pattern.
6. State the invariant.
7. Implement.
8. Dry-run normal and edge cases.
9. Give time/space complexity.
10. Explain trade-offs.

## Example — Two Sum
~~~js
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}
~~~

### Line-by-line
- Map stores previously processed values and their indices.
- The loop visits each element once.
- needed is the only value that can complete the current number.
- has checks only earlier elements.
- get returns the earlier index.
- set happens after the check, preventing an element from matching itself.
- return [] represents no pair.

### Invariant
Before index i is processed, seen contains exactly indices 0 through i-1.

### Complexity
Expected O(n) time and O(n) auxiliary space.

## Debugging method
When code fails, inspect input, initial state, each mutation, loop condition, invariant, and return condition. Do not immediately rewrite the algorithm.

## Practical rule
For every problem write: brute force → bottleneck → observation → pattern → invariant → complexity.

## Next
Complexity analysis tells you whether the solution can survive the input constraints.