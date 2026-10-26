import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Hello">
        <button>First action</button>
        <button>Last action</button>
      </Modal>
    </>
  );
}

test("opens, focuses inside, Escape closes and returns focus", async () => {
  render(<Demo />);
  const opener = screen.getByRole("button", { name: "Open" });
  await userEvent.click(opener);
  expect(screen.getByRole("dialog", { name: "Hello" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
});

test("Tab is trapped inside the dialog", async () => {
  render(<Demo />);
  await userEvent.click(screen.getByRole("button", { name: "Open" }));
  await userEvent.tab(); // → First action
  await userEvent.tab(); // → Last action
  expect(screen.getByRole("button", { name: "Last action" })).toHaveFocus();
  await userEvent.tab(); // wraps
  expect(screen.getByRole("button", { name: "Close dialog" })).toHaveFocus();
  await userEvent.tab({ shift: true });
  expect(screen.getByRole("button", { name: "Last action" })).toHaveFocus();
});
