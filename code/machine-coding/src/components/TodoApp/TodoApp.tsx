import { useEffect, useReducer, useState } from "react";
import { applyFilter, Filter, Todo, todoReducer } from "./todoReducer";

const KEY = "mc-todos";
const load = (): Todo[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
};

/** useReducer + derived filter + inline edit + persistence. */
export function TodoApp({ persist = true }: { persist?: boolean }) {
  const [todos, dispatch] = useReducer(todoReducer, undefined, () => (persist ? load() : []));
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    if (persist) localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos, persist]);

  const visible = applyFilter(todos, filter); // derived — not stored in state
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <section className="todo">
      <form onSubmit={(e) => { e.preventDefault(); dispatch({ type: "add", text }); setText(""); }}>
        <input aria-label="New todo" placeholder="What needs to be done?" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" disabled={!text.trim()}>Add</button>
      </form>

      <div role="group" aria-label="Filter">
        {(["all", "active", "done"] as const).map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} aria-label={`Toggle ${t.text}`} onChange={() => dispatch({ type: "toggle", id: t.id })} />
            {editing === t.id ? (
              <input
                autoFocus
                aria-label="Edit todo"
                defaultValue={t.text}
                onBlur={(e) => { dispatch({ type: "edit", id: t.id, text: e.target.value }); setEditing(null); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                  if (e.key === "Escape") setEditing(null);
                }}
              />
            ) : (
              <span onDoubleClick={() => setEditing(t.id)} className={t.done ? "done" : undefined}>{t.text}</span>
            )}
            <button type="button" aria-label={`Delete ${t.text}`} onClick={() => dispatch({ type: "remove", id: t.id })}>✕</button>
          </li>
        ))}
      </ul>
      <footer>
        <span>{remaining} item{remaining === 1 ? "" : "s"} left</span>
        <button type="button" onClick={() => dispatch({ type: "clearDone" })}>Clear completed</button>
      </footer>
    </section>
  );
}
