# 17 — Agent Orchestration

## Connection
Multiple tool calls create a workflow. Orchestration controls the state, transitions, retries, branching, and termination of that workflow.

## Workflow vs agent
Use a deterministic workflow when the steps are known:

`validate → retrieve → call service → transform → respond`

Use agentic orchestration when the system genuinely needs dynamic planning or tool selection.

## State
Persist enough state to resume or inspect a run:

- goal
- messages/context
- tool calls
- tool results
- current step
- errors
- budget
- approval status

## Reliability controls
Bound:

- maximum steps
- execution time
- token budget
- tool permissions
- retries
- recursion/loop depth

## Failure handling
A failed tool should produce a typed result. Decide whether the workflow retries, chooses an alternative tool, asks the user, or stops.

## Interview reasoning
**Why not make everything an agent?** Dynamic autonomy adds nondeterminism, cost, latency, security risk, and testing difficulty. Use autonomy where it provides measurable value.

## Practical challenge
Design a repair-support workflow that searches documentation, checks an order, and requires user approval before any consequential action.