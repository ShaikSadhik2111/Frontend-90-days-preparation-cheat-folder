import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

function Demo() {
  return (
    <Tabs defaultValue="a">
      <Tabs.List label="Demo">
        <Tabs.Tab value="a">Alpha</Tabs.Tab>
        <Tabs.Tab value="b">Beta</Tabs.Tab>
        <Tabs.Tab value="c">Gamma</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="a">Panel A</Tabs.Panel>
      <Tabs.Panel value="b">Panel B</Tabs.Panel>
      <Tabs.Panel value="c">Panel C</Tabs.Panel>
    </Tabs>
  );
}

test("click switches panel", async () => {
  render(<Demo />);
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
  await userEvent.click(screen.getByRole("tab", { name: "Beta" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
  expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute("aria-selected", "true");
});

test("arrow keys, Home and End move selection (wraps around)", async () => {
  render(<Demo />);
  screen.getByRole("tab", { name: "Alpha" }).focus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel C");
  await userEvent.keyboard("{Home}");
  expect(screen.getByRole("tab", { name: "Alpha" })).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
});
