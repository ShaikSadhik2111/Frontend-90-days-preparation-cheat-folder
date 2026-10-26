import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoApp } from "./TodoApp";
import { todoReducer } from "./todoReducer";

test("reducer is pure and handles every action", () => {
  let s = todoReducer([], { type: "add", text: "  a  ", id: "1" });
  expect(s).toEqual([{ id: "1", text: "a", done: false }]);
  expect(todoReducer(s, { type: "add", text: "   " })).toBe(s); // ignores empty
  const toggled = todoReducer(s, { type: "toggle", id: "1" });
  expect(toggled[0].done).toBe(true);
  expect(s[0].done).toBe(false);                                  // original not mutated
  s = todoReducer(toggled, { type: "edit", id: "1", text: "b" });
  expect(s[0].text).toBe("b");
  expect(todoReducer(s, { type: "clearDone" })).toEqual([]);
});

test("add, toggle, filter, delete", async () => {
  render(<TodoApp persist={false} />);
  const input = screen.getByLabelText("New todo");
  await userEvent.type(input, "Learn closures{Enter}");
  await userEvent.type(input, "Practice DSA{Enter}");
  expect(screen.getByText("2 items left")).toBeInTheDocument();
  await userEvent.click(screen.getByLabelText("Toggle Learn closures"));
  expect(screen.getByText("1 item left")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "done" }));
  expect(screen.queryByText("Practice DSA")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "all" }));
  await userEvent.click(screen.getByLabelText("Delete Practice DSA"));
  expect(screen.queryByText("Practice DSA")).not.toBeInTheDocument();
});
