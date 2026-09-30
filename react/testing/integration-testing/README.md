# Integration Testing

## Connection
This topic connects React's rendering model to scalable state ownership or reliable verification.

## What it is
Integration tests exercise several components or boundaries together to validate realistic user workflows.

## Why it exists
State libraries should solve a real sharing problem, while tests should verify behavior that matters to users and system boundaries.

## How it works
Classify the state or test boundary first, then choose the smallest mechanism. For tests, prefer user inputs and observable outputs over implementation details.

## Example
```tsx
render(<Checkout />);
await user.click(screen.getByRole('button', { name: /pay/i }));
```

## Real frontend use
Apply this to shared filters, shopping carts, editors, critical workflows, and regression-prone components.

## Pitfalls
- Putting every value into global state.
- Mixing server cache with client state.
- Testing implementation details.
- Mocking so much that the test no longer resembles the workflow.
- Choosing a library before identifying the ownership problem.

## Interview reasoning
Explain why the state/test belongs in this boundary, how updates propagate, what causes consumers to render, and what the test proves.

## Practical challenge
Build a small feature, test its critical user flow, then change an internal implementation and verify that the behavior test still passes.

## Connection to next topic
Continue toward **Accessibility → Modern React → Advanced React → Architecture → Interview Questions**.

## Official reference
https://react.dev/
