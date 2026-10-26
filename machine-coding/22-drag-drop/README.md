# 22 — Drag & drop

## Native HTML5 DnD (enough for most rounds)
```tsx
<article draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", card.id)}>…</article>
<section onDragOver={(e) => e.preventDefault()}            // required to allow dropping
         onDrop={(e) => move(e.dataTransfer.getData("text/plain"), columnId)}>…</section>
```
Reorder within a list: compute drop index from pointer Y vs item midpoints; immutable move:
```ts
function moveItem<T>(arr: T[], from: number, to: number) {
  const copy = [...arr]; const [item] = copy.splice(from, 1); copy.splice(to, 0, item); return copy;
}
```
## Must mention
- **Keyboard alternative** (move left/right buttons, or space to pick up + arrows) — DnD alone isn't accessible; announce moves via `aria-live`.
- Touch support: HTML5 DnD doesn't work well on mobile → pointer events or **dnd-kit** in production.
- Visual feedback: drop target highlight, placeholder.
- Persist order (fractional ranks like `"a0"`, `"a0V"` avoid renumbering everything) + optimistic update with rollback.

Reference: `code/machine-coding/src/components/Kanban`.

Next → [23 Undo/redo](../23-undo-redo/README.md)
