# 17 — Recursion

## Three requirements
1. Base case.
2. Recursive case.
3. Progress toward the base case.

~~~js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
~~~

For n=4, calls stack as 4→3→2→1, then return values unwind as 1→2→6→24.

Each call has its own local variables and occupies call-stack space.

## Complexity
Derive a recurrence rather than guessing. T(n)=T(n-1)+O(1) gives O(n).

## Recursion vs iteration
Recursion is natural for trees and divide-and-conquer. Iteration can avoid call-stack limits.

## Common bugs
Missing base case, no progress, returning the wrong recursive value, and accidentally duplicating exponential work.

## Challenges
Factorial, recursive binary search, tree traversal, Fibonacci with memoization.

## Next
Backtracking adds choice, exploration, and undoing state.