# Unit testing (Jest / Vitest)

> Unit tests check **small pieces of logic in isolation**: pure functions, reducers, selectors, custom hooks, utilities. Fast and precise.

```ts
// todoReducer.test.ts
import { todoReducer } from "./todoReducer";

describe("todoReducer", () => {
  it("adds a trimmed todo and ignores empty text", () => {
    const s = todoReducer([], { type: "add", text: "  buy milk ", id: "1" });
    expect(s).toEqual([{ id: "1", text: "buy milk", done: false }]);
    expect(todoReducer(s, { type: "add", text: "  " })).toBe(s);
  });
  it("does not mutate the previous state", () => {
    const prev = [{ id: "1", text: "a", done: false }];
    const next = todoReducer(prev, { type: "toggle", id: "1" });
    expect(prev[0].done).toBe(false);
    expect(next[0].done).toBe(true);
  });
});
```

## Hooks
```ts
import { renderHook, act } from "@testing-library/react";
test("useDebounce", () => {
  vi.useFakeTimers();                       // jest.useFakeTimers()
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), { initialProps: { v: "a" } });
  rerender({ v: "ab" });
  expect(result.current).toBe("a");
  act(() => vi.advanceTimersByTime(300));
  expect(result.current).toBe("ab");
  vi.useRealTimers();
});
```

## Mocks
`vi.fn()` / `jest.fn()` for callbacks, `vi.mock("./api")` for modules, `vi.spyOn(obj, "method")`. Mock at the **boundary** (network, time, randomness), not internal functions.

## Jest vs Vitest
Same API style. Vitest is Vite-native (fast, ESM, shares Vite config); Jest is the long-time standard (needs Babel/ts-jest/SWC transform).

**Interview:** *What do you unit test in a React app?* Business logic extracted from components (reducers, formatters, validation, permission helpers, hooks).

Next → [Component testing](../component-testing/README.md)
