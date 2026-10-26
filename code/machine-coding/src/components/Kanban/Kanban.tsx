import { useState } from "react";

type ColumnId = "todo" | "doing" | "done";
type Card = { id: string; title: string; column: ColumnId };

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

const INITIAL: Card[] = [
  { id: "1", title: "Migrate Settings page to React", column: "todo" },
  { id: "2", title: "Shared API client", column: "doing" },
  { id: "3", title: "Design tokens", column: "done" },
];

/**
 * Native HTML5 drag & drop (dataTransfer) + keyboard fallback buttons (a11y —
 * drag & drop alone is not accessible). Follow-ups: reorder within a column,
 * optimistic update + rollback when the API fails, dnd-kit for touch support.
 */
export function Kanban() {
  const [cards, setCards] = useState<Card[]>(INITIAL);
  const [over, setOver] = useState<ColumnId | null>(null);

  const move = (id: string, column: ColumnId) =>
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, column } : c)));

  return (
    <div className="kanban">
      {COLUMNS.map((col, colIndex) => (
        <section
          key={col.id}
          aria-label={col.title}
          className={over === col.id ? "kanban__col over" : "kanban__col"}
          onDragOver={(e) => { e.preventDefault(); setOver(col.id); }}  // preventDefault = allow drop
          onDragLeave={() => setOver(null)}
          onDrop={(e) => { move(e.dataTransfer.getData("text/plain"), col.id); setOver(null); }}
        >
          <h3>{col.title} ({cards.filter((c) => c.column === col.id).length})</h3>
          {cards.filter((c) => c.column === col.id).map((card) => (
            <article key={card.id} draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", card.id)} className="kanban__card">
              {card.title}
              <div>
                {colIndex > 0 && <button type="button" aria-label={`Move ${card.title} left`} onClick={() => move(card.id, COLUMNS[colIndex - 1].id)}>←</button>}
                {colIndex < COLUMNS.length - 1 && <button type="button" aria-label={`Move ${card.title} right`} onClick={() => move(card.id, COLUMNS[colIndex + 1].id)}>→</button>}
              </div>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
