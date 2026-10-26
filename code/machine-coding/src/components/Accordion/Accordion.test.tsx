import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const items = [
  { id: "a", title: "One", content: "Content one" },
  { id: "b", title: "Two", content: "Content two" },
];

test("single mode: opening one closes the other", async () => {
  render(<Accordion items={items} />);
  await userEvent.click(screen.getByRole("button", { name: /One/ }));
  expect(screen.getByText("Content one")).toBeVisible();
  await userEvent.click(screen.getByRole("button", { name: /Two/ }));
  expect(screen.getByText("Content one")).not.toBeVisible();
  expect(screen.getByRole("button", { name: /Two/ })).toHaveAttribute("aria-expanded", "true");
});

test("multiple mode keeps both open", async () => {
  render(<Accordion items={items} allowMultiple />);
  await userEvent.click(screen.getByRole("button", { name: /One/ }));
  await userEvent.click(screen.getByRole("button", { name: /Two/ }));
  expect(screen.getByText("Content one")).toBeVisible();
  expect(screen.getByText("Content two")).toBeVisible();
});
