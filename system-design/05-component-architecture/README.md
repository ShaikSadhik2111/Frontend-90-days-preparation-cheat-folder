# Component Architecture

## Why this matters
Connect system boundaries to component boundaries.

## Core mental model
Separate primitives, composites, feature components and page/application composition. Define inputs, outputs, ownership and side effects. Prefer composition over prop explosions.

## Production reasoning
Reason about controlled vs uncontrolled APIs, compound components, render props/custom hooks and design-system contracts. Component boundaries should follow responsibility and change frequency.

## Example / implementation focus
Example: DataGrid owns table interaction mechanics; the page owns query/filter business state.

## Interview drill
Interview drill: redesign a 1,000-line component without blindly splitting every function.

## Practical challenge
Production challenge: produce a component tree plus ownership table.

## Completion contract
You are not finished when you can repeat the definition. You are finished when you can **explain the decision, implement the core behavior, identify failure modes, debug a broken version, discuss accessibility/security/performance implications, and handle a changed constraint**.

## Connection to next stage
Use what you learned here as an input to the next numbered stage rather than treating this chapter as an isolated topic.
