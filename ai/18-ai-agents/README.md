# 18 — AI Agents

## Connection
An agent combines model-driven planning, tools, state, observations, and iterative decisions.

## Mental model

`goal → plan/decision → action → observation → next decision → termination`

The loop must have explicit boundaries.

## Agent components
A production agent may contain:

- model
- system policy
- state store
- tool registry
- authorization layer
- memory/context strategy
- evaluator
- budget manager
- human approval mechanism
- termination policy

## Reliability
Do not assume an agent will stop because the task is complete. Define deterministic termination conditions.

## Memory
Distinguish short-term run state from durable user/application memory. Store only what is necessary and authorized.

## Human-in-the-loop
For high-impact operations, the agent should propose an action and wait for approval rather than executing autonomously.

## Interview reasoning
**What makes an agent different from a chatbot?** A chatbot primarily generates responses. An agent can select actions, use external tools, observe results, and iterate toward a goal.

## Practical challenge
Build a constrained agent that can search documentation and retrieve order information but cannot mutate data without approval.

## Next
Agents become production systems when their components, boundaries, and data flows are architected explicitly.