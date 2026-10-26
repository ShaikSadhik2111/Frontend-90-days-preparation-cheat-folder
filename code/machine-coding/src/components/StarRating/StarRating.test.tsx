import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StarRating } from "./StarRating";

test("click selects, click again clears, keyboard changes", async () => {
  const onChange = vi.fn();
  render(<StarRating onChange={onChange} />);
  await userEvent.click(screen.getByRole("radio", { name: "3 stars" }));
  expect(screen.getByRole("radio", { name: "3 stars" })).toHaveAttribute("aria-checked", "true");
  expect(screen.getByText("3/5")).toBeInTheDocument();
  await userEvent.keyboard("{ArrowRight}");
  expect(onChange).toHaveBeenLastCalledWith(4);
  await userEvent.click(screen.getByRole("radio", { name: "4 stars" }));
  expect(onChange).toHaveBeenLastCalledWith(0);
});
