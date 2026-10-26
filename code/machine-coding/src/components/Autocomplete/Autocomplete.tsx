import { useEffect, useId, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

type Props<T> = {
  fetcher: (query: string, signal: AbortSignal) => Promise<T[]>;
  getLabel: (item: T) => string;
  getKey: (item: T) => string | number;
  onSelect?: (item: T) => void;
  label?: string;
  debounceMs?: number;
  minChars?: number;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * Interview checklist covered here:
 * - debounce (fewer requests)            - AbortController (cancel stale request)
 * - loading / empty / error states       - keyboard: ↑ ↓ Enter Escape
 * - ARIA combobox pattern                - close on outside click
 * - generic <T> so it works for any data - highlight of matching text
 */
export function Autocomplete<T>({
  fetcher, getLabel, getKey, onSelect, label = "Search", debounceMs = 300, minChars = 1,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const debounced = useDebounce(query, debounceMs);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const listId = `${id}-list`;

  useOnClickOutside(wrapperRef, () => setOpen(false));

  useEffect(() => {
    if (debounced.trim().length < minChars) {
      setResults([]);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    fetcher(debounced, controller.signal)
      .then((items) => {
        setResults(items);
        setStatus("success");
        setActive(-1);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setStatus("error");
      });
    // When `debounced` changes, the previous request is aborted → an older,
    // slower response can never overwrite newer results (race condition).
    return () => controller.abort();
  }, [debounced, fetcher, minChars]);

  function choose(item: T) {
    setQuery(getLabel(item));
    setOpen(false);
    onSelect?.(item);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) setOpen(true);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : -1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : -1));
        break;
      case "Enter":
        if (open && active >= 0 && results[active]) {
          e.preventDefault();
          choose(results[active]);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  }

  const showList = open && debounced.trim().length >= minChars;

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <label htmlFor={`${id}-input`}>{label}</label>
      <input
        id={`${id}-input`}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      {showList && (
        <ul id={listId} role="listbox" className="autocomplete__list">
          {status === "loading" && <li className="muted">Loading…</li>}
          {status === "error" && <li role="alert">Something went wrong. Try again.</li>}
          {status === "success" && results.length === 0 && <li className="muted">No results</li>}
          {status === "success" &&
            results.map((item, i) => (
              <li
                key={getKey(item)}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? "active" : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()} // keep focus in input
                onClick={() => choose(item)}
              >
                <Highlight text={getLabel(item)} query={debounced} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (!q || index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + q.length)}</mark>
      {text.slice(index + q.length)}
    </>
  );
}
