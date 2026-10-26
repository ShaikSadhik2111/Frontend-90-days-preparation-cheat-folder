import { useId, useState } from "react";

type Item = { id: string; title: string; content: React.ReactNode };

/** allowMultiple toggles between "one open at a time" and "many open". Uses a Set in state. */
export function Accordion({ items, allowMultiple = false }: { items: Item[]; allowMultiple?: boolean }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const base = useId();

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []); // always a NEW Set → React sees the change
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-${item.id}`}
                id={`${base}-${item.id}-btn`}
                onClick={() => toggle(item.id)}
              >
                {item.title} <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div id={`${base}-${item.id}`} role="region" aria-labelledby={`${base}-${item.id}-btn`} hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
