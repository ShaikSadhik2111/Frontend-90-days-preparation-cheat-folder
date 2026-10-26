import { useMemo, useState } from "react";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
  pageSize?: number;
  searchKeys?: (keyof T & string)[];
};

type Sort<T> = { key: keyof T & string; dir: "asc" | "desc" } | null;

/**
 * Client-side table: search → sort → paginate (order matters!).
 * Derived data is computed with useMemo during render — NOT stored in state.
 * Follow-ups: server-side pagination, column resize, virtualization, row selection.
 */
export function DataTable<T>({ rows, columns, getRowId, pageSize = 10, searchKeys }: Props<T>) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort<T>>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    const keys = searchKeys ?? columns.map((c) => c.key);
    return rows.filter((row) => keys.some((k) => String(row[k]).toLowerCase().includes(q)));
  }, [rows, search, searchKeys, columns]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const { key, dir } = sort;
    // copy before sorting — Array.prototype.sort mutates
    return [...filtered].sort((a, b) => {
      const av = a[key], bv = b[key];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages); // stay valid when filtering shrinks data
  const visible = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function toggleSort(key: keyof T & string) {
    setSort((s) => (s?.key !== key ? { key, dir: "asc" } : s.dir === "asc" ? { key, dir: "desc" } : null));
  }

  return (
    <div className="table">
      <input
        aria-label="Search table"
        placeholder="Search…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              const dir = sort?.key === col.key ? sort.dir : undefined;
              return (
                <th key={col.key} aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}>
                  {col.sortable ? (
                    <button type="button" onClick={() => toggleSort(col.key)}>
                      {col.header} {dir === "asc" ? "▲" : dir === "desc" ? "▼" : "↕"}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr><td colSpan={columns.length}>No matching rows</td></tr>
          ) : (
            visible.map((row) => (
              <tr key={getRowId(row)}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row) : String(row[col.key])}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <nav className="pagination" aria-label="Pagination">
        <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages} · {sorted.length} rows</span>
        <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </nav>
    </div>
  );
}
