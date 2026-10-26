import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Autocomplete } from "./Autocomplete";

type Item = { id: number; name: string };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function setup(fetcher: (q: string, s: AbortSignal) => Promise<Item[]>, onSelect = vi.fn()) {
  render(<Autocomplete<Item> label="Search" fetcher={fetcher} getLabel={(i) => i.name} getKey={(i) => i.id} onSelect={onSelect} debounceMs={50} />);
  return { input: screen.getByRole("combobox", { name: "Search" }), onSelect };
}

test("debounces: one request for fast typing", async () => {
  const fetcher = vi.fn(async (q: string) => [{ id: 1, name: `${q} result` }]);
  const { input } = setup(fetcher);
  await userEvent.type(input, "rah");
  expect(await screen.findByRole("option")).toHaveTextContent("rah result");
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(fetcher).toHaveBeenCalledWith("rah", expect.any(AbortSignal));
});

test("shows empty and error states", async () => {
  const fetcher = vi.fn().mockResolvedValueOnce([]).mockRejectedValueOnce(new Error("500"));
  const { input } = setup(fetcher);
  await userEvent.type(input, "x");
  expect(await screen.findByText("No results")).toBeInTheDocument();
  await userEvent.type(input, "y");
  expect(await screen.findByRole("alert")).toHaveTextContent(/went wrong/i);
});

test("a slow old response never overwrites a newer one (race condition)", async () => {
  const fetcher = vi.fn(async (q: string, signal: AbortSignal) => {
    await sleep(q === "a" ? 300 : 10);
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return [{ id: q.length, name: `result for ${q}` }];
  });
  const { input } = setup(fetcher);
  await userEvent.type(input, "a");
  await sleep(80);                       // "a" request now in flight (slow)
  await userEvent.type(input, "b");      // "ab" request (fast)
  expect(await screen.findByText(/result for ab/)).toBeInTheDocument();
  await sleep(350);                      // let the slow "a" request finish
  expect(screen.queryByText(/result for a$/)).not.toBeInTheDocument();
  expect(fetcher.mock.calls[0][1].aborted).toBe(true);
});

test("keyboard navigation + Enter selects, Escape closes", async () => {
  const items = [{ id: 1, name: "Priya" }, { id: 2, name: "Pooja" }];
  const { input, onSelect } = setup(async () => items);
  await userEvent.type(input, "p");
  await screen.findAllByRole("option");
  await userEvent.keyboard("{ArrowDown}{ArrowDown}");
  expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledWith(items[1]);
  expect(input).toHaveValue("Pooja");
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});
