import { useState } from "react";

type Props = { max?: number; value?: number; defaultValue?: number; onChange?: (v: number) => void; readOnly?: boolean };

/**
 * Hover preview + click to select + keyboard (radio group semantics: ← → change value).
 * Controlled (`value`) or uncontrolled (`defaultValue`).
 */
export function StarRating({ max = 5, value, defaultValue = 0, onChange, readOnly }: Props) {
  const [internal, setInternal] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const rating = value ?? internal;
  const shown = hover ?? rating;

  function select(v: number) {
    if (readOnly) return;
    const next = v === rating ? 0 : v; // click the same star again → clear
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (readOnly) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); select(Math.min(max, rating + 1)); }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); select(Math.max(0, rating - 1)); }
  }

  return (
    <div role="radiogroup" aria-label="Rating" className="stars" onKeyDown={onKeyDown} onMouseLeave={() => setHover(null)}>
      {Array.from({ length: max }, (_, i) => {
        const v = i + 1;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={rating === v}
            aria-label={`${v} star${v > 1 ? "s" : ""}`}
            tabIndex={rating === v || (rating === 0 && v === 1) ? 0 : -1}
            className={v <= shown ? "star filled" : "star"}
            onMouseEnter={() => !readOnly && setHover(v)}
            onClick={() => select(v)}
            disabled={readOnly}
          >
            ★
          </button>
        );
      })}
      <span className="muted"> {rating}/{max}</span>
    </div>
  );
}
