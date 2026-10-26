# List virtualization (windowing)

> Render **only the rows visible in the viewport** (+ a small buffer) instead of all N rows. 10,000 rows → ~30 DOM nodes.

## How it works (fixed row height)
```tsx
function VirtualList<T>({ items, rowHeight, height, renderRow }: {
  items: T[]; rowHeight: number; height: number; renderRow: (item: T, index: number) => React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const overscan = 5;
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const end = Math.min(items.length, Math.ceil((scrollTop + height) / rowHeight) + overscan);

  return (
    <div style={{ height, overflowY: "auto" }} onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
      <div style={{ height: items.length * rowHeight, position: "relative" }}>   {/* full scroll height */}
        {items.slice(start, end).map((item, i) => (
          <div key={start + i} style={{ position: "absolute", top: (start + i) * rowHeight, height: rowHeight, left: 0, right: 0 }}>
            {renderRow(item, start + i)}
          </div>
        ))}
      </div>
    </div>
  );
}
```
Use a stable id for `key` in real code. Being able to explain/write this is a strong signal in interviews.

## Libraries
`@tanstack/react-virtual` (headless, variable sizes), `react-window` (simple, fixed/variable), `react-virtuoso` (auto-measured variable heights, chat-style lists). Data grids (AG Grid, MUI X) virtualize rows and columns.

## Trade-offs
- Ctrl+F browser search can't find unrendered rows.
- Variable heights need measurement (ResizeObserver) → more complex.
- Screen readers: use `aria-rowcount`/`aria-rowindex` for grids.
- Keep scroll position when data updates; sticky headers need care.

**Interview:** *When do you virtualize?* Hundreds+ of complex rows, or when profiling shows DOM size/commit time is the bottleneck.

Next → [Web Vitals](../web-vitals/README.md)
