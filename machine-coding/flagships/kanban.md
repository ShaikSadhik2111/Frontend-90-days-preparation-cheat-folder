# Flagship: Kanban board (75 min)

## Requirements
3 columns (To do / In progress / Done) · add card · drag card between columns · reorder within column · delete/edit card · persist (localStorage) · keyboard alternative.

## State
```ts
type Board = { columns: Record<ColumnId, string[]>; cards: Record<string, { id: string; title: string }> };
```
Normalised: moving a card = remove id from one array, insert in another at index → cheap and immutable.

## Edge cases
Drop on the same position (no-op) · drop outside a column · empty column drop zone · long titles · many cards (virtualize column) · touch devices (pointer events/dnd-kit).

## Follow-ups
Server sync with optimistic move + rollback · fractional ranking for order · WIP limits · swimlanes · real-time updates from other users · undo.

Reference: `code/machine-coding/src/components/Kanban` · [22 drag & drop](../22-drag-drop/README.md).
