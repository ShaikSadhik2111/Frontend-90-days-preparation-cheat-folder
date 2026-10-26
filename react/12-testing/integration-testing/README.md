# Integration & E2E testing

> **Integration tests** render several components together (page + router + query client + mocked network). **E2E tests** run the real app in a real browser (Playwright/Cypress).

## Integration test setup
```tsx
function renderWithProviders(ui: React.ReactElement, { route = "/" } = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

// MSW
const server = setupServer(http.get("/api/devices", () => HttpResponse.json([{ id: "1", name: "Pump A" }])));
beforeAll(() => server.listen()); afterEach(() => server.resetHandlers()); afterAll(() => server.close());

test("devices page lists devices and handles server error", async () => {
  renderWithProviders(<DevicesPage />);
  expect(await screen.findByText("Pump A")).toBeInTheDocument();

  server.use(http.get("/api/devices", () => new HttpResponse(null, { status: 500 })));
  // ...trigger refetch and assert error UI
});
```

## E2E (Playwright)
```ts
test("user can acknowledge an alarm", async ({ page }) => {
  await page.goto("/alarms");
  await page.getByRole("button", { name: "Acknowledge Pump A overheating" }).click();
  await expect(page.getByText("Acknowledged")).toBeVisible();
});
```
Keep E2E for **critical journeys** (login, main workflow, payment) — they're slower and flakier.

## Testing pyramid / trophy
Many unit + component tests, a solid layer of integration tests (most confidence per cost), few E2E. Add static checks (TypeScript, ESLint) at the base.

## Migration angle
Before migrating an AngularJS screen, write **E2E characterization tests** against the old screen; run the same tests against the React version → proves feature parity.

**Interview:** *What's your testing strategy?* Static types + lint → unit for logic → RTL component/integration with MSW → a few Playwright E2E in CI on every PR.

Next → [Accessibility](../../13-accessibility/README.md)
