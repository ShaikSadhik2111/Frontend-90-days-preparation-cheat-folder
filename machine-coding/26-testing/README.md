# 26 — Testing your machine-coding solution

Even 1–2 tests in the last minutes impress interviewers. Priorities:
1. **Happy path** via user behaviour (type, click, see result).
2. **Edge case** that you designed for (empty state, error, race).
3. **Keyboard** interaction.

```tsx
test("filters todos", async () => {
  const user = userEvent.setup();
  render(<TodoApp persist={false} />);
  await user.type(screen.getByLabelText("New todo"), "Learn closures{Enter}");
  await user.click(screen.getByLabelText("Toggle Learn closures"));
  await user.click(screen.getByRole("button", { name: "active" }));
  expect(screen.queryByText("Learn closures")).not.toBeInTheDocument();
});
```
Debounce → fake timers or a small `debounceMs` prop in tests. Async → `findBy*`. Network → mock fetcher prop or MSW. Pure logic (reducer, pagination helper) → plain unit tests.

All reference components have tests: `code/machine-coding/src/components/*/*.test.tsx`. Theory: [react/12-testing](../../react/12-testing/component-testing/README.md).

Next → [27 Performance](../27-performance/README.md)
