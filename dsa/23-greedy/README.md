# 23 — Greedy Algorithms

## Core warning
A locally best choice is not automatically globally optimal.

## Greedy checklist
1. Identify the local choice.
2. Explain why it preserves feasibility.
3. Prove that an optimal solution can be transformed to contain that choice, often using an exchange argument.
4. State the invariant.

## Example
Interval scheduling is solved by choosing the interval with earliest finishing time because it leaves the largest remaining opportunity for future intervals.

## Counterexample mindset
0/1 Knapsack shows why intuitive greedy choices can fail. If a proof is missing, consider DP.

## Challenges
Jump Game, Gas Station, Non-overlapping Intervals, Partition Labels.

## Interview expectation
Do not say "greedy because it seems optimal." Explain the proof or exchange argument.

## Next
When decisions depend on overlapping subproblems, dynamic programming models the required state.