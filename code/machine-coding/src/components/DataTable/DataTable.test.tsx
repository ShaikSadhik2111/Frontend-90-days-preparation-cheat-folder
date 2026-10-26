import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, Column } from "./DataTable";

type Row = { id: number; name: string; age: number };
const rows: Row[] = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `User ${String(i + 1).padStart(2, "0")}`, age: 50 - i }));
const columns: Column<Row>[] = [
  { key: "id", header: "ID", sortable: true },
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
];
const bodyRows = () => within(screen.getAllByRole("rowgroup")[1]).getAllByRole("row");

test("paginates", async () => {
  render(<DataTable rows={rows} columns={columns} getRowId={(r) => r.id} pageSize={10} />);
  expect(bodyRows()).toHaveLength(10);
  expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(bodyRows()).toHaveLength(5);
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
});

test("sorts asc → desc → none", async () => {
  render(<DataTable rows={rows} columns={columns} getRowId={(r) => r.id} pageSize={5} />);
  const ageHeader = screen.getByRole("button", { name: /Age/ });
  await userEvent.click(ageHeader);
  expect(bodyRows()[0]).toHaveTextContent("User 25");     // youngest first
  await userEvent.click(ageHeader);
  expect(bodyRows()[0]).toHaveTextContent("User 01");
  expect(screen.getByRole("columnheader", { name: /Age/ })).toHaveAttribute("aria-sort", "descending");
});

test("search filters and resets to page 1", async () => {
  render(<DataTable rows={rows} columns={columns} getRowId={(r) => r.id} pageSize={10} />);
  await userEvent.click(screen.getByRole("button", { name: "Next" }));
  await userEvent.type(screen.getByLabelText("Search table"), "User 2");
  expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
  expect(bodyRows()).toHaveLength(6); // 20..25
  await userEvent.type(screen.getByLabelText("Search table"), "zzz");
  expect(screen.getByText("No matching rows")).toBeInTheDocument();
});
