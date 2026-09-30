# 18 — Backtracking

## Mental model
Choose → explore → undo.

~~~js
function backtrack(path, choices) {
  if (isComplete(path)) {
    result.push([...path]);
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice, path)) continue;

    path.push(choice);
    backtrack(path, nextChoices(choice, choices));
    path.pop();
  }
}
~~~

The copy in result is necessary because path is mutated later. pop restores the exact state before the branch.

## Complexity
Often exponential because the algorithm explores a decision tree. Pruning removes branches that cannot produce valid answers.

## Problems
Subsets, permutations, combinations, combination sum, N-Queens, Word Search.

## Pitfalls
Forgetting undo, mutating saved results, duplicate combinations, incorrect pruning.

## Challenges
Draw the recursion tree for a small input before coding. Then solve Subsets, Permutations, Combination Sum, and Word Search.

## Next
Trees are recursively defined structures, so recursion becomes a primary traversal tool.