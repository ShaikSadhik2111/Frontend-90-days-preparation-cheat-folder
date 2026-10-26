# 01 — Machine coding fundamentals

> A machine-coding round = build a working UI feature in **45–90 minutes** while explaining your decisions. Graded on: **working result, code quality, state design, edge cases, a11y, communication**.

## The 5-step flow (use every time)
| Step | Time | Output |
|---|---|---|
| 1. Clarify | 3–5 min | Requirements list, data shape, what's out of scope, can I use libraries? |
| 2. Plan | 5 min | Component tree, state (what/where/derived), props API, file layout |
| 3. Happy path | 20–25 min | Working core feature, clean names |
| 4. Edge cases | 10 min | Loading/empty/error, races, keyboard, large data, validation |
| 5. Wrap up | 5 min | What you'd add: tests, memo/virtualization, caching, i18n |

## Setup before the interview
- Know your environment: CodeSandbox / StackBlitz / local Vite (`npm create vite@latest app -- --template react-ts`).
- Have a mental template: `App.tsx`, a mock API with latency (`setTimeout` + Promise), basic CSS.
- Practise typing common hooks quickly (`useDebounce`, fetch with AbortController).

## What interviewers watch
Talking while coding · asking before assuming · small commits of progress (get something on screen early) · readable code over clever code · handling errors · not over-engineering · knowing when to say "in production I'd use X".

Practise with the runnable reference app: [code/machine-coding](../../code/machine-coding/README.md).

Next → [02 Component design](../02-component-design/README.md)
