# Component testing (React Testing Library)

> "The more your tests resemble the way your software is used, the more confidence they give you." Render the component, interact like a user, assert on what the user sees.

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("shows an error when email is invalid and submits when valid", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<SignupForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/email/i), "wrong");
  await user.click(screen.getByRole("button", { name: /sign up/i }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/valid email/i);
  expect(onSubmit).not.toHaveBeenCalled();

  await user.clear(screen.getByLabelText(/email/i));
  await user.type(screen.getByLabelText(/email/i), "a@b.com");
  await user.click(screen.getByRole("button", { name: /sign up/i }));
  expect(onSubmit).toHaveBeenCalledWith({ email: "a@b.com" });
});
```

## Queries — priority order
1. `getByRole` (with `name`) — also verifies accessibility
2. `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByDisplayValue`
3. `getByAltText`, `getByTitle`
4. `getByTestId` — last resort

| Variant | When not found | Use for |
|---|---|---|
| `getBy` | throws | element must exist now |
| `queryBy` | returns `null` | asserting **absence** |
| `findBy` | waits (async, default 1s) | element appears after async work |
`*AllBy*` variants return arrays.

## Do / don't
- ✅ `userEvent` over `fireEvent` (realistic sequences: focus, keydown, input, keyup).
- ✅ `jest-dom` matchers: `toBeInTheDocument`, `toHaveTextContent`, `toBeDisabled`, `toHaveAttribute`, `toBeVisible`.
- ❌ Testing state variables, CSS classes, or component internals.
- ❌ Wrapping everything in `act` manually — RTL does it; warnings usually mean an un-awaited async update.
- Mock network with **MSW** (Mock Service Worker) instead of mocking `fetch` per test.

Real examples: every component in `code/machine-coding/src/components/*/*.test.tsx`.

**Interview:** *How do you test a component that fetches data?* MSW handler → render → `findBy` loading-then-data; error handler → assert error UI + retry.

Next → [Integration testing](../integration-testing/README.md)
