import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OtpInput } from "./OtpInput";

test("auto-advances, ignores letters, backspace goes back, completes", async () => {
  const onComplete = vi.fn();
  render(<OtpInput length={4} onComplete={onComplete} />);
  const boxes = screen.getAllByRole("textbox");
  await userEvent.click(boxes[0]);
  await userEvent.keyboard("1a2");
  expect(boxes[0]).toHaveValue("1");
  expect(boxes[1]).toHaveValue("2");
  expect(boxes[2]).toHaveFocus();
  await userEvent.keyboard("{Backspace}");
  expect(boxes[1]).toHaveFocus();
  expect(boxes[1]).toHaveValue("");
  await userEvent.keyboard("234");
  expect(onComplete).toHaveBeenCalledWith("1234");
});

test("paste fills all boxes", async () => {
  const onComplete = vi.fn();
  render(<OtpInput length={4} onComplete={onComplete} />);
  await userEvent.click(screen.getAllByRole("textbox")[0]);
  await userEvent.paste("98-76");
  expect(onComplete).toHaveBeenCalledWith("9876");
});
